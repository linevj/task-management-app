import { StyleSheet } from "react-native";

//REGISTER SCREEN AND SIGN IN SCREEN

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 32,
  },

  //center content
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  //image styling
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },

  //create account title
  title: {
    fontSize: 24,
    color: "#333333",
    fontWeight: "bold",
    marginBottom: 16,
  },

  //labels for input fields
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333333",
    paddingBottom: 3,
    textAlign: "left",
    alignSelf: "stretch",
    marginLeft: "11%",
  },

  //input fields
  input: {
    backgroundColor: "#ffffff",
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },

  //create account button
  buttonContainer: {
    paddingTop: "10%",
  },
  button: {
    justifyContent: "center",
    paddingVertical: "6%",
    paddingHorizontal: "10%",
    borderRadius: 5,
    backgroundColor: "#34A5B3",
  },

  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },

  //Sign in area
  alreadyContainer: {
    flexDirection: "row",
    paddingTop: 32,
  },

  loginText: {
    fontSize: 16,
  },

  loginLink: {
    color: "#E84C21",
    fontWeight: "bold",
    fontSize: 16,
  },
});
