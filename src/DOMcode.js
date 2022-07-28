import { initializeGame } from './main.js'


function populateDOMwithPlayArea(document, player1, player2) {

    let player1Map = document.getElementById("player-1-map")
    let player2Map = document.getElementById("player-2-map")
    let insertDiv;

    for (let i = 1; i < 101; i++) {
        insertDiv = document.createElement("div")
        insertDiv.id = i
        insertDiv.addEventListener("click", addAndRemoveHitEventListeners1)
        insertDiv.classList.add("game-hit-box", "player-1")
        if ( i === player1.playerGameBoard.gameMap[i-1]) {
            insertDiv.classList.add("ship-location")
        }
        player1Map.appendChild(insertDiv)
    }

    let carrierLoc = player1.playerGameBoard.allShips[0].shipLength
    let battleshipLoc = player1.playerGameBoard.allShips[1].shipLength
    let cruiserLoc = player1.playerGameBoard.allShips[2].shipLength
    let destroyerLoc = player1.playerGameBoard.allShips[3].shipLength
    let submarineLoc = player1.playerGameBoard.allShips[4].shipLength
    console.log("Ships initial locations:",carrierLoc,battleshipLoc,cruiserLoc,destroyerLoc,submarineLoc)
    console.log(carrierLoc[0])

    for (let i = 0; i < carrierLoc.length; i++) {
        console.log(carrierLoc[i])
        document.getElementById(`${carrierLoc[i]}`).classList.add("carrier")
        document.getElementById(`${carrierLoc[i]}`).innerText = `C${i+1}`
    }
    for (let i = 0; i < battleshipLoc.length; i++) {
        console.log(battleshipLoc[i])
        document.getElementById(`${battleshipLoc[i]}`).classList.add("battleship")
        document.getElementById(`${battleshipLoc[i]}`).innerText = `B${i+1}`
    }
    for (let i = 0; i < cruiserLoc.length; i++) {
        console.log(cruiserLoc[i])
        document.getElementById(`${cruiserLoc[i]}`).classList.add("cruiser")
        document.getElementById(`${cruiserLoc[i]}`).innerText = `C${i+1}`
    }
    for (let i = 0; i < destroyerLoc.length; i++) {
        console.log(destroyerLoc[i])
        document.getElementById(`${destroyerLoc[i]}`).classList.add("destroyer")
        document.getElementById(`${destroyerLoc[i]}`).innerText = `D${i+1}`
    }
    for (let i = 0; i < submarineLoc.length; i++) {
        console.log(submarineLoc[i])
        document.getElementById(`${submarineLoc[i]}`).classList.add("submarine")
        document.getElementById(`${submarineLoc[i]}`).innerText = `S${i+1}`
    }

    for (let i = 1; i < 101; i++) {
        insertDiv = document.createElement("div")
        insertDiv.id = i
        insertDiv.addEventListener("click", addAndRemoveHitEventListeners2)
        insertDiv.classList.add("game-hit-box", "player-2")
        player2Map.appendChild(insertDiv)
    }

    function addAndRemoveHitEventListeners1(node) {
        if (player1.playerGameBoard.receiveAttack(node.target.id, true)) {
            node.target.classList.add("ship-hit")
            node.target.classList.remove("ship-location")
            let hit = document.createElement("div")
            hit.innerText = "HIT!"
            node.target.appendChild(hit)
        } else {
            node.target.classList.add("missed-shot")
            node.target.classList.remove("ship-location")
            let missed = document.createElement("div")
            missed.innerText = "MISS"
            node.target.appendChild(missed)
        }
        player1.playerPlayMove(node.target.id - 1)
        console.log(player1.playerGameBoard.allShipsSunk())
        node.target.removeEventListener("click", addAndRemoveHitEventListeners1)
        if (player1.playerGameBoard.allShipsSunk()) {
            console.log("All ships have been sunk! Player 2 Wins!")
            let container = document.getElementById("game-container")
            container.classList.add("remove-events")
            let newDiv = document.getElementById("game-end")
            newDiv.classList.remove("no-display")
            newDiv.firstElementChild.innerHTML = "All ships have been sunk! <br> Player 2 Wins!"
        }
        playerTurn()
        console.log(player1.playerGameBoard)
    }

    let validMovesLeftArrayAI = Array.from({length: 100}, (_,i) => i+1)
    console.log("Before Shuffle: ",validMovesLeftArrayAI)

    function shuffleArray(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    shuffleArray(validMovesLeftArrayAI)
    console.log("After Shuffle: ",validMovesLeftArrayAI)


    function addAndRemoveHitEventListeners2(node) {
        if (player2.playerGameBoard.receiveAttack(node.target.id)) {
            node.target.classList.add("ship-hit")
            let hit = document.createElement("div")
            hit.innerText = "HIT!"
            node.target.appendChild(hit)
        } else {
            node.target.classList.add("missed-shot")
            let missed = document.createElement("div")
            missed.innerText = "MISS"
            node.target.appendChild(missed)
            console.log("MISSED SHOT 2nd MAP")
        }

        console.log(player2.playerGameBoard.allShipsSunk())
        player2.playerPlayMove(node.target.id - 1)
        node.target.removeEventListener("click", addAndRemoveHitEventListeners2)
        if (player2.playerGameBoard.allShipsSunk()) {
            console.log("All ships have been sunk! Player 1 Wins!")
            let container = document.getElementById("game-container")
            container.classList.add("remove-events")
            let newDiv = document.getElementById("game-end")
            newDiv.classList.remove("no-display")
            newDiv.firstElementChild.innerHTML= "All ships have been sunk! <br> Player 1 Wins!"
        }
        playerTurn()
        document.getElementById(`${validMovesLeftArrayAI[0]}`).click()
        validMovesLeftArrayAI.shift()
        // let randMoveAI = Math.floor(Math.random(1,100) * 100)
        // console.log(randMoveAI)
        // do {
        //     try {
        //         if (document.getElementById(`${randMoveAI}`).click() !== Error) break
        //     } catch (error) {console.log("Rolling random Strike Again.")}
        // } while (true)
        console.log(player2.playerGameBoard)
    }

    document.getElementById("continue-yes").addEventListener("click", () => {
        location.reload();
    })

}

async function playerPopulateShips(player1, player2) {
    let player1Map = document.getElementById("player-1-map");
    let insertDiv;
    let wheelPosition = "horizontal";
    let shipsSet = 0;

    window.addEventListener("wheel", wheelPositionChange)
    document.getElementById("hints-info").innerText = "Use the mouse wheel to change orientation."
    document.getElementById("hints").innerHTML = "Currently placing in the <strong>horizontal</strong> direction."

    function wheelPositionChange() {
        if (wheelPosition === "vertical") {
            wheelPosition = "horizontal"
            document.getElementById("hints").innerHTML = "Currently placing in the <strong>horizontal</strong> direction."
        } else {
            wheelPosition = "vertical";
            document.getElementById("hints").innerHTML = "Currently placing in the <strong>vertical</strong> direction."
        }

        document.querySelector("#player-1-map").childNodes.forEach( node => {
            node.classList.remove("marked-tile")
            if(node.id % 10 === 0) {
                if (wheelPosition === "vertical") {
                    node.classList.remove("remove-events")
                } else node.classList.add("remove-events")
            } 
        })
        console.log(wheelPosition)
    }

    for (let i = 1; i < 101; i++) {
        insertDiv = document.createElement("div")
        insertDiv.id = i
        insertDiv.addEventListener("click", placeShipLocation)
        insertDiv.addEventListener("mouseover", highlightAreasEnter)
        insertDiv.addEventListener("mouseleave", highlightAreasLeave)
        insertDiv.classList.add("game-hit-box", "player-1")
        if(i % 10 === 0) insertDiv.classList.add("remove-events")
        player1Map.appendChild(insertDiv)
    }

    // ---- PLACE THE HIGHLIGHTS ----
    function highlightAreasEnter(node) {
        if (wheelPosition === "horizontal") {
            if (shipsSet === 0) {
                let nodeLocation = Number(node.target.id)
                let tens = (Math.floor(nodeLocation/10) * 10) + 10
                if (tens > 100) tens = 100
                if (nodeLocation + 4 <= tens) {
                    for (let i = 0;i<5;i++) {
                        if (document.getElementById(`${nodeLocation+i}`).classList.contains("selected-mark-tile")) {
                            for (let i = 0;i<5;i++) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile-wrong")
                            }
                        } else {
                            for (let i = 0;i<5;i++) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile")
                            }
                        }
                    }
                    console.log("hover event inside2")
                } else {
                    for (let i = nodeLocation;i<=tens;i++) {
                        document.getElementById(`${i}`).classList.add("marked-tile-wrong")
                    }
                }
            } else if (shipsSet === 1) {
                let nodeLocation = Number(node.target.id)
                let tens = (Math.floor(nodeLocation/10) * 10) + 10
                if (tens > 100) tens = 100
                if (nodeLocation + 3 <= tens) {
                    for (let i = 0;i<4;i++) {
                        if (document.getElementById(`${nodeLocation+i}`).classList.contains("selected-mark-tile")) {
                            for (let i = 0;i<4;i++) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile-wrong")
                            }
                        } else {
                            for (let i = 0;i<4;i++) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile")
                            }
                        }
                    }
                    console.log("hover event inside2")
                } else {
                    for (let i = nodeLocation;i<=tens;i++) {
                        document.getElementById(`${i}`).classList.add("marked-tile-wrong")
                    }
                }
            } else if (shipsSet === 2) {
                let nodeLocation = Number(node.target.id)
                let tens = (Math.floor(nodeLocation/10) * 10) + 10
                if (tens > 100) tens = 100
                if (nodeLocation + 2 <= tens) {
                    for (let i = 0;i<3;i++) {
                        if (document.getElementById(`${nodeLocation+i}`).classList.contains("selected-mark-tile")) {
                            for (let i = 0;i<3;i++) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile-wrong")
                            }
                        } else {
                            for (let i = 0;i<3;i++) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile")
                            }
                        }
                    }
                    console.log("hover event inside2")
                } else {
                    for (let i = nodeLocation;i<=tens;i++) {
                        document.getElementById(`${i}`).classList.add("marked-tile-wrong")
                    }
                }
            } else if (shipsSet === 3) {
                let nodeLocation = Number(node.target.id)
                let tens = (Math.floor(nodeLocation/10) * 10) + 10
                if (tens > 100) tens = 100
                if (nodeLocation + 1 <= tens) {
                    for (let i = 0;i<2;i++) {
                        if (document.getElementById(`${nodeLocation+i}`).classList.contains("selected-mark-tile")) {
                            for (let i = 0;i<2;i++) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile-wrong")
                            }
                        } else {
                            for (let i = 0;i<2;i++) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile")
                            }
                        }
                    }
                    console.log("hover event inside2")
                } else {
                    for (let i = nodeLocation;i<=tens;i++) {
                        document.getElementById(`${i}`).classList.add("marked-tile-wrong")
                    }
                }
            } else if (shipsSet === 4) {
                let nodeLocation = Number(node.target.id)
                let tens = (Math.floor(nodeLocation/10) * 10) + 10
                if (tens > 100) tens = 100
                if (nodeLocation + 1 <= tens) {
                    for (let i = 0;i<2;i++) {
                        if (document.getElementById(`${nodeLocation+i}`).classList.contains("selected-mark-tile")) {
                            for (let i = 0;i<2;i++) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile-wrong")
                            }
                        } else {
                            for (let i = 0;i<2;i++) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile")
                            }
                        }
                    }
                    console.log("hover event inside2")
                } else {
                    for (let i = nodeLocation;i<=tens;i++) {
                        document.getElementById(`${i}`).classList.add("marked-tile-wrong")
                    }
                }
            }
        } else {
            if (shipsSet === 0) {
                let nodeLocation = Number(node.target.id)
                let tens = (Math.floor(nodeLocation/10) * 10) + 10
                if (nodeLocation + 40 <= 100) {
                    for (let i = 0;i<50;i += 10) {
                        if (document.getElementById(`${nodeLocation+i}`).classList.contains("selected-mark-tile")) {
                            for (let i = 0;i<50;i += 10) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile-wrong")
                            }
                        } else {
                            for (let i = 0;i<50;i += 10) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile")
                            }
                        }
                    }
                    console.log("hover event inside2")
                } else {
                    for (let i = nodeLocation;i<=tens;i++) {
                        document.getElementById(`${i}`).classList.add("marked-tile-wrong")
                    }
                }
            } else if (shipsSet === 1) {
                let nodeLocation = Number(node.target.id)
                let tens = (Math.floor(nodeLocation/10) * 10) + 10
                if (nodeLocation + 30 <= 100) {
                    for (let i = 0;i<40;i += 10) {
                        if (document.getElementById(`${nodeLocation+i}`).classList.contains("selected-mark-tile")) {
                            for (let i = 0;i<40;i += 10) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile-wrong")
                            }
                        } else {
                            for (let i = 0;i<40;i += 10) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile")
                            }
                        }
                    }
                    console.log("hover event inside2")
                } else {
                    for (let i = nodeLocation;i<=tens;i++) {
                        document.getElementById(`${i}`).classList.add("marked-tile-wrong")
                    }
                }
            } else if (shipsSet === 2) {
                let nodeLocation = Number(node.target.id)
                let tens = (Math.floor(nodeLocation/10) * 10) + 10
                if (nodeLocation + 20 <= 100) {
                    for (let i = 0;i<30;i += 10) {
                        if (document.getElementById(`${nodeLocation+i}`).classList.contains("selected-mark-tile")) {
                            for (let i = 0;i<30;i += 10) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile-wrong")
                            }
                        } else {
                            for (let i = 0;i<30;i += 10) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile")
                            }
                        }
                    }
                    console.log("hover event inside2")
                } else {
                    for (let i = nodeLocation;i<=tens;i++) {
                        document.getElementById(`${i}`).classList.add("marked-tile-wrong")
                    }
                }
            } else if (shipsSet === 3) {
                let nodeLocation = Number(node.target.id)
                let tens = (Math.floor(nodeLocation/10) * 10) + 10
                if (nodeLocation + 10 <= 100) {
                    for (let i = 0;i<20;i += 10) {
                        if (document.getElementById(`${nodeLocation+i}`).classList.contains("selected-mark-tile")) {
                            for (let i = 0;i<20;i += 10) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile-wrong")
                            }
                        } else {
                            for (let i = 0;i<20;i += 10) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile")
                            }
                        }
                    }
                    console.log("hover event inside2")
                } else {
                    for (let i = nodeLocation;i<=tens;i++) {
                        document.getElementById(`${i}`).classList.add("marked-tile-wrong")
                    }
                }
            } else if (shipsSet === 4) {
                let nodeLocation = Number(node.target.id)
                let tens = (Math.floor(nodeLocation/10) * 10) + 10
                if (nodeLocation + 10 <= 100) {
                    for (let i = 0;i<20;i += 10) {
                        if (document.getElementById(`${nodeLocation+i}`).classList.contains("selected-mark-tile")) {
                            for (let i = 0;i<20;i += 10) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile-wrong")
                            }
                        } else {
                            for (let i = 0;i<20;i += 10) {
                                document.getElementById(`${nodeLocation+i}`).classList.add("marked-tile")
                            }
                        }
                    }
                    console.log("hover event inside2")
                } else {
                    for (let i = nodeLocation;i<=tens;i++) {
                        document.getElementById(`${i}`).classList.add("marked-tile-wrong")
                    }
                }
            }
        }
        
    }

    function highlightAreasLeave(node) {
        let nodeLocation = Number(node.target.id)
        try {
        if (wheelPosition === "horizontal") {
                for (let i = 0;i<5;i++) {
                    document.getElementById(`${nodeLocation+i}`).classList.remove("marked-tile")
                    document.getElementById(`${nodeLocation+i}`).classList.remove("marked-tile-wrong")
                    
                }
            } else {
                for (let i = 0;i<50;i += 10) {
                document.getElementById(`${nodeLocation+i}`).classList.remove("marked-tile")
                document.getElementById(`${nodeLocation+i}`).classList.remove("marked-tile-wrong")
                }
            } 
        } catch (error) {console.log(error,"This is expected.")}
        
    }

    function placeShipLocation(node) {
        let startingCord = Number(node.target.id)

        console.log("startingCord",startingCord)
        console.log(player1.playerGameBoard)


        if (shipsSet === 0) {
            if (player1.playerGameBoard.placeShips("carrier",[startingCord,0,0,0,0], false, wheelPosition)) {
                let positions = player1.playerGameBoard.allShips[0].shipLength
                console.log(positions)
                for (let i = 0; i < positions.length;i++) {
                    document.getElementById(`${positions[i]}`).classList.add("remove-events")
                    document.getElementById(`${positions[i]}`).classList.add("carrier")
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasEnter)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasLeave)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", placeShipLocation)
                }
                console.log("carrier set")
                shipsSet = 1
            }
        } else if(shipsSet === 1) {
            if (player1.playerGameBoard.placeShips("battleship",[startingCord,0,0,0], false, wheelPosition)) {
                let positions = player1.playerGameBoard.allShips[1].shipLength
                console.log(positions)
                for (let i = 0; i < positions.length;i++) {
                    document.getElementById(`${positions[i]}`).classList.add("remove-events")
                    document.getElementById(`${positions[i]}`).classList.add("battleship")
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasEnter)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasLeave)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", placeShipLocation)
                }
                console.log("battleship set")
                shipsSet++
            }
        } else if(shipsSet === 2) {
            if (player1.playerGameBoard.placeShips("cruiser",[startingCord,0,0], false, wheelPosition)) {
                let positions = player1.playerGameBoard.allShips[2].shipLength
                console.log(positions)
                for (let i = 0; i < positions.length;i++) {
                    document.getElementById(`${positions[i]}`).classList.add("remove-events")
                    document.getElementById(`${positions[i]}`).classList.add("cruiser")
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasEnter)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasLeave)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", placeShipLocation)
                }
                console.log("cruiser set")
                shipsSet++
            }
        } else if(shipsSet === 3) {
            if (player1.playerGameBoard.placeShips("destroyer",[startingCord,0], false, wheelPosition)) {
                let positions = player1.playerGameBoard.allShips[3].shipLength
                console.log(positions)
                for (let i = 0; i < positions.length;i++) {
                    document.getElementById(`${positions[i]}`).classList.add("remove-events")
                    document.getElementById(`${positions[i]}`).classList.add("destroyer")
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasEnter)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasLeave)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", placeShipLocation)
                }
                console.log("destroyer set")
                shipsSet++
            }
        } else if(shipsSet === 4) {
            if (player1.playerGameBoard.placeShips("submarine",[startingCord,0], false, wheelPosition)) {
                let positions = player1.playerGameBoard.allShips[4].shipLength
                console.log(positions)
                for (let i = 0; i < positions.length;i++) {
                    document.getElementById(`${positions[i]}`).classList.add("remove-events")
                    document.getElementById(`${positions[i]}`).classList.add("submarine")
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasEnter)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasLeave)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", placeShipLocation)
                }
                console.log("submarine set")
                
                // PREPARE THE GAME

                window.removeEventListener("wheel", wheelPositionChange)
                document.getElementById("hints-info").innerText = "BATTLE!"
                document.getElementById("hints").innerHTML= "All hands on deck!<br> Your Orders Admiral!"


                document.getElementById("player-1-map").remove()
                let newPlayer1Map = document.createElement("div")
                newPlayer1Map.id = "player-1-map"
                newPlayer1Map.classList.add("players-turn")
                document.getElementById("game-container").insertAdjacentElement("afterbegin", newPlayer1Map)
                document.getElementById("player-2-map").classList.remove("no-display")
                document.getElementById("player-2-map").classList.remove("players-turn")
                document.getElementById("separator").classList.remove("no-display")
                let newPlayer2 = initializeGame (player1, player2)
                return newPlayer2
            }
        }      
    }
}

function playerTurn() {
    document.getElementById("player-1-map").classList.toggle("players-turn")
    document.getElementById("player-2-map").classList.toggle("players-turn")
}


export { populateDOMwithPlayArea, playerTurn, playerPopulateShips } 
    