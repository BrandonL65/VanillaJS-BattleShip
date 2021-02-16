const ALL_ROWS = document.querySelectorAll(".row");
const ALL_SQUARES = document.querySelectorAll(".square");

class BattleshipApp {
  turn = "Player1-Turn1";
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
    this.startPlayer1Turn();
  }

  //Initial sync of the starting board with the virtualBoard
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
}

new BattleshipApp();
