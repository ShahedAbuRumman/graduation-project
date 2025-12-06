import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import PrimaryButton from "@/component/primarybutton";
import SecondaryButton from "@/component/secondarybutton";
import welcomeimage from "@/assets/images/welcomeimage.png";
import { useRouter } from "expo-router";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={welcomeimage}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>CyberGuard</Text>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Register"
          onPress={() => router.push("/registerscreen")}
        />
        <SecondaryButton
          title="Log In"
          onPress={() => router.push("/loginscreen")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 300 },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    padding: 20,
    gap: 12,
  },
});
