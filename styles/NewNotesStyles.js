import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  // NEW NOTES SCREEN, EDIT NOTES SCREEN //

  //NEW NOTES SCREEN
  //input labels
  label: {
    paddingLeft: "10%",
    marginTop: "5%",
    fontSize: 18,
    fontWeight: "bold",
  },

  //note title, input
  inputTitle: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "1%",
    marginBottom: "3%",
    height: 50,
    width: "80%",
    borderWidth: 1,
    borderColor: "#333333",
    padding: "2%",
    borderRadius: 5,
  },

  //note description input
  inputNoteContainer: {
    alignSelf: "center",
    marginTop: "1%",
    marginBottom: "3%",
    height: 200,
    width: "80%",
    borderWidth: 1,
    borderColor: "#333333",
    padding: "2%",
    borderRadius: 5,
  },

  //description text
  inputText: {
    fontSize: 18,
  },

  //Save note button
  button: {
    paddingVertical: 24,
    paddingHorizontal: "20%",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#34A5B3",
  },

  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },

  //EDIT NOTE SCREEN

  //update button
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20%",
  },
  updateButton: {
    justifyContent: "center",
    paddingVertical: "5%",
    paddingHorizontal: "8%",
    borderRadius: 5,
    backgroundColor: "#34A5B3",
  },

  //delete button
  deleteButton: {
    justifyContent: "center",
    paddingHorizontal: "5%",
    marginRight: "20%",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000000",
  },

  deleteButtonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#000000",
  },
});

export default styles;
