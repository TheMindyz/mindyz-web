import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a) à Mindyz 💚</Text>

      <Button title="Trilhas" onPress={() => navigation.navigate("Trilhas")} />
      <Button
        title="Psicólogos"
        onPress={() => navigation.navigate("Psicologos")}
      />
      <Button title="Premium" onPress={() => navigation.navigate("Premium")} />
      <Button
        title="Comunidade"
        onPress={() => navigation.navigate("Comunidade")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111827",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#10b981",
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
});
