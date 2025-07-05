import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ComunidadeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comunidade 🫂</Text>
      <Text style={styles.text}>
        Participe da nossa comunidade de apoio emocional.
      </Text>
      <Text style={styles.text}>
        Aqui você pode conversar, acolher e ser acolhido.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111827",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#10b981",
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    color: "#E5E7EB",
    fontSize: 16,
    textAlign: "center",
  },
});
