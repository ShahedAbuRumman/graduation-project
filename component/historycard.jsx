import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


export default function HistoryCard({ Targeturl, date, onPress }) {
  return (
    <View style={styles.card}>
      
      <View style={styles.leftContent}>
        <View>
          <Text style={styles.Target}>{Targeturl}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>View Report</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f2f0",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  Target: {
    fontSize: 16,
    fontWeight: "500",
    color: "#181311",
  },
  date: {
    fontSize: 13,
    color: "#8a6f60",
    marginTop: 2,
  },
  button: {
    backgroundColor: "#f5f2f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  buttonText: {
    color: "#181311",
    fontSize: 13,
    fontWeight: "500",
  },
});
