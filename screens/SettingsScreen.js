import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Switch,
  Image,
  Alert,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; //date time picker

import SafeAreaWrapper from "../components/SafeAreaWrapper";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications"; //expo notification API
import settingsImage from "../assets/images/settings.png"; //illustration
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth"; //firebase

import { FIREBASE_AUTH } from "../config"; //firebase
import { styles } from "../styles/SettingsStyles"; //styling

// SETTINGS SCREEN


//notification handlings,from Expo documentation on receiving notifications [25]
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, //show alert
    shouldPlaySound: false, //dont play sound
    shouldSetBadge: false, //dont set badge
  }),
});

// Notification code is  from Expo documentation on Notifications [26]
export default function ProfileScreen({ navigation }) {
  //notification useStates
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [switchOn, setSwitchOn] = useState(false); // add state for switch
  const notificationListener = useRef();
  const responseListener = useRef();
  const [selectedTime, setSelectedTime] = useState(null);

  //update password useStates
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [keyboardStatus, setKeyboardStatus] = useState(""); //for keyboard hide/show

  //register for push notifications, from Expo documentation [26]
  async function registerForPushNotificationsAsync() {
    let token;

    //ask user for permission to send notifications
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        //if notification permission got rejected
        alert("Failed to get push token for push notification!");
        return;
      }

      // get the token to send push notification
      const response = await Notifications.getExpoPushTokenAsync();
      token = response.data;
    } else {
      alert("Must use a physical device for Push Notifications");
    }

    return token;
  }

  //timer picker to select time for recieving push notification
  const openTimePicker = async () => {
    try {
      setSelectedTime(new Date());
    } catch (error) {}
  };

  //schedule a daily push notification
  const dailyPushNotification = async ({ hour, minute }) => {
    const trigger = {
      hour,
      minute,
      repeats: true, //daily notification
    };

    //notification message, adapted from expo documentation [26]
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Task update!",
        body: "Did you remember your tasks today?",
      },
      trigger,
    });
  };

  // show notification time
  useEffect(() => {}, [selectedTime]);

  // default notification time at 8AM
  const defaultNotificationTime = { hour: 8, minute: 0 };

  // toggle the switch state and schedule/cancel the notification accordingly
  const toggleSwitch = () => {
    setSwitchOn((prevSwitchOn) => {
      if (!prevSwitchOn) {
        // schedule the daily notification
        dailyPushNotification(defaultNotificationTime);
      } else {
        //cancel the scheduled notification, function from expo docu [26]
        Notifications.cancelAllScheduledNotificationsAsync();
      }
      return !prevSwitchOn;
    });
  };

  //Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      // first reauthenticate the user using their current password, adapted from Google Cloud [27]
      const user = FIREBASE_AUTH.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      //update the user's password
      await updatePassword(user, newPassword); //from Firebase docu [28]
      alert("Password updated successfully!");
    } catch (error) {
      alert("Failed to update password. Please check your current password.");
    }
  };
  //check that the new password matches confirmNewPassword
  const handleSubmit = () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }
    changePassword(currentPassword, newPassword);
  };

  // sign out, adapted from from React Native Firebase [29]
  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      // navigate to SignInScreen after signing out
      navigation.navigate("SignIn");
    } catch (error) {
      let errorMessage = "Error signing out";
      alert(errorMessage);
    }
  };

  //delete account
  const handleDeleteAccount = async () => {
    // when user clicks "Delete Account" button, display a confirmation dialog (Alert) from React Native docu [30]
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              // delete the user's account, from Firebase docu [31]
              await deleteUser(FIREBASE_AUTH.currentUser);

              // then signout user and navigate the Register screen
              await FIREBASE_AUTH.signOut();
              navigation.navigate("Register");
            } catch (error) {
              alert("Failed to delete account. Please try again.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

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
    // Hide keyboard when tapping outside of input field
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Hide illustration when keyboard is active */}
        <SafeAreaWrapper>
          {keyboardStatus !== "active" && (
            <Image source={settingsImage} style={styles.image} />
          )}
          {/* Notification section */}
          <View style={styles.notificationSection}>
            <Text style={styles.title}>Push Notification Alarm</Text>
            <Text style={styles.desc}>
              Toggle the switch to get daily notifications!
            </Text>
            {/* Switch sectio, from React Native doc [32] */}
            <View style={styles.switchSection}>
              <Switch
                style={styles.switch}
                value={switchOn}
                onValueChange={toggleSwitch}
                trackColor={{ false: "white", true: "#34A5B3" }}
                ios_backgroundColor="#555555"
              />
              {/* Time picker */}
              <TouchableOpacity onPress={openTimePicker} style={styles.picker}>
                <Text style={styles.pickerText}>Pick Notification Time</Text>
              </TouchableOpacity>
              {/* Date time picker - props from npmjs doc [33] */}
              {selectedTime && (
                <DateTimePicker
                  style={styles.pickerTime}
                  value={selectedTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selected) => {
                    if (event.type === "set" && selected) {
                      // user selected a time, update selectedTime state
                      setSelectedTime(selected);

                      // schedule the daily notification at the selected time
                      const hour = selected.getHours();
                      const minute = selected.getMinutes();
                      dailyPushNotification({ hour, minute });
                    }
                  }}
                />
              )}
            </View>
          </View>
          {/* Change password section */}
          <View style={styles.updatePasswordContainer}>
            <Text style={styles.title}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />
            {/* Change password button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}
            >
              {/* Sign out button */}
              <Text style={styles.signOutButtonText}>Sign out</Text>
            </TouchableOpacity>

            {/* Delete account button */}
            <View style={styles.deleteAccount}>
              <Button
                onPress={handleDeleteAccount}
                title="Delete Account"
                color={"red"}
              />
            </View>
          </View>
        </SafeAreaWrapper>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
