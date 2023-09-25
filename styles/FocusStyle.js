import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //FOCUS SCREEN STYLING

  //background image
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },

  //beige background
  backgroundContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#EFE6DB",
    borderRadius: 15,
  },

  //container for elements inside the background container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  //Timer styling
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 80,
  },

  //Pulsating circle styling
  pulseContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  pulsing: {
    marginBottom: -150,
    backgroundColor: "#34A5B3",
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.4,
  },

  // Slider area
  sliderContainer: {
    marginBottom: 50,
  },

  slider: {
    width: 240,
  },

  //Slider text
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },

  //slider value
  valueLabel: {
    fontSize: 16,
    color: "#555555",
  },

  //Button styling
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },

  //Play/ pause button
  icon: {
    color: "#E84C20",
    marginHorizontal: 20,
    fontSize: 52,
  },

  //Reset button
  resetIcon: {
    color: "#333333",
    marginHorizontal: 20,
    fontSize: 52,
  },
});
export default styles;
