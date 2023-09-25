import { Text, View, Image, useWindowDimensions } from "react-native";
import React from "react";
import slides from "../slides";
import { styles } from "../styles/OnboardingSlideStyle";

// Onboarding screens adapted from Youtube tutorial: Onboarding tutorial for React Native - Animated Carousel #1 [37]
const OnboardingSlide = ({ item }) => {
  // Render the slides with their individual content (image, title, desc) and add styles to them
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        ...styles.container,
        ...item.style,
        backgroundColor: item.backgroundColor,
      }}
    >
      <View style={[styles.container, { width, height }]}>
        <Image
          source={item.image}
          style={[styles.image, { width, resizeMode: "contain" }]}
        />

        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
        </View>
      </View>
    </View>
  );
};

export default OnboardingSlide;
