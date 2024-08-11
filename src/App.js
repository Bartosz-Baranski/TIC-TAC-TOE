import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import React from "react";
import { ResetButton } from "./components/GameControls/GameControls.styled.jsx";
import { AppContainer, Title } from "./App.styled.jsx";
import {
  BoardContainer,
  SquareButton,
  Line,
} from "./components/PlayField/PlayField.styled.jsx";

function range(start, end) {
  return Array.from({ length: end - start }, (_, i) => i + start);
}

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(board) {
  if (!Array.isArray(board) || board.length !== 9) {
    console.error("Invalid board in checkWin:", board);
    return false;
  }

  for (let line of winningLines) {
    const xWon = line.every((index) => board[index] === "x");
    if (xWon) return ["x", line];

    const oWon = line.every((index) => board[index] === "o");
    if (oWon) return ["o", line];
  }
  return false;
}

const initialContext = {
  board: Array(9).fill(null),
  player: "x",
  winner: null,
  winningLine: null,
  moves: 0,
};

const gameMachine = createMachine({
  id: "game",
  initial: "playing",
  context: initialContext,
  states: {
    playing: {
      always: [
        {
          target: "winner",
          guard: (ctx) => {
            console.log("Checking win with board:", ctx.board);
            if (!Array.isArray(ctx.board)) {
              console.error("Invalid board in win guard:", ctx.board);
              return false;
            }
            const result = checkWin(ctx.board);
            console.log("Win check result:", result);
            return result !== false;
          },
          actions: assign({
            winner: (ctx) => {
              const result = checkWin(ctx.board);
              console.log("Set winner to:", result ? result[0] : null);
              return result ? result[0] : null;
            },
            winningLine: (ctx) => {
              const result = checkWin(ctx.board);
              console.log("Set winning line to:", result ? result[1] : null);
              return result ? result[1] : null;
            },
          }),
        },
        {
          target: "draw",
          guard: (ctx) => {
            console.log("Checking draw with board:", ctx.board);
            if (!Array.isArray(ctx.board)) {
              console.error("Invalid board in draw guard:", ctx.board);
              return false;
            }
            return ctx.board.every((item) => item !== null);
          },
        },
      ],
      on: {
        PLAY: {
          guard: (ctx, e) => {
            console.log("Play event:", e);
            if (!e || typeof e.value === "undefined") {
              console.error("Invalid event in play guard:", e);
              return false;
            }
            if (!Array.isArray(ctx.board)) {
              console.error("Invalid board in play guard:", ctx.board);
              return false;
            }
            if (typeof e.value !== "number" || e.value < 0 || e.value >= 9) {
              console.error("Invalid play event value:", e.value);
              return false;
            }
            return ctx.board[e.value] === null;
          },
          actions: assign({
            board: (ctx, e) => {
              const updatedBoard = [...ctx.board];
              if (typeof e.value === "number" && e.value >= 0 && e.value < 9) {
                updatedBoard[e.value] = ctx.player;
              }
              console.log("Updated board:", updatedBoard);
              return updatedBoard;
            },
            player: (ctx) => (ctx.player === "x" ? "o" : "x"),
            moves: (ctx) => ctx.moves + 1,
          }),
        },
        RESET: {
          target: "playing",
          actions: assign(() => initialContext),
        },
      },
    },
    winner: {},
    draw: {},
  },
  on: {
    RESET: {
      target: ".playing",
      actions: assign(() => initialContext),
    },
  },
});

const App = () => {
  const [state, send] = useMachine(gameMachine, { devTools: true });

  console.log("Current state:", state);
  console.log("Current state context:", state.context);

  if (!Array.isArray(state.context.board)) {
    return <div>Error: Board is undefined or not an array</div>;
  }

  const { board, winningLine } = state.context;

  return (
    <AppContainer>
      <Title>Tic Tac Toe</Title>
      <BoardContainer data-state={state.value}>
        {range(0, 9).map((index) => (
          <SquareButton
            key={index}
            onClick={() => send({ type: "PLAY", value: index })}
            data-player={board[index]}
            data-winning={winningLine?.includes(index) || undefined}
          >
            {board[index]}
          </SquareButton>
        ))}
        {range(0, 4).map((index) => (
          <Line key={index} data-line={index} />
        ))}
      </BoardContainer>
      <ResetButton onClick={() => send({ type: "RESET" })}>Reset</ResetButton>
    </AppContainer>
  );
};

export default App;
