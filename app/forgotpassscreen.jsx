import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from "react-native";
import PrimaryButton from "@/component/primarybutton";
import Icon from "../component/icon";
import { useRouter } from "expo-router";
import api from "./api"; 

export default function ForgotPasswordScreen() {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", confPassword: "" });

  
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleReset = async () => {
    let valid = true;
    const newErrors = { email: "", password: "", confPassword: "" };

    
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    
    if (!confPassword) {
      newErrors.confPassword = "Please confirm your password";
      valid = false;
    } else if (password !== confPassword) {
      newErrors.confPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      const { data } = await api.post("/reset-password", { email, password });

      
      if (data.success === false || data.message?.toLowerCase().includes("user")) {
        setErrors((prev) => ({ ...prev, email: data.message || "User not found" }));
        return; 
      }

      
      Alert.alert("Success", data.message || "Password reset successful");
      router.push("/loginscreen");
    } catch (err) {
      console.error("Reset Password Error:", err.response?.data || err.message);

      const backendMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message;

      
      setErrors((prev) => ({ ...prev, password: backendMessage || "Failed to reset password" }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reset your Password</Text>
      <Text style={styles.subtitle}>Please enter your new password</Text>

      
      <View style={[styles.inputWrapper, errors.email ? styles.inputError : null]}>
        <TextInput
          placeholder="Enter Your Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prev) => ({
              ...prev,
              email: !text ? "Email is required" : !validateEmail(text) ? "Please enter a valid email" : "",
            }));
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Icon name="envelope" size={20} color="#8a6f60" />
      </View>
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

     
      <View style={[styles.inputWrapper, errors.password ? styles.inputError : null]}>
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors((prev) => ({
              ...prev,
              password: !text ? "Password is required" : "",
            }));
          }}
          secureTextEntry
        />
        <Icon name="lock" size={20} color="#8a6f60" />
      </View>
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      
      <View style={[styles.inputWrapper, errors.confPassword ? styles.inputError : null]}>
        <TextInput
          placeholder="Confirm your password"
          style={styles.input}
          value={confPassword}
          onChangeText={(text) => {
            setConfPassword(text);
            setErrors((prev) => ({
              ...prev,
              confPassword: !text ? "Please confirm your password" : text !== password ? "Passwords do not match" : "",
            }));
          }}
          secureTextEntry
        />
        <Icon name="lock" size={20} color="#8a6f60" />
      </View>
      {errors.confPassword ? <Text style={styles.errorText}>{errors.confPassword}</Text> : null}

      <PrimaryButton title="Reset Password" onPress={handleReset} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#f5f2f0", borderRadius: 12, paddingHorizontal: 12, marginBottom: 5, borderWidth: 1, borderColor: "transparent" },
  inputError: { borderColor: "red" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "left", paddingBottom: 20, color: "#f25212ff" },
  subtitle: { fontSize: 14, fontWeight: "bold", textAlign: "left", paddingBottom: 50, color: "#8a6f60" },
  input: { flex: 1, padding: 14, fontSize: 16, color: "#181311" },
  errorText: { color: "red", marginBottom: 10, marginLeft: 5 },
});
