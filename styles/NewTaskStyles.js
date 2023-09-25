import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // NEW TASK AND EDIT TASK STYLES

  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: "10%",
    margin: "8%",
  },

  //label size and padding
  titleText: {
    fontSize: 18,
    marginTop: "10%",
  },
  //input area
  input: {
    fontSize: 16,
    marginTop: "3%",
    borderColor: "#888888",
    borderRadius: 8,
    borderWidth: 1,
    padding: "5%",
  },

  //button area
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20%",
  },

  //create task button / save changes button
  button: {
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: "20%",
    borderRadius: 5,
    backgroundColor: "#34A5B3",
  },
  //cancel button
  cancelButtonTask: {
    justifyContent: "center",
    paddingVertical: "5%",
    paddingHorizontal: "10%",
    marginRight: "10%",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000000",
  },

  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },

  cancelButtonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#000000",
  },

  //makes date picker take up smaller area
  datePicker: {
    height: 120,
    margin: -10,
  },

  //makes time picker take up smaller area
  timePicker: {
    height: 120,
    margin: -10,
  },

  //confirm button for picker
  confirmButton: {
    marginTop: "12%",
    paddingHorizontal: "10%",
    paddingVertical: "5%",
    backgroundColor: "#B0E57C",
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },

  //cancel button for picker
  cancelButton: {
    marginTop: "12%",
    paddingHorizontal: "10%",
    paddingVertical: "5%",
    backgroundColor: "#888888",
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },

  //category area
  categoryContainer: {
    flexDirection: "row",
    alignItems: "left",
    marginBottom: 20, 
  },

  //Picker for category
  pickerSelect: {
    fontSize: 20,
    marginTop: 10,
    height: 45,
    padding: "5%",
    borderColor: "#888888",
    borderRadius: 8,
    borderWidth: 1,
  },

  //make input area and +-icon on the same row for category
  inputContainer: {
    flexDirection: "row",
  },

  catInput: {
    fontSize: 16,
    marginTop: "10%",
    borderColor: "#888888",
    borderRadius: 8,
    borderWidth: 1,
    padding: "5%",
  },

  //+ icon for category
  addIcon: {
    marginLeft: 12,
    marginTop: "70%",
    fontSize: 32,
  },

  //importance area
  importanceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  importanceLabel: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#000000",
  },

  importanceLabelText: {
    textAlign: "center",
    color: "#000000",
  },
});
export default styles;
