import React from "react";
import { View, Text, StyleSheet, Linking, Button } from "react-native";

export default function PsicologosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sessões com Psicólogos</Text>
      <Text style={styles.text}>
        A Mindyz oferece apoio com psicólogos parceiros 💬
      </Text>

      <Button
        title="Agendar sessão via WhatsApp"
        color="#10b981"
        onPress={() => Linking.openURL("https://wa.me/SEU_NUMERO")}
      />

      <Text style={styles.info}>
        Caso esteja em crise, procure ajuda profissional ou ligue para o CVV
        (188).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111827",
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#10b981",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    color: "#E5E7EB",
    fontSize: 16,
    marginBottom: 20,
  },
  info: {
    marginTop: 20,
    fontSize: 14,
    color: "#9CA3AF",
  },
});
