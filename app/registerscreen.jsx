import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import PrimaryButton from "@/component/primarybutton";
import Icon from "../component/icon";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      
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
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Icon name="envelope" size={20} color="#8a6f60" />
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

      
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Confirm your password"
          style={styles.input}
          value={confPassword}
          onChangeText={setConfPassword}
          secureTextEntry
        />
        <Icon name="lock" size={20} color="#8a6f60" />
      </View>

      
      <PrimaryButton
          title="Register"
          onPress={() => router.push("/home")} 
        />
      
      <TouchableOpacity onPress={() => router.push("/loginscreen")}>
        <Text style={styles.link}>Already have an account? Log In</Text>
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
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 20, 
    color: "#181311" 
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f2f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 15,
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
});
