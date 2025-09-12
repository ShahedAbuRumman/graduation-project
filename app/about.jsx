import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import BottomNav from "../component/bottomnav";

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={{ width: 24 }} /> 
      </View>

     
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.card}>
          <View style={styles.textBox}>
            <Text style={styles.cardTitle}>Who We Are</Text>
            <Text style={styles.cardText}>
              We are a team of cybersecurity experts dedicated to protecting individuals and organizations from threats. 
              Our expertise spans threat detection, vulnerability scanning, and incident response.
            </Text>
          </View>
          <Image
          source={require("../assets/images/team.png")} 
          style={styles.cardImage}
        />

        </View>

        
        <View style={styles.card}>
          <View style={styles.textBox}>
            <Text style={styles.cardTitle}>Project Purpose</Text>
            <Text style={styles.cardText}>
              Our vulnerability scanner identifies weaknesses in systems, helping users proactively address 
              risks. This ensures a safer digital environment for everyone.
            </Text>
          </View>
          <Image
          source={require("../assets/images/purpose.jpg")} 
          style={styles.cardImage}
        />

        </View>

        
        <View style={styles.card}>
          <View style={styles.textBox}>
            <Text style={styles.cardTitle}>University Details</Text>
            <Text style={styles.cardText}>
              This project was developed as part of the Graduation Project at the University of Jordan, 
              supervised by our professors in Cybersecurity.
            </Text>
          </View>
         <Image
          source={require("../assets/images/university.png")} 
          style={styles.cardImage}
        />

        </View>
      </ScrollView>
      <BottomNav />
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom:20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#181311",
  },
  scroll: { padding: 16, gap: 16 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    gap: 12,
  },
  textBox: { flex: 2 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#181311" },
  cardText: { fontSize: 14, color: "#8a6f60", marginTop: 4 },
  cardImage: {
    flex: 1,
    height: 100,
    borderRadius: 10,
  },
  });
