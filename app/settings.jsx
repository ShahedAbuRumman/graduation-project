import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { COLORS } from "../assets/style/colors";
import BottomNav from "../component/bottomnav";
import { useRouter , usePathname} from "expo-router";

export default function Settings() {
  const router = useRouter();
  const pathname = usePathname();
    
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.header}>Settings</Text>
        
              <TouchableOpacity
        style={pathname === "/About" ? styles.navItemActive : styles.navItem}
        onPress={() => router.push("/about")}
      >
        <Text style={styles.text}>
          About
        </Text>
                  
      </TouchableOpacity>
        <TouchableOpacity
        style={pathname === "/Logout" ? styles.navItemActive : styles.navItem}
        onPress={() => router.push("/welcomepage")}
      >
        <Text style={styles.text}>
          Logout
        </Text>
              </TouchableOpacity>

    
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
    alignItems: "left",
  },
  
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.black,
    marginTop:30,
    margin: 10,
    },
   text: {
    fontSize: 20,
    color: COLORS.black,
    margin: 20,
    },
  
});
