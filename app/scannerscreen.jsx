import React from "react";
import {View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";
import { COLORS } from "../assets/style/colors";
import BottomNav from "../component/bottomnav";
import { useRouter } from "expo-router";


export default function Scanner() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroRow}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.header}>Scanner</Text>
            <Text style={styles.subheader}>Protect your system with one tap</Text>
          </View>
              </View>
              <View>
                   <TextInput placeholder="Enter your URL" style={styles.input}/>  
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => router.push("scannerscreen")}
          >
            <Text style={styles.scanButtonText}>Start Scan</Text>
          </TouchableOpacity>
              
              </View>
       
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Image
              source={require("../assets/images/tip.png")}
              style={styles.tipImage}
            />

            <View style={styles.infoTextWrap}>
              <Text style={styles.infoTitle}>💡 Tip</Text>
              <Text style={styles.infoDetail}>
                Enable real-time protection to stay safe.
              </Text>
              <Text style={styles.infoDetail}>
                Stay protected against threats with continuous monitoring.
              </Text>
            </View>
          </View>
        </View>
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
    paddingTop: 40,
    paddingBottom: 100,
    alignItems: "center",
    width: "100%",
  },

  
  heroRow: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  heroTextWrap: {
    flex: 1,
    marginRight: 12,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.Black,
    textAlign: "center",
    marginTop:20,
  },
  subheader: {
    fontSize: 16,
    color: COLORS.black,
    marginTop: 70,
    marginBottom: 40,
    textAlign:"center",
  },

  
  scanButton: {
    backgroundColor: "#f25c0c",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginTop: 50,
    width: "90%",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  infoRow: {
    flexDirection: "row", 
    alignItems: "center",
  },
  tipImage: {
    width: 80,
    height: 80,
    marginRight: 14,
    borderRadius: 10,
    resizeMode: "contain",
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 6,
  },
  infoDetail: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
    },
   input: { 
  width: "100%",          
  height: 45,             
  paddingHorizontal: 100,  
  fontSize: 16, 
  color: "#181311", 
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 10,
 marginBottom: 16, 
  backgroundColor: "#fff" 
},
});
