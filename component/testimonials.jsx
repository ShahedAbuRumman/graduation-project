import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const testimonials = [
  {
    id: "1",
    name: "Jihad Ahmad",
    role: "Student",
    feedback: "This app helped me a lot in securing my projects!",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    name: "Sarah Sami",
    role: "Researcher",
    feedback: "Very intuitive and useful. I recommend it to my colleagues.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
];

export default function Testimonials() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.feedback}>{`"${item.feedback}"`}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
    </View>
  );

  return (
    <View>
      <Text style={styles.sectionTitle}>What People Say</Text>
      <FlatList
        data={testimonials}
        keyExtractor={(i) => i.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#181311",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingTop: 10,
    marginHorizontal: 10,
    width: 260,
    height: 200,
    alignItems: "center",
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  feedback: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
    marginBottom: 4,
  },
  name: { fontSize: 16, fontWeight: "bold", color: "#222" },
  role: { fontSize: 12, color: "#8a6f60" },
});
