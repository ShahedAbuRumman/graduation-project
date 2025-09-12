import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={pathname === "/home" ? styles.navItemActive : styles.navItem}
        onPress={() => router.push("/home")}
      >
        <Ionicons
          name="home-outline"
          size={24}
          color={pathname === "/home" ? "#181311" : "#8a6f60"}
        />
        <Text
          style={pathname === "/home" ? styles.navTextActive : styles.navText}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={pathname === "/scan" ? styles.navItemActive : styles.navItem}
        onPress={() => router.push("/scannerscreen")}
      >
        <FontAwesome5
          name="qrcode"
          size={22}
          color={pathname === "/scan" ? "#181311" : "#8a6f60"}
        />
        <Text
          style={pathname === "/scan" ? styles.navTextActive : styles.navText}
        >
          Scan
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={pathname === "/history" ? styles.navItemActive : styles.navItem}
        onPress={() => router.push("/historyscreen")}
      >
        <MaterialIcons
          name="history"
          size={24}
          color={pathname === "/history" ? "#181311" : "#8a6f60"}
        />
        <Text
          style={
            pathname === "/history" ? styles.navTextActive : styles.navText
          }
        >
          History
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={pathname === "/settings" ? styles.navItemActive : styles.navItem}
        onPress={() => router.push("/settings")}
      >
        <Ionicons
          name="settings"
          size={24}
          color={pathname === "/settings" ? "#181311" : "#8a6f60"}
        />
        <Text
          style={
            pathname === "/settings" ? styles.navTextActive : styles.navText
          }
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#f5f2f0",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingBottom:50,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navItemActive: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    color: "#8a6f60",
  },
  navTextActive: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#181311",
  },
});
