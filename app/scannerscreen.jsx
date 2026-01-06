import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import BottomNav from "../component/bottomnav";
import api from "./api";


if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SEVERITY_COLORS = {
  Critical: "#f93b1d",
  High: "#fa7921",
  Medium: "#ffa500",
  Low: "#4facfe",
  Info: "#00f2fe",
};

export default function ScannerScreen() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleScan = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setErrorMsg("Please enter a URL");
      return;
    }

    setLoading(true);
    setReport(null);
    setErrorMsg("");
    setSuccessMsg("");
    setExpandedIndex(null);

    try {
      const { data } = await api.post("/scan", { url: trimmedUrl });
      if (data?.success && data.report) {
        setReport(data.report);
        setSuccessMsg(`Scan completed! Found ${data.report.total_issues} issue(s).`);
      } else {
        setErrorMsg("No report returned from server");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || err.message || "Failed to scan URL");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const SeverityBadge = ({ severity }) => (
    <View style={[styles.severityBadge, { backgroundColor: SEVERITY_COLORS[severity] || "#ccc" }]}>
      <Text style={styles.severityText}>{severity}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>🔒 Web Vulnerability Scanner</Text>
        <Text style={styles.subtitle}>Scan websites for common security vulnerabilities</Text>

        <View style={styles.inputCard}>
          <TextInput
            placeholder="https://example.com"
            placeholderTextColor="#666"
            value={url}
            onChangeText={setUrl}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={handleScan}
          />
          <TouchableOpacity style={styles.scanButton} onPress={handleScan} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.scanButtonText}>Start Scan</Text>}
          </TouchableOpacity>
        </View>

        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
        {successMsg ? <Text style={styles.success}>{successMsg}</Text> : null}

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#f25c0c" />
            <Text style={styles.loadingText}>Scanning target for vulnerabilities...</Text>
          </View>
        )}

        {report && (
          <View style={styles.results}>
            <View style={styles.targetInfo}>
              <Text style={{ fontWeight: "bold" }}>Target: </Text>
              <Text>{report.target}</Text>
              <Text style={{ fontWeight: "bold" }}>Domain: </Text>
              <Text>{report.domain}</Text>
            </View>

            <Text style={styles.sectionTitle}>Scan Summary</Text>
            <View style={styles.summary}>
              {["Critical", "High", "Medium", "Low", "Info"].map((level) => (
                <View
                  key={level}
                  style={[styles.summaryCard, { backgroundColor: SEVERITY_COLORS[level] }]}
                >
                  <Text style={styles.summaryNumber}>{report.severity_breakdown?.[level] ?? 0}</Text>
                  <Text style={styles.summaryLabel}>{level}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Detected Vulnerabilities</Text>
            <View style={styles.vulnerabilities}>
              {report.vulnerabilities.map((v, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.vulnerabilityItem, { borderLeftColor: SEVERITY_COLORS[v.severity] }]}
                    onPress={() => toggleExpand(index)}
                    activeOpacity={0.9}
                  >
                    <View style={styles.vulnHeader}>
                      <Text style={styles.vulnTitle}>{v.title || v.description || "Finding"}</Text>
                      <Text style={styles.expandIcon}>{isExpanded ? "▲" : "▼"}</Text>
                    </View>

                    <SeverityBadge severity={v.severity} />

                    {isExpanded && (
                      <View style={styles.vulnDetails}>
                        {v.evidence && (
                          <View style={styles.detailSection}>
                            <Text style={styles.detailHeader}>📋 Evidence</Text>
                            <Text style={styles.evidenceBox}>{v.evidence}</Text>
                          </View>
                        )}
                        {v.vulnerability_description && (
                          <View style={styles.detailSection}>
                            <Text style={styles.detailHeader}>🔍 Vulnerability Description</Text>
                            <Text>{v.vulnerability_description}</Text>
                          </View>
                        )}
                        {v.risk_description && (
                          <View style={styles.detailSection}>
                            <Text style={styles.detailHeader}>⚠️ Risk Description</Text>
                            <Text>{v.risk_description}</Text>
                          </View>
                        )}
                        {v.recommendation && (
                          <View style={styles.detailSection}>
                            <Text style={styles.detailHeader}>✅ Recommendation</Text>
                            <Text>{v.recommendation}</Text>
                          </View>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        
      </ScrollView>
       <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" }, // Page background white
  container: { padding: 20, paddingBottom: 120 },
  header: { fontSize: 28, fontWeight: "bold", color: "#000", textAlign: "center", marginBottom: 5, padding: 30 }, // Text black
  subtitle: { color: "#000", textAlign: "center", opacity: 0.8, marginBottom: 20 }, // Text black
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    color: "#000",
  },
  scanButton: {
    backgroundColor: "#f25c0c", // Orange background
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  scanButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 }, // White text
  error: { backgroundColor: "#f8d7da", color: "#721c24", padding: 10, borderRadius: 8, marginBottom: 15 },
  success: { backgroundColor: "#d4edda", color: "#155724", padding: 10, borderRadius: 8, marginBottom: 15 },
  loading: { alignItems: "center", marginVertical: 20 },
  loadingText: { marginTop: 10, color: "#000" },
  results: { marginTop: 20 },
  targetInfo: { backgroundColor: "#e7f3ff", borderLeftWidth: 4, borderLeftColor: "#2196F3", padding: 15, borderRadius: 8, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10, color: "#000" },
  summary: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  summaryCard: { flex: 1, marginHorizontal: 5, borderRadius: 10, padding: 15, alignItems: "center" },
  summaryNumber: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  summaryLabel: { fontSize: 14, color: "#fff", opacity: 0.9 },
  vulnerabilities: { marginBottom: 50 },
  vulnerabilityItem: { borderLeftWidth: 5, backgroundColor: "#f8f9fa", borderRadius: 8, padding: 12, marginBottom: 12 },
  vulnHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  vulnTitle: { fontWeight: "bold", fontSize: 16 },
  expandIcon: { fontSize: 14, color: "#666" },
  vulnDetails: { marginTop: 10 },
  severityBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5, marginBottom: 8 },
  severityText: { color: "#fff", fontWeight: "bold" },
  detailSection: { marginBottom: 10 },
  detailHeader: { fontWeight: "600", color: "#f25c0c", marginBottom: 5 }, 
  evidenceBox: { backgroundColor: "#f0f0f0", padding: 8, borderRadius: 5, fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
});
