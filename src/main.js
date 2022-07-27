import { populateDOMwithPlayArea, playerTurn, playerPopulateShips } from './DOMcode.js'
import { shipFactory, gameBoard, Player } from './objects.js'

function mainGameLoop() {

    let player1 = createPlayers("Player 1")
    let player2 = createPlayers("Player 2")

    player2 = playerPopulateShips(player1, player2)



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

function initializeGame (player1, player2) {

    populateDOMwithPlayArea(document, player1, player2)

    player2.playerGameBoard.placeShips("carrier",[0,0,0,0,0], true)
    player2.playerGameBoard.placeShips("battleship",[0,0,0,0], true)
    player2.playerGameBoard.placeShips("cruiser",[0,0,0], true)
    player2.playerGameBoard.placeShips("destroyer",[0,0], true)
    player2.playerGameBoard.placeShips("submarine",[0,0], true)
    console.log("player2",player2)

    return player2



}

mainGameLoop()

export { initializeGame }