import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const Pulsating = (props) => {
  // Animate.Value and Animated.timing, adapted from React Native doc [39]
  const circleAnim = useRef(new Animated.Value(1)).current;

  //increase circle by 1.1 fro 1 second
  const pulseIn = () => {
    Animated.timing(circleAnim, {
      toValue: 1.1,
      duration: 1000,
      useNativeDriver: true,
    }).start(pulseOut); //start when pulseOut is done
  };

  // reset circle to 1 for 1 second
  const pulseOut = () => {
    Animated.timing(circleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(pulseIn); //start when pulseIn is done
  };

  //check if the props.isActive is true to start
  useEffect(() => {
    if (props.isActive) {
      pulseIn();
    } else {
      // reset the scale value when not active
      circleAnim.setValue(1);
    }
  }, [props.isActive]);

  return props.isActive ? (
    //Animated.View or regular View (no animation) dependant on if props.isActive or not
    <Animated.View
      style={{ ...props.style, transform: [{ scale: circleAnim }] }}
    >
      {/* render children components */}
      {props.children}
    </Animated.View>
  ) : (
    <View style={{ ...props.style }}>{props.children}</View>
  );
};

export default Pulsating;
