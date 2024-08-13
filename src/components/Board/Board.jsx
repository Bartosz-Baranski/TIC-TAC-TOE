import React from "react";
import PlayField from "../PlayField/PlayField.jsx";
import { BoardContainer, Line } from "./Board.styled";

function range(start, end) {
  return Array.from({ length: end - start }, (_, i) => i + start);
}

const Board = ({ state, send }) => {
  const { board, winningLine, winner } = state.context;

  const handleSquareClick = (index) => {
    console.log(`Square clicked with index: ${index}`);

    if (typeof index === "number" && index >= 0 && index < board.length) {
      if (!winner && board[index] === null) {
        console.log(`Sending event: {type: 'MAKE_MOVE', index: ${index}}`);
        send({ type: "MAKE_MOVE", index });
      } else if (winner) {
        console.log("Game over. No more moves allowed.");
      } else {
        console.log("Square already taken.");
      }
    } else {
      console.error("Invalid index:", index);
    }
  };

  console.log("Current board state:", board);

  return (
    <BoardContainer>
      {board.map((value, index) => (
        <PlayField
          key={index}
          content={value}
          onClick={() => handleSquareClick(index)}
          isWinningSquare={winningLine?.includes(index)}
        />
      ))}
      {range(0, 4).map((index) => (
        <Line key={index} data-line={index} />
      ))}
    </BoardContainer>
  );
};

export default Board;
