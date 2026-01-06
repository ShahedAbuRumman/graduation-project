import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import HistoryCard from "../component/historycard";
import BottomNav from "../component/bottomnav";
import { useRouter } from "expo-router";

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Scan History</Text>

        <HistoryCard
          Targeturl="----"
          date="10/10/2024 10:00 AM"
          onPress={() => router.push("/reportscreen")}
        />
        <HistoryCard
          Targeturl="-----"
          date="10/09/2024 02:30 PM"
          onPress={() => router.push("/reportscreen")}
        />
        <HistoryCard
          Targeturl="----"
          date="10/08/2024 09:15 AM"
          onPress={() => router.push("/reportscreen")}
        />
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 100, 
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#f25212ff",
    padding:30,
  },
});
