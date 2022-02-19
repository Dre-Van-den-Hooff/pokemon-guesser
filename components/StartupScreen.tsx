import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartupScreen({ navigation }: StartupScreenProps) {
  const difficulties: Difficulty[] = [
    {
      id: "1",
      name: "easy",
      amount: 10,
    },
    {
      id: "2",
      name: "medium",
      amount: 25,
    },
    {
      id: "3",
      name: "hard",
      amount: 50,
    },
    {
      id: "4",
      name: "expert",
      amount: 100,
    },
  ];

  const [currentDifficultyName, setCurrentDifficultyName] = useState<string>("easy");
  const [currentDifficultyAmount, setCurrentDifficultyAmount] = useState<number>(10);

  const handleStart = () => {
    navigation.navigate("Game", { currentDifficultyName, currentDifficultyAmount });
  };

  const handleDifficulty = (name: string, amount: number) => {
    setCurrentDifficultyName(name);
    setCurrentDifficultyAmount(amount);
  };

  const renderAmount = ({ item }: any) => {
    return (
      <View style={styles.difficulties}>
        <Button
          title={`${item.name} - ${item.amount} pokemon`}
          onPress={() => handleDifficulty(item.name, item.amount)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <Image source={require("../images/Pokemon-Logo.png")} style={styles.image} />
      <Text style={styles.title}>Pokemon guessing game!</Text>
      <View style={styles.flatlist}>
        <FlatList data={difficulties} renderItem={renderAmount} keyExtractor={item => item.id} />
      </View>
      <Text style={styles.difficultyText}>Current difficulty: {currentDifficultyName}</Text>
      <View style={styles.button}>
        <Button title="Start Game" onPress={handleStart} />
      </View>
    </SafeAreaView>
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
    fontSize: 30,
    marginBottom: 50,
  },
  image: {
    height: 140,
    width: 360,
    resizeMode: "stretch",
  },
  button: {
    padding: 1,
    backgroundColor: "yellow",
    borderRadius: 12,
    margin: 0,
    marginTop: 30,
    borderWidth: 2,
    borderColor: "blue",
  },
  difficulties: {
    padding: 1,
    backgroundColor: "yellow",
    borderRadius: 12,
    margin: 20,
    marginTop: 1,
    borderWidth: 2,
    borderColor: "blue",
  },
  flatlist: {
    flexDirection: "row",
  },
  difficultyText: {
    fontSize: 20,
  },
});
