import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from "react-native";

interface GameScreenProps {
  navigation: any;
}

export default function Game({ navigation }: GameScreenProps) {
  interface Pokemon {
    sprites: {
      front_default: string;
    };
    forms: Array<Forms>;
  }

  interface Forms {
    name: string;
    url: string;
  }

  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [ready, setReady] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [lastGuess, setLastGuess] = useState<boolean>(false);

  const fetchData = async (url: RequestInfo) => {
    setReady(false);
    await fetch(url)
      .then(response => response.json())
      .then(data => setPokemonData(data))
      .catch(error => console.error(error))
      .finally(() => setReady(true));
  };

  //random pokemon between [1, 721] (up till gen 6)
  const fetchNext = async () => {
    if (counter < 10) {
      const id = Math.floor(Math.random() * 721) + 1;
      await fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setCounter(counter + 1);
      setInputValue("");
    } else {
      setLastGuess(true);
      navigation.navigate("Score", { score: score });
    }
  };

  const handleVerify = () => {
    if (inputValue.toLowerCase() === pokemonData?.forms[0].name) {
      setScore(score + 1);
      fetchNext();
    } else Alert.alert("Incorrect name!");
    setInputValue("");
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <View style={styles.main_container}>
      <Text style={styles.title}>Who's this pokemon?</Text>
      {ready ? (
        <Image style={styles.image} source={{ uri: pokemonData?.sprites.front_default }} />
      ) : (
        <Image style={styles.image} source={require("../images/spinning-loading.gif")} />
      )}
      <TextInput
        style={styles.input}
        value={inputValue}
        placeholder="Enter name"
        onChangeText={e => setInputValue(e)}
      />
      <View style={styles.button}>
        <Button title="Verify" onPress={handleVerify} />
      </View>
      <View style={styles.button}>
        <Button title={lastGuess ? "Check my Score" : "Next"} onPress={fetchNext} />
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
