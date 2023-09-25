//Edit Task Screen
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import styles from "../styles/NewTaskStyles"; //styling
import DateTimePicker from "@react-native-community/datetimepicker"; //picker for selecting date, time
import { firebase } from "../config"; //firebase
import RNPickerSelect from "react-native-picker-select"; //picker for categeroy
import { Ionicons } from "@expo/vector-icons"; //icons

//EDIT TASK SCREEN

export default function EditTaskScreen({ route, navigation }) {
  //EditTask input fiels are initalized to be prefilled with original task data
  const [editedTask, setEditedTask] = useState({
    title: route.params.taskData.title,
    startDate: route.params.taskData.startDate,
    startTime: route.params.taskData.startTime,
    endDate: route.params.taskData.endDate,
    endTime: route.params.taskData.endTime,
    importance: route.params.taskData.importance,
    category: route.params.taskData.category,
  });

  //date useStates
  const [taskStartDate, setTaskStartDate] = useState(
    route.params.taskData.startDate
  );
  const [taskEndDate, setTaskEndDate] = useState(route.params.taskData.endDate); // New state for end date
  const [firstDate, setFirstDate] = useState(
    new Date(route.params.taskData.startDate)
  );
  const [secondDate, setSecondDate] = useState(
    new Date(route.params.taskData.endDate)
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false); // Separate state for start date picker
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [category, setCategory] = useState(route.params.taskData.category);

  //time useStates
  const [taskStartTime, setTaskStartTime] = useState(
    route.params.taskData.startTime
  );
  const [taskEndTime, setTaskEndTime] = useState(route.params.taskData.endTime);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [firstTime, setFirstTime] = useState(new Date()); //current date is the initial value
  const [secondTime, setSecondTime] = useState(new Date());
  const [categoryList, setCategoryList] = useState([]);

  //importance labels
  const [importance, setImportance] = useState(
    route.params.taskData.importance
  );
  //importance colors
  const [importanceColors, setImportanceColors] = useState({
    Low: "#B0E57C", //green
    Medium: "#FFC867", //orange
    High: "#FF847C", //red
  });

  //get the catergory list when the getCategory function is called
  useEffect(() => {
    getCategoryList();
  }, []);

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
      .where("userId", "==", uid)
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
        .where("userId", "==", uid)
        .add({ name: category })
        .then((docRef) => {
          return docRef.update({ userId: uid }); //add the new category to the category doc
        })
        .then(() => {
          Keyboard.dismiss();
          setCategory(""); // clear the category input field
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      // display an error message if trying to create an empty category
      alert("Category cannot be empty");
    }
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
    if (type === "set") {
      //user has "confirmed" the date
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
      } else if (showEndTimePicker) {
        setSecondTime(currentTime);
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

  //handle updated task and navigation back to HomeScreen
  const saveChanges = () => {
    const updatedTask = {
      ...editedTask,
      title: editedTask.title,
      startDate: taskStartDate,
      startTime: taskStartTime,
      endDate: taskEndDate,
      endTime: taskEndTime,
      importance: importance,
      category: category,
      completed: route.params.taskData.completed,
    };

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    //add the updated task to Firebase database/ collection "tasks". Use id of the items to update the data
    firebase
      .firestore()
      .collection("tasks")
      .doc(route.params.taskData.id)
      .update(updatedTask, { merge: true })
      .then(() => {
        navigation.navigate("Home", { task: updatedTask });
      })
      .catch((error) => {
        alert(error);
      });
  };

  //handle deleted task in firebase and navigation back to HomeScreen
  const onDeleteTask = () => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(route.params.taskData.id)
      .delete()
      .then(() => {
        navigation.navigate("Home", { task: {} });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaWrapper>
      <ScrollView>
        {/* Input area */}
        <View style={styles.container}>
          <Text style={styles.titleText}>Edit task name:</Text>
          {/* the TextInput is prefilled with the data of the title of the card */}
          <TextInput
            style={styles.input}
            placeholder="Edit task title"
            value={editedTask.title}
            onChangeText={(text) => {
              setEditedTask({ ...editedTask, title: text });
            }}
          />

          {/* Start date */}
          <Text style={styles.titleText}>Edit start date:</Text>
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
          <Text style={styles.titleText}>Edit start time:</Text>
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
          <Text style={styles.titleText}>Edit end date:</Text>
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
          <Text style={styles.titleText}>Edit end time:</Text>
          {/* End Time Picker */}
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
            Edit category (select a category or create a new one):
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
              value={editedTask.category}
              onChangeText={(text) => setCategory(text)}
            />
            <TouchableOpacity onPress={() => onCreateCategory()}>
              <Ionicons name="ios-add" style={styles.addIcon} />
            </TouchableOpacity>
          </View>

          {/* Importance section */}
          <Text style={styles.titleText}>Edit importance:</Text>
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

          {/* Delete task button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onDeleteTask}
              style={styles.cancelButtonTask}
            >
              <Text style={styles.cancelButtonText}>Delete</Text>
            </TouchableOpacity>

            {/* Save change button */}
            <TouchableOpacity onPress={saveChanges} style={styles.button}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
