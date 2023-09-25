import { StyleSheet } from "react-native";


//ONBOARDING STYLES, INCLUDING PAGINATOR 
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },

  //round arrow button
  button: {
    marginTop: "10%",
    marginBottom: 24,
    alignSelf: "center",
    backgroundColor: "#34A5B3",
    width: 80,
    height: 50,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  //arrow icon
  icon: {
    fontSize: 32,
    color: "white",
  },

  //paginator
  pagContainer: {
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  //dots that shows slide progress 
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#34A5B3",
    marginHorizontal: 8,
  },
});
