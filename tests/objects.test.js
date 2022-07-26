
const { shipFactory, gameBoard, Player } = require('../src/objects')

describe('Test the shipFactory and its functions.', () => {
    let newShip = shipFactory("cruiser",[4,5,6,7])

    test("New ship Object shipType", () => {
        expect(newShip.shipType).toBe("cruiser")
    })
    test("New ship Object shipLength array length", () => {
        expect(newShip.shipLength.length).toBe(4)
    })
    test("New ship Object shipLength values", () => {
        expect(newShip.shipLength).toEqual([4,5,6,7])
    })


    test("New ship Object hit() function", () => {
        expect(newShip.hit(4)).toEqual([-2,5,6,7])
    })
    test("New ship Object isSunk() function", () => {
        newShip.hit(4)
        newShip.hit(5)
        newShip.hit(6)
        newShip.hit(7)
        expect(newShip.isSunk()).toBe(true)
    })
});

describe("Test the gameBoard and its functions.", () => {

    let testBoard = gameBoard
    test("Test if placeShips() outputs a map populated with ships.", () => {
        let newShip = shipFactory("destroyer",[10,11,12,13,14])
        expect(testBoard.placeShips([10,11,12,13,14])).toEqual(newShip)
    })
    test("Test if receiveAttack() registers a hit.", () => {
        expect(testBoard.receiveAttack(10)).toEqual(`A destroyer has been hit at coordinate 10!`)
    })
    test("Test if receiveAttack() registers a missed shot.", () => {
        expect(testBoard.receiveAttack(99)).toEqual("A miss at coordinate 99 map value is now 0!")
    })
    test("Test if allShipsSunk() registers non sunken ships.", () => {
        expect(testBoard.allShipsSunk()).toMatch("There are still ships in the battle!")
    })
    test("Test if allShipsSunk() register if all ships have been sunk.", () => {
        testBoard.receiveAttack(10)
        testBoard.receiveAttack(11)
        testBoard.receiveAttack(12)
        testBoard.receiveAttack(13)
        testBoard.receiveAttack(14)
        expect(testBoard.allShipsSunk()).toMatch("All ships have been sunk!")
    })
})

describe("Test the Player object ans it's functions.", () => {
    for (let i = 0; i < gameBoard.gameMap.length; i++) {
        gameBoard.gameMap[i] = 0
    }
    gameBoard.gameMap[50] = -1
    let testPlayer = Player;
    test("Test if the ai makes a valid move.", () => {
        expect(testPlayer.aiPlayMove()).toContain(`Moves still left played move `, expect.any(Number))
    })
    test("Test if the ai registers that there are no more moves left.", () => {
        expect(testPlayer.aiPlayMove()).toContain("No valid moves left! Played ", expect.any(Number))
    })
    test("Test if the board get updated after a play.", () => {
        testPlayer.aiPlayMove()
        expect(gameBoard.gameMap).toContain(0)
    })
})