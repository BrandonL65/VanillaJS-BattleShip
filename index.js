const ALL_ROWS = document.querySelectorAll(".row");
const ALL_SQUARES = document.querySelectorAll(".square");
const GAME_MESSAGE = document.querySelector(".game-message");

class BattleshipApp {
  turn = "Player1-Turn1";
  player1StartingPoint = [];
  player1EndingPoint = [];
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
        let clickedRow = square.classList[1][1];
        let clickedCol = square.classList[1][3];

        switch (this.turn) {
          case "Player1-Turn1":
            this.player1StartingPoint = [clickedRow, clickedCol];
            this.startPlayer1Turn2();
            break;
          case "Player1-Turn2":
            this.player1EndingPoint = [clickedRow, clickedCol];
            validatePlayer1Choices();
        }
      });
    }
  };

  startPlayer1Turn1 = () => {
    this.turn = "Player1-Turn1";
    GAME_MESSAGE.innerText = "Player 1, now please choose your Starting square";
  };
  startPlayer1Turn2 = () => {
    this.turn = "Player1-TUrn2";
    GAME_MESSAGE.innerText = "Player 1, please choose your Ending square";
  };
}

new BattleshipApp();
