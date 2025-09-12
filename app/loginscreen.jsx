import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import PrimaryButton from "@/component/primarybutton";
import Icon from "../component/icon";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

    return ( 
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <Icon name="user" size={20} color="#8a6f60" />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Icon name="lock" size={20} color="#8a6f60" />
      </View>
      
            <PrimaryButton title="Login"
            onPress={() => router.push("/home")} />
            <TouchableOpacity onPress={() => router.push("/forgotpassscreen")} >
                  <Text style={styles.link}>Forgot password? </Text>
                </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/registerscreen")}>
                  <Text style={styles.link}>New here? Create an account </Text>
            </TouchableOpacity>
</ScrollView>
  );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f2f0",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 15,
    },
    title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    textAlign: "center", 
    paddingBottom: 50,
    color: "f25212ff" 
    },
    input: { 
    flex: 1, 
    padding: 14, 
    fontSize: 16, 
    color: "#181311" 
  },
   link: { 
    color: "#ff8000ff", 
    textAlign: "center", 
    marginTop: 15, 
       textDecorationLine: "underline" 
  },
})