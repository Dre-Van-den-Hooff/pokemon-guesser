import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

interface StartupScreenProps {
  navigation: any;
}

export default function StartupScreen({ navigation }: StartupScreenProps) {
  const handlePress = () => {
    navigation.navigate("Game");
  };

  return (
    <View style={styles.main_container}>
      <Image source={require("../images/Pokemon-Logo.png")} style={styles.image} />
      <Text style={styles.title}>Pokemon guessing game!</Text>
      <View style={styles.button}>
        <Button title="Start Game" onPress={handlePress} />
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
    fontSize: 30,
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
    margin: 10,
    marginTop: 100,
    borderWidth: 2,
    borderColor: "blue",
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "lightgreen",
    width: 200,
    height: 50,
  },
});
