import { createMachine, assign } from "xstate";

const initialContext = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  winningLine: null,
  moves: 0,
};

const ticTacToeMachine = createMachine(
  {
    id: "ticTacToe",
    initial: "playing",
    context: initialContext,
    states: {
      playing: {
        on: {
          MAKE_MOVE: {
            actions: "makeMove",
            target: [
              { target: "won", cond: "checkWinCondition" },
              { target: "draw", cond: "checkDrawCondition" },
              { target: "playing" },
            ],
          },
          RESET: {
            actions: "resetGame",
          },
        },
      },
      won: {
        type: "final",
        entry: "logWin",
      },
      draw: {
        type: "final",
        entry: "logDraw",
      },
    },
  },
  {
    actions: {
      makeMove: assign((context, event) => {
        console.log("Action: makeMove triggered");
        console.log("Context before move:", context);
        console.log("Event received:", event);

        if (!event) {
          console.error("No event provided.");
          return context;
        }

        if (typeof event.index !== "number") {
          console.error("Event index is not a number:", event);
          return context;
        }

        if (event.index < 0 || event.index >= context.board.length) {
          console.error("Event index is out of bounds:", event.index);
          return context;
        }

        const board = [...context.board];

        if (board[event.index] === null) {
          board[event.index] = context.currentPlayer;
          console.log("Board updated:", board);

          const nextPlayer = context.currentPlayer === "X" ? "O" : "X";
          console.log("Next player:", nextPlayer);

          return {
            board,
            currentPlayer: nextPlayer,
            moves: context.moves + 1, 
          };
        } else {
          console.error("Square already taken at index:", event.index);
          return context;
        }
      }),

      resetGame: assign({
        board: Array(9).fill(null),
        currentPlayer: "X",
        winner: null,
        winningLine: null,
        moves: 0,
      }),

      logWin: () => {
        console.log("Action: logWin triggered");
        console.log("A player has won!");
      },

      logDraw: () => {
        console.log("Action: logDraw triggered");
        console.log("The game is a draw.");
      },
    },

    guards: {
      checkWinCondition: (context) => {
        console.log("Guard: checkWinCondition triggered");
        console.log("Context:", context);

        const winPatterns = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        const win = winPatterns.some((pattern) =>
          pattern.every(
            (index) => context.board[index] === context.currentPlayer
          )
        );

        console.log("Win condition met:", win);
        return win;
      },

      checkDrawCondition: (context) => {
        console.log("Guard: checkDrawCondition triggered");
        console.log("Context:", context);

        const draw = context.board.every((square) => square !== null);
        console.log("Draw condition met:", draw);
        return draw;
      },
    },
  }
);

export default ticTacToeMachine;
