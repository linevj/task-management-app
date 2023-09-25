import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Navigation from "./components/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback } from "react";

SplashScreen.preventAutoHideAsync(); //dont hide splashscreen while loading fonts

export default function App() {
  // Using/ loading the custom font Public Sans [43]. Adapted from expo docu [44]
  const [fontsLoaded, fontError] = useFonts({
    Regular: require("./assets/fonts/PublicSans-Regular.ttf"),
    Italic: require("./assets/fonts/PublicSans-Italic.ttf"),
    Bold: require("./assets/fonts/PublicSans-Bold.ttf"),
  });

  //Hide splashscreen when fonts are loaded or font error.  From expo documentation [45]
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  //if non are true, show splashscreen
  if (!fontsLoaded && !fontError) {
    return null;
  }

  //Return navigation component
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// export default App;
