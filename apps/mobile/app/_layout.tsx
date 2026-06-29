import "../global.css";
import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Anuphan_300Light,
  Anuphan_400Regular,
  Anuphan_500Medium,
  Anuphan_600SemiBold,
  Anuphan_700Bold,
} from "@expo-google-fonts/anuphan";
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_600SemiBold,
} from "@expo-google-fonts/jetbrains-mono";
import { AppProvider } from "../context/AppContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Anuphan_300Light,
    Anuphan_400Regular,
    Anuphan_500Medium,
    Anuphan_600SemiBold,
    Anuphan_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
    JetBrainsMono_600SemiBold,
  });

  if (!fontsLoaded) {
    return <View className="flex-1 bg-bg" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-bg" edges={["top", "bottom"]}>
        <AppProvider>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0a0712" } }} />
        </AppProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
