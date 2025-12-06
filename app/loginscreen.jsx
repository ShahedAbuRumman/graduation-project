import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import PrimaryButton from "@/component/primarybutton";
import Icon from "../component/icon";
import { useRouter } from "expo-router"; 
import api from "./api";

export default function LoginScreen() {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" }); 

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

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

    setErrors(newErrors);
    if (!valid) return;

    try {
      
      await api.post("/login", { email, password });
      router.push("/home");
    } catch (err) {
      setErrors({ ...newErrors, password: err.response?.data?.error || "Login failed" });
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <View style={[styles.inputWrapper, errors.email ? styles.inputError : null]}>
        <TextInput
          placeholder="Enter your email"
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

      <PrimaryButton title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => router.push("/forgotpassscreen")}>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/registerscreen")}>
        <Text style={styles.link}>New here? Create an account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f2f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "red",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 50,
    color: "#f25212ff",
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: "#181311",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
  },
  link: {
    color: "#ff8000ff",
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});
