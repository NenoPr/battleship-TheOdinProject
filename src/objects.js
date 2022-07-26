

const Ship = {
    shipType: "",
    shipLength: [],
    hit: function(strike) {
        this.shipLength[this.shipLength.indexOf(strike)] = -2;
        return this.shipLength
    },
    isSunk: function() {
        if ( this.shipLength.every(element => {
            if (element === -2) return true
            return false
            })
        ) return true
        else return false
    },
}

function shipFactory(shipType, shipsLength) {

    let newShip = Object.create(Ship)
    newShip.shipType = shipType
    newShip.shipLength = shipsLength
    return newShip
}

const gameBoard = {

    gameMap: Array.from({length: 100}, () => -1),
    allShips: [],

    placeShips: function(cordsToPlace, player) {
        
        let newShip = shipFactory("destroyer",cordsToPlace)
        for (let i=0;i<cordsToPlace.length;i++) {
            this.gameMap[cordsToPlace[i]] = cordsToPlace[i]
        }
        this.allShips.push(newShip)
        return newShip;
    },

    receiveAttack: function(attackCords) {
        let hitShip;
        if(this.gameMap[attackCords] === attackCords) {
            this.allShips.every(ship => {
                for (let i = 0; i < ship.shipLength.length;i++) {
                    if (ship.shipLength[i] === attackCords) {
                        ship.hit(attackCords)
                        hitShip = ship.shipType
                        return false
                    }
                }
                return true
            })
            return `A ${hitShip} has been hit at coordinate ${attackCords}!`
        } else this.gameMap[attackCords] = 0; return `A miss at coordinate ${attackCords} map value is now ${this.gameMap[attackCords]}!`;
    },

    allShipsSunk: function() {

        if ( this.allShips.every(ship => {
                if (ship.isSunk() === true) {
                    return true
                } else return false
                }) 
        ) return "All ships have been sunk!"
        else return "There are still ships in the battle!"

        
    },

    placeCarrier: function() {
        let cord = Math.floor(Math.random()*100);
        let orientation = Math.floor(Math.random()*3)

        console.log("orientation",orientation)
        console.log("Cord",cord)
        cord = 40
        orientation = 2
        let doesItFit = true;
        if (orientation === 0) {
            for (let i = 0; i<4;i++) {
                if (this.gameMap[cord + i] !== -1) doesItFit = false; break;
            }
            if (doesItFit) {
                this.gameMap[cord] = cord
                this.gameMap[cord+1] = cord+1
                this.gameMap[cord+2] = cord+2
                this.gameMap[cord+3] = cord+3
                this.gameMap[cord+4] = cord+4
                console.log("Fits!")
                console.log(this.gameMap)
            } else {
                console.log("Does not fit!")
            }
        } else if (orientation === 1) {
            for (let i = 4; i !== 0;i--) {
                if (this.gameMap[cord - i] !== -1) doesItFit = false; break;
            }
            if (doesItFit) {
                this.gameMap[cord] = cord
                this.gameMap[cord-1] = cord-1
                this.gameMap[cord-2] = cord-2
                this.gameMap[cord-3] = cord-3
                this.gameMap[cord-4] = cord-4
                console.log("Fits!")
                console.log(this.gameMap)
            } else {
                console.log("Does not fit!")
            }
        } else if (orientation === 2) {
            for (let i = 0; i !== 40;i++) {
                if (this.gameMap[cord + (i*10)] !== -1) doesItFit = false; break;
            }
            if (doesItFit) {
                this.gameMap[cord] = cord
                this.gameMap[cord+10] = cord+10
                this.gameMap[cord+20] = cord+20
                this.gameMap[cord+30] = cord+30
                this.gameMap[cord+40] = cord+40
                console.log("Fits!")
                console.log(this.gameMap)
            } else {
                console.log("Does not fit!")
            }
        } else if (orientation === 3)  {
            for (let i = 4; i !== 0;i--) {
                if (this.gameMap[cord - (i*10)] !== -1) doesItFit = false; break;
            }
            if (doesItFit) {
                this.gameMap[cord] = cord
                this.gameMap[cord-10] = cord-10
                this.gameMap[cord-20] = cord-20
                this.gameMap[cord-30] = cord-30
                this.gameMap[cord-40] = cord-40
                console.log("Fits!")
                console.log(this.gameMap)
            } else {
                console.log("Does not fit!")
            }
        }
    }

}

const Player = {

    name: "",
    playerGameBoard: Object.create(gameBoard),
    playersShips: [],

    aiPlayMove: function() {
        let moveToPlay;
        let fullMap = true;
        for (let i = 0; i < this.playerGameBoard.gameMap.length; i++) {
            if (this.playerGameBoard.gameMap[i] === -1) {
                fullMap = false;
                break;
            }
        }
        if (!fullMap) {
            do {
                moveToPlay = Math.floor(Math.random()*100)
                if (this.playerGameBoard.gameMap[moveToPlay] === -1) {
                    this.playerGameBoard.gameMap[moveToPlay] = 0;
                    return ("Moves still left played move " + moveToPlay)
                    break;
                }
            } while (true)
        }
        return ("No valid moves left! Played " + moveToPlay)
    },

    playerPlayMove: function(moveToPlay) {
        let fullMap = true;
        for (let i = 0; i < this.playerGameBoard.gameMap.length; i++) {
            if (this.playerGameBoard.gameMap[i] === -1) {
                fullMap = false;
                break;
            }
        }
        if (!fullMap) {
            if (this.playerGameBoard.gameMap[moveToPlay] === -1) {
                this.playerGameBoard.gameMap[moveToPlay] = 0;
                return ("Moves still left played move " + moveToPlay)
            }
        }
        return ("No valid moves left! Played " + moveToPlay)
    }
}

try {
    module.exports = { shipFactory, gameBoard, Player }
} catch (error) {}

export {shipFactory, gameBoard, Player }





// console.log(gameBoard.gameMap)
// for (let i = 0; i < gameBoard.gameMap.length; i++) {
//     gameBoard.gameMap[i] = 0
// }
// gameBoard.gameMap[10] = -1
// console.log(gameBoard.gameMap)
// gameBoard.placeShips([20,21,22,23,24])
// let xCord = Math.floor(Math.random()*10);
// let yCord = Math.floor(Math.random()*10);
// this.gameMap[xCord][yCord] = 1;
// function createMap(gameBoard) {
//     gameBoard.gameMap = Array.from({length: 100}, () => -1);
//     // for (let i = 0; i<10; i++) {
//     //     gameMap.push(Array.from({length: 10}, () => 0))
//     // }
//     // console.log(gameMap[0])
//     console.log(gameBoard.gameMap)
//     // gameBoard.gameMap = gameMap
//     return gameBoard
// }
// createMap(gameBoard)