import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import PrimaryButton from "@/component/primarybutton";
import Icon from "../component/icon";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState(""); 
  const router = useRouter();

    return ( 
    <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Reset your Password</Text>
            <Text style={styles.subtitle}>Please enter your new password</Text>

      
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter Your Email"
          style={styles.input}
          value={email}
          onChangeText={setemail}
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
            
      
        
          
                  <PrimaryButton title="Reset Password" onPress={() => router.push("/loginscreen")}/>
            
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
    textAlign: "left", 
    paddingBottom: 20,
    color: "#f25212ff" 
    },
    subtitle: { 
    fontSize: 14, 
    fontWeight: "bold", 
    textAlign: "left", 
    paddingBottom: 50,
    color: "#8a6f60" 
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