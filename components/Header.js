import { View, Text, StyleSheet } from "react-native";
import React from "react";

//HEADER

const Header = (props) => {
  return (
    <View>
      {/* Render header title with styled text */}
      <Text style={styles.title}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontWeight: "bold", fontSize: 30, color: "white" },
});

export default Header;
