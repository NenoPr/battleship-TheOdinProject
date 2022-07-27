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
        player1Map.appendChild(insertDiv)
    }

    for (let i = 1; i < 101; i++) {
        insertDiv = document.createElement("div")
        insertDiv.id = i
        insertDiv.addEventListener("click", addAndRemoveHitEventListeners2)
        insertDiv.classList.add("game-hit-box", "player-2")
        player2Map.appendChild(insertDiv)
    }

    function addAndRemoveHitEventListeners1(node) {
        // player1.playerPlayMove(node.target.id - 1)
        if (player1.playerGameBoard.receiveAttack(node.target.id - 1)) {
            node.target.classList.add("ship-hit")
        } else node.target.classList.add("missed-shot")
        console.log(player1.playerGameBoard.allShipsSunk())
        playerTurn()
        // node.target.removeEventListener("click", addAndRemoveHitEventListeners1)
        console.log(player1.playerGameBoard)
    }

    function addAndRemoveHitEventListeners2(node) {
        // player2.playerPlayMove(node.target.id - 1)
        if (player2.playerGameBoard.receiveAttack(node.target.id - 1) === true) {
            console.log("Fuck you")
            node.target.classList.add("ship-hit")
        } else node.target.classList.add("missed-shot")

        console.log(player2.playerGameBoard.allShipsSunk())
        playerTurn()
        // node.target.removeEventListener("click", addAndRemoveHitEventListeners2)
        console.log(player2.playerGameBoard)
    }
}

function playerPopulateShips(player1, player2) {
    let player1Map = document.getElementById("player-1-map");
    let insertDiv;
    let wheelPosition = "horizontal";
    let shipsSet = 0;

    window.addEventListener("wheel", wheelPositionChange)
    document.getElementById("hints-info").innerText = "Use the mouse wheel to change orientation."
    document.getElementById("hints").innerText = "Currently placing in the horizontal direction."

    function wheelPositionChange() {
        if (wheelPosition === "vertical") {
            wheelPosition = "horizontal"
            document.getElementById("hints").innerText = "Currently placing in the horizontal direction."
        } else {
            wheelPosition = "vertical";
            document.getElementById("hints").innerText = "Currently placing in the vertical direction."
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
                    document.getElementById(`${positions[i]}`).classList.add("selected-mark-tile")
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
                    document.getElementById(`${positions[i]}`).classList.add("selected-mark-tile")
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
                    document.getElementById(`${positions[i]}`).classList.add("selected-mark-tile")
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
                    document.getElementById(`${positions[i]}`).classList.add("selected-mark-tile")
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
                    document.getElementById(`${positions[i]}`).classList.add("selected-mark-tile")
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasEnter)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", highlightAreasLeave)
                    document.getElementById(`${positions[i]}`).removeEventListener("mouseover", placeShipLocation)
                }
                console.log("submarine set")
                shipsSet++
            }
        } else if(shipsSet === 5) {

            document.getElementById("player-1-map").remove()
            let newPlayer1Map = document.createElement("div")
            newPlayer1Map.id = "player-1-map"
            document.getElementById("game-container").insertAdjacentElement("afterbegin", newPlayer1Map)
            let newPlayer2 = initializeGame (player1, player2)
            return newPlayer2
        }       
    }


}

function playerTurn() {
    document.getElementById("player-1-map").classList.toggle("players-turn")
    document.getElementById("player-2-map").classList.toggle("players-turn")
}


export { populateDOMwithPlayArea, playerTurn, playerPopulateShips } 
    