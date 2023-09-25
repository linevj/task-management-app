import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import { useNavigation } from "@react-navigation/native"; //navigation
import { FIREBASE_AUTH } from "../config"; //firebase
import { signInWithEmailAndPassword } from "firebase/auth"; //firebase
import { styles } from "../styles/RegisterStyle"; //styles
import registerImage from "../assets/images/onboarding1.png"; //illustraion

//SIGN IN SCREEN
const SigninScreen = () => {
  const navigation = useNavigation(); //setting up navigation
  const [email, setEmail] = useState(""); //useState hook to manage email input
  const [password, setPassword] = useState(""); //useState hook to manage password input
  const auth = FIREBASE_AUTH; //firebase config

  //Followed Firebase documentation to set up Firebase Authentication [1]
  //Sign in function
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //if user credentials match
        const user = userCredential.user;
        navigation.navigate("MainHome"); //then navigate to Homepage
      })
      //error message if sign in failed
      .catch((error) => {
        let errorMessage =
          "Sign in failed. Please check your credentials or create an account";
        if (error.code === "auth/invalid-login-crendentials") {
          errorMessage =
            "Sign in failed. Please check your credentials or create an account";
        }
        alert(errorMessage);
      });
  };

  return (
    // hide keyboard when user taps outside of input fields
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Adjust screen layout when keyboard is showing to not hide content  */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SafeAreaWrapper>
          <View style={styles.inner}>
            {/* Illustration on top of screen */}
            <Image
              source={registerImage}
              style={[styles.image, { marginTop: 40 }]}
            />
            {/* Header */}
            <Text style={styles.title}>Sign in</Text>

            {/* Email input area */}
            <Text style={styles.label}>Email:</Text>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            ></TextInput>

            {/* Password input area */}
            <Text style={styles.label}>Password:</Text>
            <TextInput
              secureTextEntry={true}
              value={password}
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            ></TextInput>

            {/* Button area */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>
            </View>

            {/* Sign up area */}
            <View style={styles.alreadyContainer}>
              <Text style={styles.loginText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.loginLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaWrapper>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SigninScreen;
