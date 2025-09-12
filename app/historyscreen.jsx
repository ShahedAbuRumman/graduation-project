import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import HistoryCard from "../component/historycard";
import BottomNav from "../component/bottomnav";
import { useRouter } from "expo-router";

export default function HistoryScreen() {
    const router = useRouter();
    return (
        <View style={style.screen}>
      <ScrollView style={{ flex: 1, paddingTop:20, backgroundColor: "#fff" }}>
          <Text style={style.title}>Scan History</Text> 
      <HistoryCard
        Targeturl="----"
        date="10/10/2024 10:00 AM"
        onPress={() => router.push("reportscreen")}
      />
      <HistoryCard
        Targeturl="-----"
        date="10/09/2024 02:30 PM"
        onPress={() => router.push("reportscreen")}
      />
      <HistoryCard
        Targeturl="----"
        date="10/08/2024 09:15 AM"
        onPress={() => router.push("reportscreen")}
            />
             
        </ScrollView>
            <BottomNav />
            </View>
  );
}
const style = StyleSheet.create({
    screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
     title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    textAlign: "center", 
    padding: 50,
    color: "f25212ff" 
    },
})