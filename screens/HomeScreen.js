import { Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Agenda } from "react-native-calendars"; //calendar component
import styles from "../styles/HomeStyle"; //styles
import { firebase } from "../config"; //firebase
import { useNavigation } from "@react-navigation/native"; //navigation
import { Ionicons } from "@expo/vector-icons"; //icons

//HOME SCREEN/ AGENDA SCREEN
//calendar adapted from YouTube tutorial "Get started with Event Calendar in React Native" [4] and Github React Native Calendar documentation page [5]

//format timestamp to string format YYYY-MM-DD
const formatTime = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

//land on todays date (when we open the calendar).
// Code adapted from Stackoverflow "How do I get Month and Date of JavaScript in 2 digit format?" [6]
const getTodaysDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`; //to match our format yyyy-mm-dd
};

//colors to range the cards' importance
const importanceColors = {
  Low: "#B0E57C", //green
  Medium: "#FFC867", //orange
  High: "#FF847C", //red
};

const HomeScreen = ({ route }) => {
  const [items, setItems] = useState({}); //Agenda items. items are initially set to an empty object
  const navigation = useNavigation(); //setting up navigation
  // const [isCreatingTask, setIsCreatingTask] = useState(false);
  // const numDays = 20;

  //load all agenda items
  const loadAllItems = () => {
    const user = firebase.auth().currentUser; //get the user
    const uid = user.uid; //get user id
    const timestamp = Date.now(); //get the current timstamp
    //Calculiating the start and end date ranges, to limit data (+ 15/ - 15 days), "How to calculate the number of days between two dates in JavaScript ?" [7]
    //adapted from Firebase documentaiton "Order or limit data with Cloud Firestore" [8].
    const rangeStart = timestamp - 15 * 24 * 60 * 60 * 1000;
    const rangeEnd = timestamp + (15 - 1) * 24 * 60 * 60 * 1000;
    const rangeStartStr = formatTime(rangeStart); //convert to time strings
    const rangeEndStr = formatTime(rangeEnd);

    //firestore query, getting the data based on id and daterange
    firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", uid)
      .where("startDate", ">=", rangeStartStr)
      .where("startDate", "<=", rangeEndStr)
      .onSnapshot((querySnapshot) => {
        const newTasks = { ...items };

        //initializing the agenda items based on the data range
        for (let i = -15; i < 15; i++) {
          const time = timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = formatTime(time);

          newTasks[strTime] = [];
        }

        //Get the data. Adapted from from firebase documentaion [9]
        querySnapshot.forEach((doc) => {
          try {
            const {
              startDate,
              endDate,
              title,
              startTime,
              endTime,
              category,
              importance,
              completed,
            } = doc.data();

            //organazing the tasks in the agenda for their respective dates, from Retool community [10]
            //start date for a task
            const dateNow = new Date(startDate);
            //end date for a task
            const finalDate = new Date(endDate);

            //iterate through the dates in the date range and format as a string
            while (dateNow <= finalDate) {
              const dateNowStr = formatTime(dateNow);
              //checks that the tasks are grouped correctly on their date in the agenda
              if (!newTasks[dateNowStr]) {
                newTasks[dateNowStr] = [];
              }

              newTasks[dateNowStr].push({
                startDate,
                endDate,
                title,
                startTime,
                endTime,
                category,
                importance,
                completed,
                id: doc.id,
                dateStr: dateNowStr,
              });
              dateNow.setDate(dateNow.getDate() + 1);
            }
          } catch (e) {}
        });

        //update set items with the agenda items/ new tasks
        setItems(newTasks);
      });
  };

  //load agenda items when the component renders
  useEffect(() => {
    loadAllItems();

    //calendar data is only loaded for the user that is logged in, when user is signed out, setItems is empty
    //Adapted from Medium article "Integrating Firebase Authentication, Hooks, and Context into your ReactJS App" [11]
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //load data for signed in user
        loadAllItems();
      } else {
        setItems({});
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // format the date from yyyy-mm-dd to the local date format, adapted from Stackoverflow "toLocaleDateString() short format" [12]
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  //navigate to EditTask screen when onEditTask button/ card is clicked
  const onEditTask = (item) => {
    navigation.navigate("EditTask", { taskData: item });
  };

  //completion status for tasks + update the firestore db if when toggleCompletion icon is clicked
  const toggleCompletion = (item) => {
    const updatedTask = {
      completed: !item.completed,
    };

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    firebase
      .firestore()
      .collection("tasks")
      .doc(item.id)
      .update(updatedTask)
      .then(() => {
        loadAllItems(formatTime(new Date()));
        // updatedItems = { ...items };
        // setCompleted(!completed);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const renderItem = (item) => {
    return (
      //card is clickable, and onEditTask function gets called when card is clicked
      <TouchableOpacity onPress={() => onEditTask(item)}>
        {/* style the card according to improtance and completion status */}
        <View
          style={[
            styles.cardContainer,
            { backgroundColor: importanceColors[item.importance] },
            item.completed && styles.completedCard,
          ]}
        >
          {/* title - if the card is completed, add line-through to title */}
          <Text
            style={[
              styles.cardTitle,
              item.completed && {
                textDecorationLine: "line-through",
              },
            ]}
          >
            {item.title}
          </Text>

          {/* start date and time area*/}
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeLabel}>Starts:</Text>
            <Text style={styles.dateTimeValue}>
              {formatDate(item.startDate)} - {item.startTime}
            </Text>
          </View>

          {/* end data and time area */}
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeLabel}>Ends:</Text>
            <Text style={styles.dateTimeValue}>
              {formatDate(item.endDate)} - {item.endTime}
            </Text>
            {/* Category label */}
           <View style={styles.categoryContainer}><Text style={styles.categoryLabel}>{item.category}</Text></View> 
          </View>
          {/* circle or checkmark icon for completion */}
          <Ionicons
            onPress={() => toggleCompletion(item)}
            name={item.completed ? "checkmark-circle" : "ellipse"}
            style={styles.icon}
            color={item.completed ? "#34A5B3" : "#ffffff"}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    //The agenda
    <View style={{ flex: 1, marginTop: 36 }}>
      <Agenda
        items={items} //agenda items
        loadItemsForMonth={loadAllItems} //loading agenda items for by month
        selected={getTodaysDate()} //select todays date initiallt
        renderItem={renderItem} //render each item/ card
        theme={{
          calendarBackground: "#F2F4F5", //styling
          agendaKnobColor: "#34A5B3", //knob to drag cown calendar/ full calendar view
        }}
      />
    </View>
  );
};

export default HomeScreen;
