import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

export default function Game({ navigation, route }: GameScreenProps) {
  const { currentDifficultyName, currentDifficultyAmount } = route.params;

  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [ready, setReady] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [lastGuess, setLastGuess] = useState<boolean>(false);
  const [seen, setSeen] = useState<number[]>([]);

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
    if (counter < currentDifficultyAmount) {
      const id = Math.floor(Math.random() * 721) + 1;
      if (!seen.includes(id)) {
        await fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setCounter(counter + 1);
        setInputValue("");
        seen.push(id);
        console.log(seen);
      } else fetchNext();
    } else navigation.navigate("Score", { score, currentDifficultyAmount });

    if (counter === currentDifficultyAmount - 1) {
      setLastGuess(true);
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
    <KeyboardAvoidingView style={styles.scrollview} behavior="padding">
      <ScrollView>
        <View style={styles.main_container}>
          <View style={styles.difficultyView}>
            <Text style={styles.difficultyText}>Difficulty: {currentDifficultyName}</Text>
            <Text style={styles.difficultyText}>Pokemon left: {currentDifficultyAmount - counter}</Text>
          </View>
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
            <Button title={lastGuess ? "Check my score" : " I don't know"} onPress={fetchNext} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  difficultyText: {
    fontSize: 20,
    margin: 10,
  },
  difficultyView: {
    flexDirection: "row",
  },
  scrollview: {
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 10,
    flex: 1,
  },
});
