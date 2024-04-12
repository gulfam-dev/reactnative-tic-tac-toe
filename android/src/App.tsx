/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState,useEffect } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';
import { Icon } from 'react-native-vector-icons/Icon';

function App(): React.JSX.Element {

  const [isCross, setIsCross] = useState<boolean>(true)
  const [gameWinner, setGameWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

  useEffect(() => {
    // Generate a random initial player's turn
    setIsCross(Math.random() < 0.5);
  }, []);



  const reloadGame = () => {
    setIsCross(Math.random() < 0.5)
    setGameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  }

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#fff',
        textColor: '#000',
      }
      )
    }
    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle'
      setIsCross(!isCross)
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFFFFF'
      })
    }
    checkIsWinner()
  }



  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={[styles.playerInfo,
        isCross ? styles.playerX : styles.playerO
        ]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : '0'}'s Turn
          </Text>
        </View>
      )}
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({ item, index }) => (
          <Pressable style={styles.card}
            key={index}
            onPress={()=> onChangeItem(index)}
          >
          <Icons
          name={item}/>
          </Pressable>
        )}
      />

      <Pressable
      style={styles.gameBtn}
      onPress={reloadGame }>
        <Text style={styles.gameBtnText}>
          {gameWinner?'Start New Game':"Reload The Game"}
        </Text>
      </Pressable>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,
    elevation:10,
    marginTop:30,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#DAE0E2',
  },
  playerO: {
    backgroundColor: '#DAE0E2',
  },
  grid: {
    margin: 12,
    backgroundColor:'#2F363F'
    
  },
  Container: {
    margin: 0,
    flex:1,
    backgroundColor:'#2F363F'
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: '#2F363F',
  },
  winnerInfo: {
    borderRadius: 10,
    backgroundColor: '#DAE0E2',
    elevation:10,
    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    elevation:20,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    marginBottom:370,
    backgroundColor: '#DAE0E2',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
});

export default App;
