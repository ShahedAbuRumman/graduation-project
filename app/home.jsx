import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../assets/style/colors";
import BottomNav from "../component/bottomnav";
import { useRouter } from "expo-router";
import Testimonials from "../component/testimonials"; 

export default function HomePage() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        
        
        <Image
          source={require("../assets/images/heroimage (2).png")} 
          style={styles.heroImage}
        />

       
        <Text style={styles.header}>CyberGuard</Text>
        <Text style={styles.subheader}>Welcome back 👋</Text>

       
        <View style={styles.card}>
          <Text style={styles.cardText}>Do you need to make a new scan?</Text>
          <TouchableOpacity
            onPress={() => router.push("scannerscreen")}
            style={styles.scanButton}
          >
            <Text style={styles.scanButtonText}>Scan Now</Text>
          </TouchableOpacity>
        </View>

       
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Your Last Scan</Text>
          <Text style={styles.infoDetail}>2 vulnerabilities found</Text>
          <Text style={styles.infoDetail}>Last run: 2 days ago</Text>
        </View>

       
        <Testimonials />
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
  container: {
    padding: 20,
    paddingBottom: 100, 
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 200,
    marginTop: 30,
    resizeMode: "contain",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
  },
  subheader: {
    fontSize: 18,
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 25,
  },
  cardText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    textAlign: "center",
  },
  scanButton: {
    width: "70%",          
    backgroundColor: "#f25c0c", 
    paddingVertical: 10,     
    borderRadius: 30,       
    alignItems: "center",
    marginBottom: 20,        
    shadowColor: "#000",     
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    margin: 20,
    width: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLORS.primary,
  },
  infoDetail: {
    fontSize: 14,
    color: "#444",
    marginBottom: 3,
  },
});
