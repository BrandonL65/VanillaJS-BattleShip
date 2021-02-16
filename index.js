const ALL_ROWS = document.querySelectorAll(".row");
const ALL_SQUARES = document.querySelectorAll(".square");
let GAME_MESSAGE = document.querySelector(".game-message");
let PLAYER2_AMMO = document.querySelector(".player2-ammo");

class BattleshipApp {
  turn = "Player1-Turn1";
  player1StartingPoint = [];
  player1EndingPoint = [];
  finalPlayer1Coordinates = [];
  Player2Ammunition = 10;
  NumberOfSuccessfulHits = 0;
  gameOver = false;
  virtualBoard = [
    [".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "."],
  ];
  constructor() {
    this.updateDOMBoard();
    this.startPlayer1Turn1();
    this.addClickEventsToBoard();
  }

  //Initial sync of the starting board with the virtualBoard, with "."
  updateDOMBoard = () => {
    for (let square of ALL_SQUARES) {
      let row = square.classList[1][1];
      let col = square.classList[1][3];
      let virtualBoardValue = this.virtualBoard[row][col];
      let updatedDOMValue = document.createElement("p");
      updatedDOMValue.innerText = virtualBoardValue;
      updatedDOMValue.classList.add("square-value");
      square.append(updatedDOMValue);
    }
  };

  //Add click events to each square, and how to react to it based on whether it's P1 or P2's turn
  addClickEventsToBoard = () => {
    for (let square of ALL_SQUARES) {
      square.addEventListener("click", () => {
        if (!this.gameOver) {
          let clickedRow = square.classList[1][1];
          let clickedCol = square.classList[1][3];

          switch (this.turn) {
            case "Player1-Turn1":
              this.player1StartingPoint = [clickedRow, clickedCol];
              square.classList.add("clicked");
              this.startPlayer1Turn2();
              break;
            case "Player1-Turn2":
              this.player1EndingPoint = [clickedRow, clickedCol];
              square.classList.add("clicked");
              this.validatePlayer1Choices();
              break;
            case "Player2":
              //if board position has not been fired at already
              if (square.innerText === ".") {
                this.Player2Ammunition--;
                PLAYER2_AMMO.innerText = `AMMUNITION LEFT: ${this.Player2Ammunition}`;
                square.innerHTML = "";
                let row = square.classList[1][1];
                let col = square.classList[1][3];
                let virtualBoardValue = this.virtualBoard[row][col];
                let updatedDOMValue = document.createElement("p");
                updatedDOMValue.classList.add("square-value");
                if (virtualBoardValue === "P1") {
                  updatedDOMValue.innerText = "X";
                  this.NumberOfSuccessfulHits++;
                } else {
                  updatedDOMValue.innerText = "O";
                }
                square.append(updatedDOMValue);
              } else {
                alert("Please fire somewhere you haven't fired already!");
              }
              //if player 2 hits the ship 3 times, player 2 wins
              if (this.NumberOfSuccessfulHits === 3) {
                this.gameOver = true;
                alert("PLAYER 2 HAS WON, YOUVE SUNK THE WHOLE SHIP!");
              }
              //if player 2 runs out of ammo, player 1 wins
              if (this.Player2Ammunition === 0) {
                this.gameOver = true;
                alert("PLAYER 1 HAS WON, You have not sunk the whole ship.");
              }
              break;
          }
        }
      });
    }
  };

  startPlayer1Turn1 = () => {
    this.turn = "Player1-Turn1";
    GAME_MESSAGE.innerText = "Player 1, now please choose your Starting square";
  };
  startPlayer1Turn2 = () => {
    this.turn = "Player1-Turn2";
    GAME_MESSAGE.innerText = "Player 1, please choose your Ending square";
  };
  validatePlayer1Choices = () => {
    let startRow = this.player1StartingPoint[0];
    let startCol = this.player1StartingPoint[1];
    let endRow = this.player1EndingPoint[0];
    let endCol = this.player1EndingPoint[1];

    //Check if Player 1 chose diagonally placed pieces
    if (
      Math.abs(endRow - startRow) !== 0 &&
      Math.abs(endCol - startCol) !== 0
    ) {
      this.gameOver = true;
      alert(
        "Invalid, please do not choose diagonally. Please refresh and try again"
      );
    }
    //Check if Player 1 chose a battleship less than 3 squares long
    else if (
      Math.max(Math.abs(endRow - startRow), Math.abs(endCol - startCol)) < 2
    ) {
      this.gameOver = true;
      alert(
        "Please choose a battleship that is 3 squares long. Please refresh and try again"
      );
    }
    //Check if Player 1 chose a battleship more than 3 squares long
    else if (
      Math.abs(endRow - startRow) > 2 ||
      Math.abs(endCol - startCol) > 2
    ) {
      this.gameOver = true;
      alert(
        "Please do not choose a battleship longer than 3 squares long. Please refresh and try again"
      );
    }
    //If everything is valid
    else {
      alert("You have placed a valid battleship. Player 2's turn will start");
      this.updateVirtualBoardWithPlayer1Choices(
        parseInt(startRow),
        parseInt(endRow),
        parseInt(startCol),
        parseInt(endCol)
      );
    }
  };

  //Updates the virtual board with Player 1's chosen coordinates
  updateVirtualBoardWithPlayer1Choices = (
    startRow,
    endRow,
    startCol,
    endCol
  ) => {
    let firstCoordinate = [startRow, startCol];
    let lastCoordinate = [endRow, endCol];
    let middleCoordinate = [];
    //if the battleship is vertical, else horizontal
    if (Math.abs(endRow - startRow) !== 0) {
      middleCoordinate[0] = (parseInt(endRow) + parseInt(startRow)) / 2;
      middleCoordinate[1] = startCol;
    } else {
      middleCoordinate[0] = startRow;
      middleCoordinate[1] = (parseInt(endCol) + parseInt(startCol)) / 2;
    }

    //update the final player 1 coordinates
    this.finalPlayer1Coordinates = [
      firstCoordinate,
      middleCoordinate,
      lastCoordinate,
    ];

    this.virtualBoard[firstCoordinate[0]][firstCoordinate[1]] = "P1";
    this.virtualBoard[middleCoordinate[0]][middleCoordinate[1]] = "P1";
    this.virtualBoard[lastCoordinate[0]][lastCoordinate[1]] = "P1";

    this.removeP1RedTagsFromBoard();
  };

  //Removes Player 1's coordinate markers from the board
  removeP1RedTagsFromBoard = () => {
    for (let square of ALL_SQUARES) {
      square.classList.remove("clicked");
    }
    this.startP2Turn();
  };

  startP2Turn = () => {
    this.turn = "Player2";
    PLAYER2_AMMO.innerText = `AMMUNITION LEFT: ${this.Player2Ammunition}`;
    GAME_MESSAGE = "It is now Player 2's Turn! Find the Battleship!";
  };
}

new BattleshipApp();
