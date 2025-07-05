import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function PremiumScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Área Premium 💎</Text>
      <Text style={styles.text}>
        Aqui você terá acesso a conteúdos exclusivos para fortalecer sua jornada
        emocional.
      </Text>
      <Text style={styles.item}>• Trilha exclusiva de autocuidado</Text>
      <Text style={styles.item}>• Acesso antecipado a eventos</Text>
      <Text style={styles.item}>• Lives com especialistas</Text>
      <Text style={styles.item}>• Comunidade premium</Text>
      <Text style={styles.footer}>Mais novidades em breve 💚</Text>
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
    marginBottom: 12,
  },
  text: {
    color: "#E5E7EB",
    fontSize: 16,
    marginBottom: 16,
  },
  item: {
    fontSize: 16,
    color: "#F3F4F6",
    marginBottom: 8,
  },
  footer: {
    marginTop: 30,
    fontStyle: "italic",
    color: "#9CA3AF",
  },
});
