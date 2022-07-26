import { populateDOMwithPlayArea } from './DOMcode.js'
import { shipFactory, gameBoard, Player } from './objects.js'

function mainGameLoop() {



}

function createPlayers(newPlayerName) {
    let newPlayer = { ...Player}
    newPlayer.name = newPlayerName
    newPlayer.playerGameBoard = Object.assign({}, gameBoard),
    newPlayer.playerGameBoard.mapOfPlayer = newPlayerName
    newPlayer.playerGameBoard.gameMap = Array.from({length: 100}, () => -1)
    newPlayer.playerGameBoard.allShips = [],
    Object.setPrototypeOf(newPlayer.playerGameBoard, newPlayer)

    return newPlayer
}

function initializeGame () {

    let player1 = createPlayers("Player 1")
    let player2 = createPlayers("Player 2")
    populateDOMwithPlayArea(document, player1, player2)
    player1.playerGameBoard.placeShips([20,21,22,23], player1)
    console.log("player1",player1)
    console.log("player2",player2)



}

initializeGame()