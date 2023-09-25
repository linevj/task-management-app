import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; //icons
import { styles } from "../styles/OnboardingStyle"; //styles
import slides from "../slides"; //onboarding slides
import OnboardingSlide from "./OnboardingSlide";
import Paginator from "./Paginator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../config"; //firebase

// Onboarding screens adapted from Youtube tutorial: Onboarding tutorial for React Native - Animated Carousel #1 [37]

const OnboardingScreen = ({ navigation }) => {
  const user = firebase.auth().currentUser;
  const [currentIndex, setCurrentIndex] = useState(0); //keep track of the currently shown slide index
  const scrollX = useRef(new Animated.Value(0)).current; //animated value to control slide animations (X)
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    //update curerntIndex when viewable items change
    setCurrentIndex(viewableItems[0].index);
  }).current;

  //next slide needs to be at least 50% on screen before it will change
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  //check onboarding status
  useEffect(() => {
    onBoardingStatus();
  }, []);

  //check if user has viewd the onboarding slides before or not, if they have navigate to Sigin or Home
  const onBoardingStatus = async () => {
    const value = await AsyncStorage.getItem("@viewedOnboarding");
    //the user has viewed the onboarinng
    if (value !== null) {
      if (user) navigation.navigate("MainHome");
      else navigation.navigate("SignIn");
    }
  };

  //function to make the next button work, moves the slides forward
  const nextSlide = async () => {
    //check if we have any slides left, if we do scroll to the next slide
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      //if we are on the last slide, set viewonboardin to true and store it in AsyncStorage,
      //navigate to Home if signed in or else Register
      try {
        await AsyncStorage.setItem("@viewedOnboarding", "true");
        if (user) navigation.navigate("MainHome");
        else navigation.navigate("Register");
      } catch (err) {}
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        {/* list of slides, also from Youtube tutorial [37] */}
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingSlide item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false, //because NativeDriver does not support animating width
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        ></FlatList>
      </View>

      {/* Arrow button */}
      <TouchableOpacity
        onPress={nextSlide}
        style={styles.button}
        activeOpacity={0.6}
      >
        <Ionicons name="arrow-forward" style={styles.icon} />
      </TouchableOpacity>
      <Paginator data={slides} scrollX={scrollX} />
    </View>
  );
};

export default OnboardingScreen;
