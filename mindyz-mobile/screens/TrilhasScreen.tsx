import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function TrilhasScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trilhas de Autocuidado 🌿</Text>

      <Text style={styles.item}>• Ansiedade e Respiração</Text>
      <Text style={styles.item}>• Autoestima e Confiança</Text>
      <Text style={styles.item}>• Propósito de Vida</Text>
      <Text style={styles.item}>• Meditação Guiada</Text>

      <Text style={styles.footer}>
        Mais trilhas serão desbloqueadas com o tempo!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#111827",
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 16,
  },
  item: {
    fontSize: 18,
    color: "#F3F4F6",
    marginBottom: 12,
  },
  footer: {
    marginTop: 30,
    fontStyle: "italic",
    color: "#9CA3AF",
  },
});
