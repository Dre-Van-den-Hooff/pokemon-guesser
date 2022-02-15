import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function ScoreScreen({ route, navigation }: ScoreScreenProps) {
  const { score, currentDifficultyAmount } = route.params;

  const handlePress = () => {
    navigation.navigate("Startup");
  };

  return (
    <View style={styles.main_container}>
      <Text style={styles.title}>
        Your score: {score}/{currentDifficultyAmount}
      </Text>
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
  image: {
    height: 300,
    width: 300,
    resizeMode: "stretch",
  },
});
