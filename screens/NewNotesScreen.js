import {
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config"; //firebase
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import styles from "../styles/NewNotesStyles"; //styling
import { useNavigation } from "@react-navigation/native";

//NEW NOTE SCREEN (CREATE NOTE)
// Notes and Firebase set up adapted from YouTube tutorial: "Build A Notes App Using Firebase And React Native & Expo | Part 1 | Project & Tutorial For Beginners" [16]

const NewNotes = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState(""); //title and notes are empty at first
  const [note, setNote] = useState("");

  //add a new note and save it to firestore
  const createNote = () => {
    //to make sure we are using the current user
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    //new notes are stored in the "notes" collection
    firebase
      .firestore()
      .collection("notes")
      .add({ title, note })
      .then((docRef) => {
        //after the document is created, update it with the userId
        return docRef.update({ userId: uid });
      })
      .then(() => {
        //clear input fields
        setTitle("");
        setNote("");
        Keyboard.dismiss();
        navigation.navigate("Notes"); //navigate to Notes screen
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    //hide keyboard when tapping outside of the text inputs
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaWrapper>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* title input */}
          <Text style={styles.label}>Title:</Text>
          <TextInput
            placeholder="..."
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.inputTitle}
          ></TextInput>

          {/* note input */}
          <Text style={styles.label}>Note:</Text>
          <View style={styles.inputNoteContainer}>
            <TextInput
              placeholder="..."
              value={note}
              multiline={true} //text on multiple lines [19]
              numberOfLines={4} // set the number of visible lines [20]
              onChangeText={(text) => setNote(text)}
              style={styles.inputText}
            ></TextInput>
          </View>

          {/* save button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={createNote}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaWrapper>
    </TouchableWithoutFeedback>
  );
};

export default NewNotes;
