import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Vibration,
  ImageBackground,
} from "react-native";
import Slider from "@react-native-community/slider"; //slider
import styles from "../styles/FocusStyle"; //styling
import Ionicons from "react-native-vector-icons/Ionicons"; //icons
import Pulsating from "../components/Pulsating"; //pulsating component
import backgroundImage from "../assets/images/clouds.png"; //backgroundimage


//TIMER SCREEN

const FocusScreen = () => {
  const [workTime, setWorkTime] = useState(25); //default work time is 25 minutes
  const [breakTime, setBreakTime] = useState(5); //default break time is 5 minutes
  const [isWorking, setIsWorking] = useState(true); //track if its work or break time
  const [isActive, setIsActive] = useState(false); //track if the timer is on
  const [timeLeft, setTimeLeft] = useState(workTime * 60); //time left in seconds

  useEffect(() => {
    let interval;

    //timer logic
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        // time is counting down with -1 every second, adapted from FreeCodeCamp [22]
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      //if there are 0 seconds left, stop timer
    } else if (timeLeft === 0) {
      setIsActive(false);

      //switch between work and break times and reset timer
      setIsWorking((prevIsWorking) => !prevIsWorking);
      setTimeLeft(() => (isWorking ? breakTime : workTime) * 60);

      //vibrates 3 times * 1 second when work or break time is completed, from React Native docu [23]
      Vibration.vibrate([1000, 1000, 1000]);
    }

    return () => {
      //clear the timer set, from w3 schools [24]
      clearInterval(interval);
    };
  }, [isActive, timeLeft, workTime, breakTime, isWorking]);

  //start timer
  const startTimer = () => {
    setIsActive(true);
  };
  //pause timer
  const pauseTimer = () => {
    setIsActive(false);
  };

  //reset timer - stop the timer, reset time based on work or break time
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isWorking ? workTime * 60 : breakTime * 60);
  };

  //format the time from seconds to minutes, for better readability [21]
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
  };

  return (
    // background image
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      {/* container for elements inside the background container */}
      <View style={styles.container}>
        {/* beige background */}
        <View style={styles.backgroundContainer}>
          {/* pulsating circle */}
          <View style={styles.pulseContainer}>
            <Pulsating style={styles.pulsing} isActive={isActive}></Pulsating>
            <Text style={styles.timerText}>
              {isWorking ? "Work Time" : "Break Time"}
            </Text>
            {/* show time left in MM:SS */}
            <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          </View>

          {/* slider area */}
          <View style={styles.sliderContainer}>
            {/* work time */}
            <Text style={styles.label}>Work Time</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={120}
              step={1}
              value={workTime}
              onValueChange={(value) => setWorkTime(value)}
            />
            <Text style={styles.valueLabel}>{workTime} minutes</Text>
          </View>

          {/* break time */}
          <View style={styles.sliderContainer}>
            <Text style={styles.label}>Break Time</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={120}
              step={1}
              value={breakTime}
              onValueChange={(value) => setBreakTime(value)}
            />
            <Text style={styles.valueLabel}>{breakTime} minutes</Text>
          </View>

          {/* pause/ play/ reset buttons */}
          <View style={styles.buttonContainer}>
            {isActive ? (
              <TouchableOpacity onPress={pauseTimer}>
                <Ionicons name="pause-circle" style={styles.icon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={startTimer}>
                <Ionicons name="play-circle" style={styles.icon} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={resetTimer}>
              <Ionicons name="refresh-circle" style={styles.resetIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default FocusScreen;
