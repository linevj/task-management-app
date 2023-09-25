import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

// Safeareview with flex: 1, adapted from React Native docu [41]
const SafeAreaWrapper = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default SafeAreaWrapper;
