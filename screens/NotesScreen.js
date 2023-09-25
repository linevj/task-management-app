import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/NotesStyles"; //styling
import { firebase } from "../config"; //firebase
import { FlashList } from "@shopify/flash-list"; //flashlist
import Ionicons from "react-native-vector-icons/Ionicons"; //icons

//NOTES SCREEN

const NotesScreen = () => {
  const [notes, setNotes] = useState([]); //fetch firestore data in an empty notes array
  const [searchText, setSearchText] = useState(""); //search field is initially empty
  const navigation = useNavigation();

  //colors for the note cards
  const colors = [
    "#FF8C66",
    "#66A3FF",
    "#77CC77",
    "#FF8F83",
    "#FFD700",
    "#FF6B9E",
    "#9AC0FF",
    "#87D1B6",
    "#34A5B3",
  ];

  // get random a random color from the colors array, adapted from "How to get a random value from a JavaScript array" [15]
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  //render each note card with a different background color
  const NoteItem = ({ item, navigation }) => {
    const randomBackgroundColor = getRandomColor();
    return (
      <View
        style={[styles.noteView, { backgroundColor: randomBackgroundColor }]}
      >
        {/* when a card is pressed, navigate to Edit notes screen,
        and access the item.title and item.note data on that screen */}
        <Pressable onPress={() => navigation.navigate("EditNotes", { item })}>
          <Text style={styles.noteTitle}>{item.title}</Text>
          <Text style={styles.noteDesc}>{item.note}</Text>
        </Pressable>
      </View>
    );
  };

  // Notes and Firebase set up adapted from YouTube tutorial: "Build A Notes App Using Firebase And React Native & Expo | Part 1 | Project & Tutorial For Beginners" [16]

  //get the notes data from the signed in user from firestore
  useEffect(() => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    firebase
      .firestore()
      .collection("notes")
      .where("userId", "==", uid)
      .onSnapshot((querySnapshot) => {
        const newNotes = [];
        querySnapshot.forEach((doc) => {
          const { note, title } = doc.data();
          newNotes.push({ note, title, id: doc.id });
        });
        setNotes(newNotes);
      });
  }, []);

  //search in note title and note (description), adapted from dev.to article by Asim Dahal [17]
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.note.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaWrapper>
      {/* Search area */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" style={styles.searchIcon} />
        <TextInput
          placeholder="Search notes..."
          placeholderTextColor={"#333333"}
          style={styles.searchInput}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      {/* display notes in a flashlist for better performance [18], use 2 columns */}
      <View style={{ flexGrow: 1 }}>
        <FlashList
          data={filteredNotes}
          numColumns={2}
          estimatedItemSize={100}
          renderItem={({ item }) => (
            <NoteItem item={item} navigation={navigation} />
          )}
        />
      </View>
      {/* New Notes button */}
      <TouchableOpacity
        style={styles.newNoteButton}
        onPress={() => navigation.navigate("NewNotes")}
      >
        <View style={styles.newNoteButtonContainer}>
          <Text style={styles.buttonText}>New note</Text>
          <Ionicons name="document" style={styles.icon} />
        </View>
      </TouchableOpacity>
      {/* </ScrollView> */}
    </SafeAreaWrapper>
  );
};

export default NotesScreen;
