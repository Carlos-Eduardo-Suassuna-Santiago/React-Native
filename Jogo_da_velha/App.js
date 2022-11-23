import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function App() {
  const [screen, setScreen] = useState('Menu');
  const [curent_player, setCurentPlayer] = useState('');
  const [board, setBoard] = useState([]);
  const [remaining_moves, setRemainingMoves] = useState(0);
  const [winner, setWinner] = useState('');

  function GameStart(Player) {

    setCurentPlayer(Player);
    setRemainingMoves(9);
    setBoard([
      ['','',''],
      ['','',''],
      ['','','']
    ])

    setScreen('Game');

  }

  function Play(row, colun) {

    board[row][colun] = curent_player;
    setBoard([...board]);

    setCurentPlayer(curent_player === 'X' ? 'O' : 'X');

    CheckWinner(board,row, colun)

  }

  function CheckWinner(board, row, colun) {
    //linha
    if (board[row] [0] !== '' &&  board[row] [0] === board[row] [1] && board[row] [1] === board[row] [2]) {

      return FinishGame(board[row] [0]);

    } 

    //coluna
    if (board[0] [colun] !== '' && board[0] [colun] === board[1] [colun] && board[1] [colun] === board[2] [colun]) {

      return FinishGame(board[0] [colun]);

    } 

    //diagonal 1
    if (board[0] [0] !== '' && board[0] [0] === board[1] [1] && board[1] [1] === board[2] [2]) {

      return FinishGame(board[0] [0]);

    } 

    //diagonal 2
    if (board[0] [2] !== '' && board[0] [2] === board[1] [1] && board[1] [1] === board[2] [0]) {

      return FinishGame(board[0] [2]);

    } 

    //empate
    if(remaining_moves - 1 === 0) {
      return FinishGame('');
    }

    //jogo nao finalizado
    setRemainingMoves((remaining_moves - 1));

  }

  function FinishGame(Player){

    setWinner(Player);
    setScreen('Winner');

  }

  switch(screen){
    case 'Menu':
      return getScreenMenu();
    case 'Game':
      return getScreenGame();
    case 'Winner':
      return getScreenWinner();
  }

  function getScreenMenu(){
    return (
      <View style={styles.container}>
        
        <Text style={styles.title}>Jogo da Velha</Text>
        <Text style={styles.sub_title}>Select the first Player</Text>
        <StatusBar style="auto" />

        <View style={styles.InlineItens}>

          <TouchableOpacity style={styles.PlayerBox} onPress={ () => GameStart('X')} >
            <Text style={styles.playerCross}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.PlayerBox} onPress={ () => GameStart('O')} >
            <Text style={styles.playerCircle}>O</Text>
          </TouchableOpacity>
            
        </View>

      </View>
    );

  }

  function getScreenGame(){
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Jogo da Velha</Text>
        <StatusBar style="auto" />

        {
          board.map((row, number_row) => {
            return (
              <View key={number_row} style={styles.InlineItens}>

                {
                  row.map((colun, number_colun) => {

                    return (

                      <TouchableOpacity key={number_colun} style={styles.PlayerBox} onPress = { () => Play(number_row, number_colun)} disabled={colun !== ''}>
                        <Text style={colun === 'X' ? styles.playerCross : styles.playerCircle}>{colun}</Text>
                      </TouchableOpacity>

                    )

                  })
                }

              </View>
            )
          })
        }

        <TouchableOpacity style={styles.back_menu} onPress = { () => setScreen('Menu')}> 

          <Text style={styles.text_button_back}>Back</Text>

        </TouchableOpacity>

      </View>
    );

  }

  function getScreenWinner(){
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Jogo da Velha</Text>
        <Text style={styles.sub_title}>Final Result</Text>
        <StatusBar style="auto" />

        {
          winner === '' && 
          <Text style={styles.winner}>Draw</Text> 
        }

        {
          winner !== '' && 
          <>
            <Text style={styles.winner}>Winner</Text> 
            <View style={styles.PlayerBox} >
              <Text style={winner === 'X' ? styles.playerCross : styles.playerCircle}>{winner}</Text>
            </View>
          </> 
        }

        <TouchableOpacity style={styles.back_menu} onPress = { () => setScreen('Menu')}> 

          <Text style={styles.text_button_back}>Back</Text>

        </TouchableOpacity>

      
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    borderWidth: 11,
    borderColor: 'blue',
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
    paddingBottom: 100,
  },

  sub_title: {
    fontSize: 20,
    color: "green",
    paddingBottom: 100,
    
  },

  PlayerBox: {
    width: 80,
    height: 80,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,

  },

  playerCross: {
    fontSize: 50,
    color: "blue",
  },

  playerCircle: {
    fontSize: 50,
    color: "red",
  },

  InlineItens: {
    flexDirection: "row",
  },

  back_menu: {
    marginTop: 20,
  },

  text_button_back: {
    textAlign: "center",
    color: "black",
    marginTop: 50,
    fontSize: 20,
    width: 50,
    height: 30,
    backgroundColor: "green",
    margin: 10,
  },
  

  winner: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey',
    marginTop: 20,
    marginBottom: 20,
  }
});