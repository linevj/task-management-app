import { StyleSheet } from "react-native";

//SETTINGS SCREEN
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 40,
    backgroundColor: "#ffffff",
  },

  //illustration
  image: {
    alignSelf: "center",
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginBottom: 14,
    marginTop: 10,
  },

  //headings on settings screen
  title: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "bold",
    marginBottom: 8,
  },

  //notification section
  notificationSection: {
    marginBottom: 30,
  },

  switchSection: { flexDirection: "row" },

  picker: { marginLeft: 20, marginTop: 26 },

  pickerText: {
    fontSize: 16,
    color: "#34A5B3",
    textDecorationLine: "underline",
  },

  pickerTime: {
    marginTop: 18,
  },

  switch: {
    marginTop: 20,
  },

  //notification description text
  desc: {
    fontSize: 16,
    color: "#333333",
  },

  //update password section
  updatePasswordContainer: {
    justifyContent: "left",
    alignItems: "left",
  },

  input: {
    backgroundColor: "#ffffff",
    width: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },

  //change password button
  button: {
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: "#34A5B3",
  },

  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#ffffff",
  },

  //sign out and delete buttons
  buttons: {
    flexDirection: "column",
    marginLeft: "58%",
    justifyContent: "flex-end",
    marginTop: 10,
    marginRight: "6%",
  },

  signOutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#FF5A5F",
    borderColor: "red",
  },

  signOutButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333333",
  },
});
