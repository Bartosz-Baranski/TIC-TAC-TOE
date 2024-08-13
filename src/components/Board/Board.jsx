import React from "react";
import PlayField from "../PlayField/PlayField.jsx";
import { BoardContainer, Line } from "./Board.styled";

// Funkcja do generowania zakresu numerów
function range(start, end) {
  return Array.from({ length: end - start }, (_, i) => i + start);
}

const Board = ({ state, send }) => {
  const { board, winningLine, winner } = state.context;

  // Obsługuje kliknięcia w kwadrat
  const handleSquareClick = (index) => {
    if (typeof index === "number" && index >= 0 && index < 9) {
      if (!winner && board[index] === null) {
        console.log(`Square clicked with index: ${index}`);
        console.log(`Sending event: {type: 'MAKE_MOVE', index: ${index}}`);
        send({ type: "MAKE_MOVE", index }); // Upewnij się, że `index` jest przekazywany prawidłowo
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
          content={value} // Przekazywanie właściwości 'content'
          onClick={() => handleSquareClick(index)}
          isWinningSquare={winningLine?.includes(index)} // Przekazywanie 'isWinningSquare'
        />
      ))}
      {range(0, 4).map((index) => (
        <Line key={index} data-line={index} />
      ))}
    </BoardContainer>
  );
};

export default Board;
