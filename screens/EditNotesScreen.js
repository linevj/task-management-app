import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { firebase } from "../config"; //firebase
import { useNavigation } from "@react-navigation/native";
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import styles from "../styles/NewNotesStyles"; //styles

//EDIT NOTES SCREEN
const EditNotes = ({ route }) => {
  const navigation = useNavigation();
  //useState to set the initial state of the title and note (based on the data passed through route.params)
  const [noteText, setNoteText] = useState(route.params.item.note); //fetch firestore data for note
  const [noteTitle, setNoteTitle] = useState(route.params.item.title); //fetch firestore data for note titile

  // Notes and Firebase set up adapted from YouTube tutorial: "Build A Notes App Using Firebase And React Native & Expo | Part 1 | Project & Tutorial For Beginners" [16]

  //get the notes data from the signed in user from firestore to update the notes
  const handleChange = () => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    //check that title is not empty
    if (noteTitle && noteTitle.length > 0) {
      //use id of the items to update the data
      firebase
        .firestore()
        .collection("notes")
        .doc(route.params.item.id)
        .update(
          {
            title: noteTitle,
            note: noteText,
            userId: uid,
          },
          { merge: true }
        )
        .then(() => {
          navigation.navigate("Notes"); //navigate to notes when saved
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  //delete note from firebase
  const handleDelete = () => {
    firebase
      .firestore()
      .collection("notes")
      .doc(route.params.item.id)
      .delete() //delete
      .then(() => {
        //navigate to Notes aftet deletion
        navigation.navigate("Notes");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaWrapper>
      {/* title input */}
      <Text style={styles.label}>Title:</Text>
      <TextInput
        placeholder="..."
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
        style={styles.inputTitle}
      ></TextInput>

      {/* note input */}
      <Text style={styles.label}>Note:</Text>
      <View style={styles.inputNoteContainer}>
        <TextInput
          placeholder="..."
          value={noteText}
          multiline={true} //text on multiple lines [19]
          numberOfLines={4} // set the number of visible lines [20]
          onChangeText={(text) => setNoteText(text)}
          style={styles.inputText}
        ></TextInput>
      </View>

      {/* delete button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        {/* update button */}
        <TouchableOpacity style={styles.updateButton} onPress={handleChange}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

export default EditNotes;
