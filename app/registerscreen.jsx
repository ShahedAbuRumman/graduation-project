import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import PrimaryButton from "@/component/primarybutton";
import Icon from "../component/icon";
import { useRouter } from "expo-router";
import api from "./api";

export default function RegisterScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  /* ---------------- Validators ---------------- */

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

  

  const handleRegister = async () => {
    setEmailError("");

    if (!username || !email || !password || !confPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!isStrongPassword) {
      Alert.alert(
        "Weak Password",
        "Password does not meet the required rules"
      );
      return;
    }

    if (password !== confPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      Alert.alert("Error", "You must agree to the Terms and Conditions");
      return;
    }

    try {
      const res = await api.post("/register", {
        username,
        email,
        password,
      });

      Alert.alert(
        "Success",
        res.data.message || "Registered successfully"
      );
      router.push("/loginscreen");
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert(
        "Error",
        err.response?.data?.error || "Registration failed"
      );
    }
  };

  

  const Rule = ({ ok, text }) => (
    <Text style={[styles.rule, { color: ok ? "green" : "red" }]}>
      {ok ? "✓" : "✗"} {text}
    </Text>
  );

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
          onChangeText={(text) => {
            setEmail(text);
            if (text && !validateEmail(text)) {
              setEmailError("Please enter a valid email address");
            } else {
              setEmailError("");
            }
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Icon name="envelope" size={20} color="#8a6f60" />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

    
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
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

     
      <View style={styles.termsContainer}>
        <Text style={styles.termsTitle}>Terms and Conditions</Text>
        <Text style={styles.termsText}>
           • You must be at least 18 years old to register.{"\n"}
          • You are responsible for keeping your account information secure.{"\n"}
          • All user data will be stored securely and not shared with third parties.{"\n"}
          • By registering, you agree to follow all platform rules and guidelines.{"\n"}
          • The platform reserves the right to suspend or terminate accounts for violations.{"\n"}
          • You may not attempt to hack, reverse-engineer, or disrupt the platform.{"\n"}
          • The platform is not responsible for any losses caused by user actions.{"\n"}
          • Any disputes will be governed by the laws of the country of operation.{"\n"}
          • The platform may update these terms at any time; continued use constitutes acceptance.

        </Text>

        <View style={styles.agreeWrapper}>
          <Switch value={agreeTerms} onValueChange={setAgreeTerms} />
          <Text style={styles.agreeText}>
            I agree to the Terms and Conditions
          </Text>
        </View>
      </View>

      <PrimaryButton
        title="Register"
        onPress={handleRegister}
        disabled={!isStrongPassword}
      />

      <TouchableOpacity onPress={() => router.push("/loginscreen")}>
        <Text style={styles.link}>
          Already have an account? Log In
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#181311",
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
    color: "#181311",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
  },
  rulesBox: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  rule: {
    fontSize: 14,
    marginBottom: 4,
  },
  termsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
  },
  termsTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  termsText: {
    color: "#333",
    lineHeight: 20,
  },
  agreeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  agreeText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  link: {
    color: "#ff8000ff",
    textAlign: "center",
    margin: 20,
    marginBottom: 30,
    textDecorationLine: "underline",
  },
});
