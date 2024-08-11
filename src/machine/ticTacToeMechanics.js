import { createMachine, assign } from "xstate";

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
  if (!board || !Array.isArray(board)) {
    console.error("Invalid board:", board);
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
              console.error("Invalid board in guard:", ctx.board);
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
            return (
              Array.isArray(ctx.board) &&
              ctx.board.every((item) => item !== null)
            );
          },
        },
      ],
      on: {
        PLAY: {
          guard: (ctx, e) => {
            console.log("Play event with value:", e.value);
            if (!Array.isArray(ctx.board) || e.value === undefined) {
              console.error(
                "Invalid state or event value:",
                ctx.board,
                e.value
              );
              return false;
            }
            return ctx.board[e.value] === null;
          },
          actions: assign({
            board: (ctx, e) => {
              if (!Array.isArray(ctx.board)) {
                console.error(
                  "Board is undefined or not an array. Resetting to initial state."
                );
                return Array(9).fill(null);
              }
              const updatedBoard = [...ctx.board];
              updatedBoard[e.value] = ctx.player;
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

export default gameMachine;
