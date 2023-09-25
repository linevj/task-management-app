import { StyleSheet } from "react-native";

// NOTES SCREEN

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },

  //note "grid"
  noteView: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 160,
    minHeight: 160,
  },

  //note title text
  noteTitle: {
    paddingLeft: "3%",
    fontSize: 18,
    fontWeight: "bold",
  },

  //note description text
  noteDesc: {
    paddingLeft: "3%",
    fontSize: 16,
    marginTop: 4,
    paddingBottom: 38,
  },

  //search container area
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
    }),
  },

  searchIcon: {
    marginRight: 10,
    color: "#34A5B3",
    fontSize: 24,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },

  //new note button area
  newNoteButtonContainer: {
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  newNoteButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    justifyContent: "center",
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#34A5B3",
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    elevation: 5,
  },
  //"New note" text
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  //document icon
  icon: {
    paddingTop: 6,
    fontSize: 24,
    color: "#fff",
  },
});

export default styles;
