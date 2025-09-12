import React from "react";
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import VulnerabilityItem from "../component/vulnerabilityitem"; 

export default function ScanReport() {
  const vulnerabilities = [
    {
      title: "SQL Injection",
      detail: "Severity: High. Suggested Fix: Implement parameterized queries to prevent SQL injection attacks.",
    },
    {
      title: "Cross-Site Scripting (XSS)",
      detail: "Severity: High. Suggested Fix: Implement parameterized queries to prevent SQL injection attacks.",
    },
    {
      title: "Broken Authentication",
      detail: "Severity: High. Suggested Fix: Implement parameterized queries to prevent SQL injection attacks.",
    },
  ];

  return (
    <ScrollView style={styles.screen}>
      
      
        <Text style={styles.headerTitle}>Scan Report</Text>
        <View style={{ width: 24 }} />
      

     
      <View style={styles.summaryContainer}>
        <ImageBackground
          source={require("../assets/images/report.png")} 
          style={styles.summaryImage}
          imageStyle={styles.summaryImageStyle}
        >
          <View style={styles.summaryTextRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.summaryTitle}>3 vulnerabilities found</Text>
              <Text style={styles.summarySubTitle}>Risk Level: Moderate</Text>
            </View>
            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>Export</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

     
      <View style={styles.vulnList}>
        {vulnerabilities.map((item, index) => (
          <VulnerabilityItem
            key={index}
            title={item.title}
            detail={item.detail}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
 
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#181311",
    flex: 1,
    padding: 50,
  },
  summaryContainer: {
    padding: 16,
  },
  summaryImage: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
  },
  summaryImageStyle: {
    borderRadius: 12,
  },
  summaryTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 12,
  },
  summaryTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  summarySubTitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  viewDetailsButton: {
    backgroundColor: "#eb5f13",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  viewDetailsText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  vulnList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
