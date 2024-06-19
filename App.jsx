import {
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {choices} from './src/data/mockData';
import {COLORS} from './src/util/constant';

const App = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const handleUserChoice = userChoice => {
    setUserChoice(userChoice);
    randomComputerChoice(userChoice);
  };

  const randomComputerChoice = userChoice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];
    setComputerChoice(computerChoice);
    determineWinner(userChoice, computerChoice);
  };

  const determineWinner = (user, computer) => {
    if (user.name === computer.name) {
      setResult('You are equal!');
    } else if (
      (user?.name === 'Rock' && computer?.name === 'Scissors') ||
      (user?.name === 'Paper' && computer?.name === 'Rock') ||
      (user?.name === 'Scissors' && computer?.name === 'Paper')
    ) {
      setResult('You win!');
    } else {
      setResult('You lost!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Text style={styles.title}>Rock-Paper-Scissors</Text>
        <Text style={styles.choiceText}>User's choice</Text>
        <View style={styles.choices}>
          {choices?.map((choice, index) => (
            <TouchableOpacity
              key={index}
              style={
                choice?.name === userChoice?.name
                  ? [styles.button, styles.activeButton]
                  : styles.button
              }
              onPress={() => handleUserChoice(choice)}>
              <Image source={choice.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>

        {computerChoice && (
          <>
            <Text style={styles.choiceText}>Computer's choice</Text>
            <View style={styles.button}>
              <Image source={computerChoice.image} style={styles.image} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  choiceText: {
    marginVertical: 20,
    fontSize: 20,
    color: COLORS.white,
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  image: {
    width: 90,
    height: 90,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.white,
  },
  activeButton: {
    borderWidth: 4,
    borderColor: 'red',
  },
});
