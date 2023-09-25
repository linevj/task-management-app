import { StyleSheet } from "react-native";

//ONBOARDING INDIVIDUAL SLIDES
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  //image styling
  image: {
    paddingTop: "50%",
    flex: 0.6,
    justifyContent: "center",
  },
  //onboarding title
  title: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 20,
    color: "#34A5B3",
    textAlign: "center",
  },
  //onboarding description
  desc: {
    fontSize: 20,
    color: "#444444",
    textAlign: "center",
    paddingHorizontal: "15%",
  },
});
