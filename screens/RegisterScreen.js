// RegisterScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; //async storage
import { useNavigation } from "@react-navigation/native"; //navigation
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import { FIREBASE_AUTH } from "../config"; //firebase
import { createUserWithEmailAndPassword } from "firebase/auth"; //firebase
import { styles } from "../styles/RegisterStyle"; //styles
import registerImage from "../assets/images/onboarding1.png"; //illustration

//REGISTER SCREEN

const RegisterScreen = () => {
  const navigation = useNavigation(); //setting up navigation
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [name, setName] = useState(""); //useState hook to manage name input
  const [email, setEmail] = useState(""); //useState hook to manage email input
  const [password, setPassword] = useState(""); //useState hook to manage password input
  const [confirmPassword, setConfirmPassword] = useState(""); //useState hook to manage confirmed password input
  const [keyboardStatus, setKeyboardStatus] = useState("");

  const auth = FIREBASE_AUTH; //firebase config

  //while screen is loading, show loading component
  const Loading = () => {
    <ActivityIndicator size={"large"} />;
  };

  //Followed Firebase documentation to set up Firebase Authentication [1]

  const signUp = () => {
    //to check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //if user credentials match, navigate to Homescreen
        const user = userCredential.user;
        navigation.navigate("MainHome");
      })
      //error message if registration failed
      .catch((error) => {
        let errorMessage =
          "Registration failed. Please check your credentials and try again";
        if (error.code === "auth/invalid-login-crendentials") {
          errorMessage =
            "Registration failed. Please check your credentials and try again";
        }
        alert(errorMessage);
      });
  };

  // check if user has viewed onboarding slides before, using async storage.
  // Adapted from the YouTube tutorial "Onboarding tutorial for React Native - Animated Carousel #1" [2]
  const onBoardStatus = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      //if the user has viewed the onboarding, set @viewedOnboading to true
      if (value !== null) {
        setViewedOnboarding(true);
      }
      //if user has not viewed onboarding, nothing happens
    } catch (err) {
    } finally {
      // loading process is complete
      setLoading(false);
    }
  };

  //call onBoardStatus function once to check if user has viewd onboarding slides
  useEffect(() => {
    onBoardStatus();
  }, []);

  // Hide illustration when keyboard is showing, to not hide the content
  // From Stackoverflow - "How to detect when keyboard is opened or closed in React Native" [3]
  useEffect(() => {
    //listen to keyboard events
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardStatus("active");
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardStatus("inactive");
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    // hide keyboard when user taps outside of input fields
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Adjust screen layout when keyboard is showing to not hide content  */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* if loading is true, show loading symbol, if not show content */}
        {loading ? (
          <Loading />
        ) : (
          <SafeAreaWrapper>
            <View style={styles.inner}>
              {/* If the keyboard is not active, show the image */}
              {keyboardStatus !== "active" && (
                <Image source={registerImage} style={styles.image} />
              )}

              {/* Header */}
              <Text style={styles.title}>Create New Account</Text>

              {/* Name input area */}
              <Text style={styles.label}>Name:</Text>
              <TextInput
                value={name}
                style={styles.input}
                placeholder="Name"
                autoCapitalize="words"
                onChangeText={(text) => setName(text)}
              />
              {/* Email input area */}
              <Text style={styles.label}>Email:</Text>
              <TextInput
                value={email}
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
              />

              {/* Password input area */}
              <Text style={styles.label}>Password:</Text>
              <TextInput
                secureTextEntry={true}
                value={password}
                style={styles.input}
                placeholder="Password"
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
              />
              {/* Confirm password input area */}
              <Text style={styles.label}>Confirm Password:</Text>
              <TextInput
                secureTextEntry={true}
                value={confirmPassword}
                style={styles.input}
                placeholder="Confirm Password"
                autoCapitalize="none"
                onChangeText={(text) => setConfirmPassword(text)}
              />

              {/* Button area */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={signUp}>
                  <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
              </View>

              {/* Sign in area */}
              <View style={styles.alreadyContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text style={styles.loginLink}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaWrapper>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
