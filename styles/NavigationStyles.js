import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //TAB BAR STYLING
  // Tab style and shadow adapted/ inspired from: https://www.youtube.com/watch?app=desktop&v=gPaBicMaib4&ab_channel=PradipDebnath

  //tab bar container
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingBottom: "8%",
    height: "10%",
    borderRadius: 15,
    paddingLeft: "3%",
    paddingRight: "3%",
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  //icons
  tabBarIcon: {
    fontSize: 24,
    textAlign: "center",
  },

  //tab bar label
  tabBarText: {
    fontSize: 12,
    color: "#E84C21",
  },

  //large "+-icon" in the center of tab bar
  largeTabButton: {
    backgroundColor: "transparent",
    fontSize: 80,
    color: "#34A5B3",
    marginBottom: -15,
    bottom: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -5,
    marginRight: -5,
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;
