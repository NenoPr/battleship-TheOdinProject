

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
            else return false
            })
        ) return true
        else return false
    },
}

function shipFactory(shipType, shipsLength) {

    let newShip = Object.create(Ship)
    newShip.shipType = shipType
    newShip.shipLength = shipsLength
    Object.setPrototypeOf(newShip, Ship)
    return newShip
}

const gameBoard = {

    placeShips: function(shipType, cordsToPlace, ai, wheelPosition) {
        
        if (ai) {
            function randomLoc() { 
                let holder = Math.floor(Math.random() * (100 - 1) + 1)
                return Math.round(holder / 10) * 10
            }
            function randomOrient() { return Math.floor(Math.random()*2)}

            let orientation = randomOrient()
            let location = randomLoc()
            let location2;
            let shipSize = cordsToPlace.length
            let newCords = []
            let fits = true

            if (orientation === 0) {
                do {
                    location = randomLoc()
                    fits = true
                    location2 = Math.floor(Math.random(1,10) * 10) + location
                    if (location2 + shipSize <= location+10) {
                        if(location2 % 10 === 0) fits = false
                        for (let i = 0; i < shipSize; i++) {
                            if (this.playerGameBoard.gameMap[location2 - 1 + i] !== -1){
                                fits = false
                            }
                        }
                    } else fits = false
                } while (!fits)
                for (let i = 0; i < shipSize; i++) {
                    this.playerGameBoard.gameMap[location2 + i - 1] = location2 + i
                    newCords.push(this.playerGameBoard.gameMap[location2 + i - 1])
                }
                console.log(newCords)
            } else {
                do {
                    location = randomLoc()
                    fits = true
                    location2 = Math.floor(Math.random() * 10) + location
                    if ((location2 + shipSize) * 10  <= 100) {
                        for (let i = 0; i <= shipSize * 10; i += 10) {
                            if (this.playerGameBoard.gameMap[location2 - 1 + i] !== -1){
                                fits = false
                            }
                        }
                    } else fits = false
                } while (!fits)
                for (let i = 0; i < shipSize * 10; i += 10) {
                    this.playerGameBoard.gameMap[location2 + i - 1] = location2 + i
                    newCords.push(this.playerGameBoard.gameMap[location2 + i - 1])
                }
                console.log(newCords)
            }
            
            let newShip = shipFactory(shipType, newCords)
            this.allShips.push(newShip)
            return newShip;
        } else {

            let shipSize = cordsToPlace.length
            let newCords = []
            let fits = true
            if (wheelPosition === "horizontal") {
                do {
                    fits = true
                    let location = Math.floor(cordsToPlace[0]/10) * 10
                    console.log("location",location + 10)
                    console.log("cordsToPlace",cordsToPlace[0])
                    if ((cordsToPlace[0] - 1 + shipSize) <= location+10) {
                        for (let i = 0; i < shipSize; i++) {
                            if (this.playerGameBoard.gameMap[cordsToPlace[0] + i] !== - 1){
                                console.log("adasdsad")
                                return
                            }
                        }
                    } else return
                } while (!fits)
                for (let i = 0; i < shipSize; i++) {
                    this.playerGameBoard.gameMap[(cordsToPlace[0] - 1) + i] = cordsToPlace[0] + i
                    newCords.push(this.playerGameBoard.gameMap[(cordsToPlace[0] - 1) + i])
                }
                console.log(newCords)
            } else {
                do {
                    fits = true
                    if (cordsToPlace[0] + (shipSize * 10) - (10)  <= 100) {
                        console.log("cordsToPlace",cordsToPlace[0])
                        for (let i = 0; i < (shipSize * 10); i += 10) {
                            if (this.playerGameBoard.gameMap[cordsToPlace[0] + i] !== - 1){
                                console.log("ENTERED vertical false space")
                                return
                            }
                        }
                    } else return
                } while (!fits)
                for (let i = 0; i < shipSize * 10; i += 10) {
                    this.playerGameBoard.gameMap[(cordsToPlace[0] - 1) + i] = cordsToPlace[0] + i
                    newCords.push(this.playerGameBoard.gameMap[(cordsToPlace[0] - 1) + i])
                }
                console.log(newCords)
            }
            
            let newShip = shipFactory(shipType, newCords)
            this.allShips.push(newShip)
            return true;
        }


        let newShip = shipFactory("destroyer", cordsToPlace)
        for (let i=0;i<cordsToPlace.length;i++) {
            this.gameMap[cordsToPlace[i]] = cordsToPlace[i]
        }
        this.allShips.push(newShip)
        return newShip;
    },

    receiveAttack: function(attackCords, ai, player) {
        let hitShip;

        if (ai) {
            console.log("gamemap attackcords AI",player.playerGameBoard.gameMap[attackCords - 1])
            console.log("attackcords AI",attackCords)
            if(player.playerGameBoard.gameMap[attackCords - 1] === Number(attackCords)) {
                console.log("INSIDE")
                player.playerGameBoard.allShips.every(ship => {
                    console.log(ship)
                    for (let i = 0; i < ship.shipLength.length;i++) {
                        if (ship.shipLength[i] === Number(attackCords)) {
                            ship.shipLength = ship.hit(Number(attackCords))
                            hitShip = ship.shipType
                            console.log("RETURNS FALSE INSIDE")
                            return false
                        }
                    }
                    return true
                })
                console.log("RETURNS TRUE")
                return true //`A ${hitShip} has been hit at coordinate ${attackCords}!`
            } else return false //`A miss at coordinate ${attackCords} map value is now ${this.gameMap[attackCords]}!`;
        }
        
        console.log("gamemap attackcords",player.playerGameBoard.gameMap[attackCords - 1])
        console.log("attackcords",attackCords)
        if(player.playerGameBoard.gameMap[attackCords - 1] === Number(attackCords)) {
            console.log("INSIDE")
            player.playerGameBoard.allShips.every(ship => {
                console.log(ship)
                for (let i = 0; i < ship.shipLength.length;i++) {
                    if (ship.shipLength[i] === Number(attackCords)) {
                        ship.shipLength = ship.hit(Number(attackCords))
                        hitShip = ship.shipType
                        console.log("RETURNS FALSE INSIDE")
                        return false
                    }
                }
                return true
            })
            console.log("RETURNS TRUE")
            return true //`A ${hitShip} has been hit at coordinate ${attackCords}!`
        } else return false //`A miss at coordinate ${attackCords} map value is now ${this.gameMap[attackCords]}!`;
    },

    allShipsSunk: function() {

        if ( this.allShips.every(ship => {
                if (ship.isSunk() === true) {
                    return true
                } else return false
                }) 
        ) return true
        else return false // !!!!! CHANGE TO FALSE !!!!"There are still ships in the battle!" 

        
    },
}

const Player = {

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
            } else if(this.playerGameBoard.gameMap[moveToPlay] > 0) {
                this.playerGameBoard.gameMap[moveToPlay] = -2
            }
        }
        return ("No valid moves left! Played " + moveToPlay)
    }
}

// try {
//     module.exports = { shipFactory, gameBoard, Player }
// } catch (error) {}

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


// placeCarrier: function() {
    //     let cord = Math.floor(Math.random()*100);
    //     let orientation = Math.floor(Math.random()*3)

    //     console.log("orientation",orientation)
    //     console.log("Cord",cord)
    //     cord = 40
    //     orientation = 2
    //     let doesItFit = true;
    //     if (orientation === 0) {
    //         for (let i = 0; i<4;i++) {
    //             if (this.gameMap[cord + i] !== -1) doesItFit = false; break;
    //         }
    //         if (doesItFit) {
    //             this.gameMap[cord] = cord
    //             this.gameMap[cord+1] = cord+1
    //             this.gameMap[cord+2] = cord+2
    //             this.gameMap[cord+3] = cord+3
    //             this.gameMap[cord+4] = cord+4
    //             console.log("Fits!")
    //             console.log(this.gameMap)
    //         } else {
    //             console.log("Does not fit!")
    //         }
    //     } else if (orientation === 1) {
    //         for (let i = 4; i !== 0;i--) {
    //             if (this.gameMap[cord - i] !== -1) doesItFit = false; break;
    //         }
    //         if (doesItFit) {
    //             this.gameMap[cord] = cord
    //             this.gameMap[cord-1] = cord-1
    //             this.gameMap[cord-2] = cord-2
    //             this.gameMap[cord-3] = cord-3
    //             this.gameMap[cord-4] = cord-4
    //             console.log("Fits!")
    //             console.log(this.gameMap)
    //         } else {
    //             console.log("Does not fit!")
    //         }
    //     } else if (orientation === 2) {
    //         for (let i = 0; i !== 40;i++) {
    //             if (this.gameMap[cord + (i*10)] !== -1) doesItFit = false; break;
    //         }
    //         if (doesItFit) {
    //             this.gameMap[cord] = cord
    //             this.gameMap[cord+10] = cord+10
    //             this.gameMap[cord+20] = cord+20
    //             this.gameMap[cord+30] = cord+30
    //             this.gameMap[cord+40] = cord+40
    //             console.log("Fits!")
    //             console.log(this.gameMap)
    //         } else {
    //             console.log("Does not fit!")
    //         }
    //     } else if (orientation === 3)  {
    //         for (let i = 4; i !== 0;i--) {
    //             if (this.gameMap[cord - (i*10)] !== -1) doesItFit = false; break;
    //         }
    //         if (doesItFit) {
    //             this.gameMap[cord] = cord
    //             this.gameMap[cord-10] = cord-10
    //             this.gameMap[cord-20] = cord-20
    //             this.gameMap[cord-30] = cord-30
    //             this.gameMap[cord-40] = cord-40
    //             console.log("Fits!")
    //             console.log(this.gameMap)
    //         } else {
    //             console.log("Does not fit!")
    //         }
    //     }
    // }