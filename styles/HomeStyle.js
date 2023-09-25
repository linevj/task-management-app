import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //HOME CALENDAR STYLES

  //card styles
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    margin: 10,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#dddddd",
    padding: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  //date/ time section of card
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  dateTimeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    color: "#333333",
  },

  dateTimeValue: {
    fontSize: 16,
    color: "#333333",
  },

  // category section
  categoryContainer: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    bottom: -4,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },

  categoryLabel: {
    fontSize: 16,
    color: "#555555",
  },

  //when card is marked as completed
  completedCard: {
    backgroundColor: "lightgray",
    borderWidth: 2,
    opacity: 0.7,
  },

  //Complete icon/ button in top right corner
  icon: {
    fontSize: 38,
    position: "absolute",
    top: 10,
    right: 10,
    borderColor: "green",
  },
});

export default styles;
