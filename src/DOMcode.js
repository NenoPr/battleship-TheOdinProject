


function populateDOMwithPlayArea(document, player1, player2) {
    let gameContainer = document.getElementById("player-1-map")
    let player1Map = document.getElementById("player-1-map")
    let player2Map = document.getElementById("player-2-map")
    let insertDiv;
    for (let i = 1; i < 101; i++) {
        insertDiv = document.createElement("div")
        insertDiv.id = i
        insertDiv.addEventListener("click", addAndRemoveHitEventListeners)
        insertDiv.classList.add("game-hit-box", "player-1")
        player1Map.appendChild(insertDiv)
    }

    insertDiv = document.createElement("div")
    insertDiv.id = "game-boards-separator"
    gameContainer.appendChild(insertDiv)

    for (let i = 1; i < 101; i++) {
        insertDiv = document.createElement("div")
        insertDiv.id = i
        insertDiv.addEventListener("click", function(pointer) {
            player2.playerPlayMove(pointer.target.id - 1)
        })
        insertDiv.classList.add("game-hit-box", "player-2")
        player2Map.appendChild(insertDiv)
    }

    function addAndRemoveHitEventListeners(node) {
        player1.playerPlayMove(node.target.id - 1)
        node.target.style.backgroundColor = "red"
        node.target.removeEventListener("click", addAndRemoveHitEventListeners)
        console.log(player1.playerGameBoard)
        console.log(player2.playerGameBoard)
    }
}



export { populateDOMwithPlayArea } 
    