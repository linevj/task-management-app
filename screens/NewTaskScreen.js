import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; //icons
import DateTimePicker from "@react-native-community/datetimepicker"; //picker for selecting date, time
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import { useFocusEffect } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select"; //picker for categeroy
import { firebase } from "../config"; //firebase
import styles from "../styles/NewTaskStyles"; //styling

//CREATE A NEW TASK SCREEN

export default function NewTask({ route, navigation }) {
  const [taskTitle, setTaskTitle] = useState(""); //task title initital state is empty

  //date useStates
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState(""); // New state for end date
  const [firstDate, setFirstDate] = useState(new Date()); //current date is the initial value
  const [secondDate, setSecondDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false); // Separate state for start date picker
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [category, setCategory] = useState(null);

  // time useStates
  const [taskStartTime, setTaskStartTime] = useState("");
  const [taskEndTime, setTaskEndTime] = useState("");
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [firstTime, setFirstTime] = useState(new Date()); //current date is the initial value
  const [secondTime, setSecondTime] = useState(new Date());
  const [categoryList, setCategoryList] = useState([]);

  //importance labels
  const [importance, setImportance] = useState("Low");
  const [importanceColors, setImportanceColors] = useState({
    Low: "#B0E57C", //green
    Medium: "#FFC867", //orange
    High: "#FF847C", //red
  });

  const [completed, setCompleted] = useState(false);

  // function to reset the component's state (so that the input labels are empty)
  const resetComponentState = () => {
    setTaskTitle("");
    setTaskStartDate("");
    setTaskEndDate("");
    setFirstDate(new Date());
    setSecondDate(new Date());
    setShowStartDatePicker(false);
    setShowEndDatePicker(false);
    setTaskStartTime("");
    setTaskEndTime("");
    setShowStartTimePicker(false);
    setShowEndTimePicker(false);
    setFirstTime(new Date());
    setSecondTime(new Date());
    setCategory("");
    setImportance("Low");
  };

  //when the user clicks the "+ icon" in the tab bar, the NewTaskScreen is opened without any old data.
  useFocusEffect(
    React.useCallback(() => {
      resetComponentState();
    }, [])
  );

  //get the catergory list when the getCategory function is called
  useEffect(() => {
    getCategoryList();
  }, []);

  //when user clicks the cancel button, they are navigated back to the homescreen
  const cancelTask = () => {
    navigation.navigate("Home");
  };

  //datepicker code adapted from Youtube tutorial "Using Date Picker with TextInput (Expo | React Native App)" [13]
  //toggle visibility of the datepickers
  const toggleStartDatepicker = () => {
    setShowStartDatePicker(!showStartDatePicker);
  };

  const toggleEndDatepicker = () => {
    setShowEndDatePicker(!showEndDatePicker);
  };

  //toggle visibility of the timepickers
  const toggleStartTimepicker = () => {
    setShowStartTimePicker(!showStartTimePicker);
  };

  const toggleEndTimepicker = () => {
    setShowEndTimePicker(!showEndTimePicker);
  };

  //handle changes in the selected date
  const onChange = ({ type }, selectedDate) => {
    if (type === "set") { //user has "confirmed" the date
      const dateNow = selectedDate;
      if (showStartDatePicker) {
        setFirstDate(dateNow); //set first date/ start date to the selected date
        if (Platform.OS === "android") {
          toggleStartDatepicker(); //hide the picker
          setTaskStartDate(stringDate(dateNow));
        }
      } else if (showEndDatePicker) {
        setSecondDate(dateNow); //update the setSecondDate/ end date to the selected date
        if (Platform.OS === "android") {
          toggleEndDatepicker(); //hide the picker
          setTaskEndDate(stringDate(dateNow));
        }
      }
    } else {
      toggleStartDatepicker(); //hide the picker
    }
  };

  //handle changes in the selected time, same as date above
  const onChangeTime = ({ type }, selectedTime) => {
    if (type === "set") {
      const currentTime = selectedTime;
      if (showStartTimePicker) {
        setFirstTime(currentTime);
        if (Platform.OS === "android") {
          toggleStartTimepicker();
          setTaskStartTime(stringTime(currentTime));
        }
      } else if (showEndTimePicker) {
        setSecondTime(currentTime);
        if (Platform.OS === "android") {
          toggleEndTimepicker();
          setTaskEndTime(stringTime(currentTime));
        }
      }
    } else {
      toggleStartTimepicker();
    }
  };

  //confirm the selected date
  const confirmDate = () => {
    if (showStartDatePicker) {
      setTaskStartDate(stringDate(firstDate));
      toggleStartDatepicker();
    } else if (showEndDatePicker) {
      setTaskEndDate(stringDate(secondDate));
      toggleEndDatepicker();
    }
  };

  //confirm the selected time
  const confirmTime = () => {
    if (showStartTimePicker) {
      setTaskStartTime(stringTime(firstTime));
      toggleStartTimepicker();
    } else if (showEndTimePicker) {
      setTaskEndTime(stringTime(secondTime));
      toggleEndTimepicker();
    }
  };

  //make the date format for new tasks match the date input of the React Native Agenda
  // Code adapted from Stackoverflow "How do I get Month and Date of JavaScript in 2 digit format?" [6]
  const stringDate = (rawDate) => {
    const today = new Date(rawDate);
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`; //to match our format yyyy-mm-dd
  };

  //format time as HH:MM, function to display to digits from Stackoverflow [14]
  const stringTime = (rawTime) => {
    const hours = rawTime.getHours().toString().padStart(2, "0");
    const minutes = rawTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  //handle task creation and navigation back to HomeScreen
  const createTask = () => {
    //create a new task object with the user input
    const newTask = {
      title: taskTitle,
      startDate: taskStartDate,
      startTime: taskStartTime,
      endDate: taskEndDate,
      endTime: taskEndTime,
      importance: importance,
      category: category,
      completed: completed,
    };

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    //add the new task to Firebase database/ collection "tasks"
    firebase
      .firestore()
      .collection("tasks")
      .add(newTask)
      .then((docRef) => {
        //after the document is created, update it with the userId
        return docRef.update({ userId: uid });
      })
      .then(() => {
        Keyboard.dismiss(); //hide keyboard
        //pass the new task back to HomeScreen
        navigation.navigate("Home", { task: newTask });
      })
      .catch((error) => {
        alert(error);
      });
  };

  //importance labels - setImportance based on what importance level the users selects
  const handleImportanceClick = (level) => {
    setImportance(level);
  };

  //get the list of task categories from firebase
  const getCategoryList = () => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    firebase
      .firestore()
      .collection("category")
      .where("userId", "==", uid) //?
      .onSnapshot((querySnapshot) => {
        const list = [];

        querySnapshot.forEach((doc) => {
          try {
            const { name } = doc.data();

            list.push({
              label: name,
              value: name,
              id: doc.id,
              key: doc.id,
            });
          } catch (e) {}
        });

        setCategoryList(list); //update the category list with the data
      });
  };

  //create new category
  const onCreateCategory = () => {
    if (category !== null && category.trim() !== "") {
      const user = firebase.auth().currentUser;
      const uid = user.uid;

      firebase
        .firestore()
        .collection("category")
        .where("userId", "==", uid) //??
        .add({ name: category }) //add the new category to the category doc
        .then((docRef) => {
          // after the document is created, update it with the userId
          return docRef.update({ userId: uid });
        })
        .then(() => {
          Keyboard.dismiss();
          // clear the category input field
          setCategory("");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      // display an error message if trying to create an empty category
      alert("Category cannot be empty");
    }
  };

  return (
    <SafeAreaWrapper>
      <ScrollView>
        {/* Input area */}
        <View style={styles.container}>
          {/* Task title */}
          <Text style={styles.titleText}>Task Title:</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            value={taskTitle}
            onChangeText={(text) => setTaskTitle(text)}
          />

          {/* Start date */}
          <Text style={styles.titleText}>Start Date:</Text>
          {showStartDatePicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={firstDate}
              onChange={onChange}
              style={styles.datePicker}
              minimumDate={new Date()} //opens at todays date
            />
          )}
          {/* Confirm / cancel buttons for picker */}
          {showStartDatePicker && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmDate}
              >
                <Text>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={toggleStartDatepicker}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {!showStartDatePicker && (
            <Pressable onPress={toggleStartDatepicker}>
              <TextInput
                style={styles.input}
                placeholder="Enter start date"
                value={taskStartDate}
                onChangeText={(text) => setTaskStartDate(text)}
                editable={false}
                onPressIn={toggleStartDatepicker}
              />
            </Pressable>
          )}

          {/* Start time */}
          <Text style={styles.titleText}>Start Time:</Text>
          {/* Start Time Picker */}
          {showStartTimePicker && (
            <DateTimePicker
              mode="time"
              display="spinner"
              style={styles.timePicker}
              value={firstTime}
              onChange={onChangeTime}
            />
          )}
          {/* Confirm / cancel buttons for picker */}
          {showStartTimePicker && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmTime}
              >
                <Text>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={toggleStartTimepicker}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {!showStartTimePicker && (
            <Pressable onPress={toggleStartTimepicker}>
              <TextInput
                style={styles.input}
                placeholder="Enter start time"
                value={taskStartTime}
                onChangeText={(text) => setTaskStartTime(text)}
                editable={false}
                onPressIn={toggleStartTimepicker}
              />
            </Pressable>
          )}

          {/* End date */}
          <Text style={styles.titleText}>End Date:</Text>
          {showEndDatePicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={secondDate}
              onChange={onChange}
              style={styles.datePicker}
              minimumDate={new Date()} //opens at todays date
            />
          )}
          {/* Confirm / cancel buttons for picker */}
          {showEndDatePicker && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmDate}
              >
                <Text>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={toggleEndDatepicker}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {!showEndDatePicker && (
            <Pressable onPress={toggleEndDatepicker}>
              <TextInput
                style={styles.input}
                placeholder="Enter end date"
                value={taskEndDate}
                onChangeText={(text) => setTaskEndDate(text)}
                editable={false}
                onPressIn={toggleEndDatepicker}
              />
            </Pressable>
          )}

          {/* End time */}
          <Text style={styles.titleText}>End Time:</Text>
          {showEndTimePicker && (
            <DateTimePicker
              mode="time"
              display="spinner"
              style={styles.timePicker}
              value={secondTime}
              onChange={onChangeTime}
            />
          )}

          {/* Confirm / cancel buttons for picker */}
          {showEndTimePicker && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmTime}
              >
                <Text>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={toggleEndTimepicker}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
          {!showEndTimePicker && (
            <Pressable onPress={toggleEndTimepicker}>
              <TextInput
                style={styles.input}
                placeholder="Enter end time"
                value={taskEndTime}
                onChangeText={(text) => setTaskEndTime(text)}
                editable={false}
                onPressIn={toggleEndTimepicker}
              />
            </Pressable>
          )}

          {/* Category */}
          <Text style={styles.titleText}>
            Category (select a category or create a new one):
          </Text>
          <View style={styles.pickerSelect}>
            <RNPickerSelect
              items={categoryList}
              value={category}
              onValueChange={(value) => setCategory(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.catInput}
              placeholder="Enter Category"
              value={category}
              onChangeText={(text) => setCategory(text)}
            />
            <TouchableOpacity onPress={() => onCreateCategory()}>
              <Ionicons name="ios-add" style={styles.addIcon} />
            </TouchableOpacity>
          </View>

          {/* Importance section */}
          <Text style={styles.titleText}>Importance:</Text>
          <View style={styles.importanceContainer}>
            {Object.keys(importanceColors).map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.importanceLabel,
                  {
                    backgroundColor:
                      importance === level
                        ? importanceColors[level]
                        : "#ffffff",
                  },
                ]}
                onPress={() => handleImportanceClick(level)}
              >
                <Text style={styles.importanceLabelText}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Cancel task button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={cancelTask}
              style={styles.cancelButtonTask}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Create task button */}
            <TouchableOpacity onPress={createTask} style={styles.button}>
              <Text style={styles.buttonText}>Create task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
