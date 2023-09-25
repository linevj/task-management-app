import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth"; //firebase
import SigninScreen from "../screens/SigninScreen";
import Tabs from "./Tabs";
import { FIREBASE_AUTH } from "../config"; //firebase
import Header from "./Header";
import NewNotes from "../screens/NewNotesScreen";
import EditNotes from "../screens/EditNotesScreen";
import EditTaskScreen from "../screens/EditTaskScreen";
import OnboardingScreen from "./Onboarding";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator(); //create stack navigator

const Navigation = () => {
  const [user, setUser] = useState(null); //user state is null initially

  useEffect(() => {
    //listen to authentication changes, from StackOverflow [34]
    const unsubscribe = onAuthStateChanged(
      FIREBASE_AUTH,
      (authenticatedUser) => {
        setUser(authenticatedUser);
      }
    );

    return () => unsubscribe();
  }, []);

  // StackNavigator adapted from documentaion, React Navigation [35]
  return (
    // Initial screen will be Home if logged in, and Onboarding otherwise
    <Stack.Navigator initialRouteName={user ? "Home" : "Onboarding"}>
      <Stack.Screen
        name="MainHome"
        component={Tabs}
        options={{ headerShown: false }}
      />

      {/* Register screen */}
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      {/* display the OnboardingScreen for new users */}
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />

      {/* Sign in screen */}
      <Stack.Screen
        name="SignIn"
        component={SigninScreen}
        options={{ headerShown: false }}
      />

      {/* EditTask, NewNotes and EditNotes in Stack Screen because we dont want the tab bar here [36]*/}

      {/* Edit task screen */}
      <Stack.Screen
        name="EditTask"
        component={EditTaskScreen}
        options={{
          //styling to make header blue with drop shadow + white back arrow
          headerTitle: () => <Header name="Edit Task" />,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#34A5B3",
            height: 120,
            elevation: 4,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          headerTintColor: "#ffffff",
        }}
      />

      {/* New Notes screen */}
      <Stack.Screen
        component={NewNotes}
        name="NewNotes"
        options={{
          headerTitle: () => <Header name="New Note" />,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#34A5B3",
            height: 120,
            elevation: 4,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          headerTintColor: "#ffffff",
        }}
      />

      {/* Edit Notes screen */}
      <Stack.Screen
        component={EditNotes}
        name="EditNotes"
        options={{
          headerTitle: () => <Header name="Edit Note" />,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#34A5B3",
            height: 120,
            elevation: 4,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          headerTintColor: "#ffffff",
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
