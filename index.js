const ALL_ROWS = document.querySelectorAll(".row");
const ALL_SQUARES = document.querySelectorAll(".square");
const GAME_MESSAGE = document.querySelector(".game-message");

class BattleshipApp {
  turn = "Player1-Turn1";
  player1StartingPoint = [];
  player1EndingPoint = [];
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
    this.instantiateBoard();
    this.startPlayer1Turn1();
    this.addClickEventsToBoard();
  }

  //Initial sync of the starting board with the virtualBoard, with "."
  instantiateBoard = () => {
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
    if (
      Math.max(Math.abs(endRow - startRow), Math.abs(endCol - startCol)) < 2
    ) {
      this.gameOver = true;
      alert(
        "Please choose a battleship that is 3 squares long. Please refresh and try again"
      );
    }
    //Check if Player 1 chose a battleship more than 3 squares long
    if (Math.abs(endRow - startRow) > 2 || Math.abs(endCol - startCol) > 2) {
      this.gameOver = true;
      alert(
        "Please do not choose a battleship longer than 3 squares long. Please refresh and try again"
      );
    }
    //If everything is valid
    this.updateVirtualBoardWithPlayer1Choices(
      startRow,
      endRow,
      startCol,
      endCol
    );
  };

  updateVirtualBoardWithPlayer1Choices = (
    startRow,
    endRow,
    startCol,
    endCol
  ) => {
    let firstCoordinate = [startRow, startCol];
    let lastCoordinate = [endRow, endCol];
    let middleCoordinate = [];
    console.log(startRow, endRow);
    //if the battleship is vertical, else horizontal
    if (Math.abs(endRow - startRow) !== 0) {
      middleCoordinate[0] = (
        (parseInt(endRow) + parseInt(startRow)) /
        2
      ).toString();
      middleCoordinate[1] = startCol;
    } else {
      middleCoordinate[0] = startRow;
      middleCoordinate[1] = (
        (parseInt(endCol) + parseInt(startCol)) /
        2
      ).toString();
    }

    console.log(firstCoordinate, middleCoordinate, lastCoordinate);
  };
}

new BattleshipApp();
