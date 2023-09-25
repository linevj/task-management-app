import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import NotesScreen from "../screens/NotesScreen";
import NewTaskScreen from "../screens/NewTaskScreen";
import FocusScreen from "../screens/FocusScreen";
import SettingsScreen from "../screens/SettingsScreen";
import styles from "../styles/NavigationStyles";
import Header from "./Header";
import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

// Tab bar adapted from Bottom Tabs Navigator documentation
//component for all tab icons
const TabButton = ({ iconName, label, focused, onPress }) => {
  const hideLabel = () => {
    if (iconName === "add-circle") {
      return null; // hide the label for "add-circle"
    }
    // style the tab bar text, orange if selected, gray otherwise
    return (
      <Text
        style={[styles.tabBarText, { color: focused ? "#E84C21" : "#555555" }]}
      >
        {label}
      </Text>
    );
  };

  // style the tab bar buttons, orange if selected, gray otherwise
  return (
    <TouchableOpacity style={styles.tabBarButton} onPress={onPress}>
      <Ionicons
        name={iconName}
        style={[
          styles.tabBarIcon,
          iconName === "add-circle" ? styles.largeTabButton : {},
        ]}
        color={focused ? "#E84C21" : "#555555"}
      />
      {hideLabel()}
    </TouchableOpacity>
  );
};

//Tab Navigator Buttons
const TabBar = ({ state, navigation }) => (
  <View style={styles.tabBar}>
    {/* Home/ Calendar */}
    <TabButton
      iconName="home"
      label="Home"
      focused={state.index === 0}
      onPress={() => navigation.navigate("Home")}
    />
    {/* Notes */}
    <TabButton
      iconName="document"
      label="Notes"
      focused={state.index === 1}
      onPress={() => navigation.navigate("Notes")}
    />

    {/* Special styling for new task button */}
    <View style={styles.largeTabButton}>
      <TabButton
        iconName="add-circle"
        label="NewTask"
        focused={state.index === 2}
        onPress={() => navigation.navigate("NewTask")}
        options={{ tabBarLabel: false }}
      />
    </View>

    {/* Focus */}
    <TabButton
      iconName="timer"
      label="Focus"
      focused={state.index === 3}
      onPress={() => navigation.navigate("Focus")}
    />

    {/* Settings */}
    <TabButton
      iconName="cog"
      label="Settings"
      focused={state.index === 4}
      onPress={() => navigation.navigate("Settings")}
    />
  </View>
);

// Tab Navigator
const Tabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      {/* Home/ Calendar */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <Header style={styles.header} />,
        }}
      />

      {/* Notes */}
      <Tab.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          headerTitle: () => <Header title="Notes" />,
          header: () => <Header style={styles.header} />,
        }}
      />

      {/* New Task */}
      <Tab.Screen
        name="NewTask"
        component={NewTaskScreen}
        options={{
          //styling to make header blue with drop shadow + white back arrow
          headerTitle: () => <Header name="New Task" />,
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
        }}
      />
      {/* Focus */}
      <Tab.Screen
        name="Focus"
        component={FocusScreen}
        options={{
          //styling to make header blue with drop shadow + white back arrow
          headerTitle: () => <Header name="Focus" />,
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
        }}
      />

      {/* Settings */}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          //styling to make header blue with drop shadow + white back arrow
          headerTitle: () => <Header name="Settings" />,
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
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
