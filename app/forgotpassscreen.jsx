import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import PrimaryButton from "@/component/primarybutton";
import Icon from "../component/icon";
import { useRouter } from "expo-router";
import api from "./api";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confPassword: "",
  });

  

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordRules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?#&]/.test(password),
  };

  const isStrongPassword = Object.values(passwordRules).every(Boolean);

  

  const handleReset = async () => {
    let valid = true;
    const newErrors = { email: "", password: "", confPassword: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!isStrongPassword) {
      newErrors.password = "Password does not meet requirements";
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
      const { data } = await api.post("/reset-password", {
        email,
        password,
      });

      if (data?.success === false) {
        setErrors((prev) => ({
          ...prev,
          email: data.message || "User not found",
        }));
        return;
      }

      Alert.alert("Success", data.message || "Password reset successful");
      router.push("/loginscreen");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        password:
          err.response?.data?.message || "Failed to reset password",
      }));
    }
  };

  

  const Rule = ({ ok, text }) => (
    <Text style={[styles.rule, { color: ok ? "green" : "red" }]}>
      {ok ? "✓" : "✗"} {text}
    </Text>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reset your Password</Text>
      <Text style={styles.subtitle}>Please enter your new password</Text>

     
      <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
        <TextInput
          placeholder="Enter Your Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((p) => ({ ...p, email: "" }));
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Icon name="envelope" size={20} color="#8a6f60" />
      </View>
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      
      <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
            setErrors((p) => ({ ...p, password: "" }));
          }}
        />
        <Icon name="lock" size={20} color="#8a6f60" />
      </View>

     
      <View style={styles.rulesBox}>
        <Rule ok={passwordRules.length} text="At least 8 characters" />
        <Rule ok={passwordRules.upper} text="One uppercase letter" />
        <Rule ok={passwordRules.lower} text="One lowercase letter" />
        <Rule ok={passwordRules.number} text="One number" />
        <Rule ok={passwordRules.special} text="One special character" />
      </View>

      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

      
      <View
        style={[
          styles.inputWrapper,
          errors.confPassword && styles.inputError,
        ]}
      >
        <TextInput
          placeholder="Confirm your password"
          style={styles.input}
          value={confPassword}
          secureTextEntry
          onChangeText={(text) => {
            setConfPassword(text);
            setErrors((p) => ({ ...p, confPassword: "" }));
          }}
        />
        <Icon name="lock" size={20} color="#8a6f60" />
      </View>
      {errors.confPassword ? (
        <Text style={styles.errorText}>{errors.confPassword}</Text>
      ) : null}

      <PrimaryButton title="Reset Password" onPress={handleReset} />
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 20,
    color: "#f25212ff",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 40,
    color: "#8a6f60",
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
  rulesBox: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  rule: {
    fontSize: 14,
    marginBottom: 4,
  },
});
