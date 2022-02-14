import React from "react";
import { StyleSheet, Text, View, Button, Alert, Switch, TextInput, Image } from "react-native";

interface ScoreScreenProps {
  route: any;
  navigation: any;
  score: number;
}

export default function ScoreScreen({ route, navigation }: ScoreScreenProps) {
  const { score } = route.params;

  const handlePress = () => {
    navigation.navigate("Startup");
  };

  return (
    <View style={styles.main_container}>
      <Text style={styles.title}>Your score: {score}/10</Text>
      <View style={styles.button}>
        <Button title="Play again" onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
  },
  button: {
    padding: 1,
    width: 200,
    backgroundColor: "yellow",
    borderRadius: 12,
    margin: 10,
    borderWidth: 2,
    borderColor: "blue",
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "blue",
    width: 200,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: "stretch",
  },
});
