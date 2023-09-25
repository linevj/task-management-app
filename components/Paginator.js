import { View, Animated, useWindowDimensions } from "react-native";
import React from "react";
import { styles } from "../styles/OnboardingStyle";

// Paginator adapted from Youtube tutorial "Onboarding tutorial for React Native - Fluid Indicator #2" [38]

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.pagContainer}>
      {/* to loop over the data. The key is the index converted to a string */}
      {data.map((_, i) => {
        // previous dot, the current dot, the next dot
        const inputRange = [(i - 1) * width, i * width, i * 1 * width];

        //makes the current dot wider than the other ones
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        //gives the inactive dots some opacity
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          // The dots
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity, marginBottom: 30 }]}
            key={i.toString()}
          ></Animated.View>
        );
      })}
    </View>
  );
};

export default Paginator;
