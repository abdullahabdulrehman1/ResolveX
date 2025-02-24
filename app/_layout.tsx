import { useCustomFonts } from "@/config/font";
import { ThemeProvider } from "@/context/themecontext";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#A855F7" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <PaperProvider>
      <Stack
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signin/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgotPassword/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack></PaperProvider>
    </ThemeProvider>
  );
}
