import { inspect } from "@xstate/devtools";
import ticTacToeMachine from "../machine/ticTacToeMechanics.js";

inspect({
  id: "ticTacToeMachine",
  machine: ticTacToeMachine,
  // Opcjonalnie możesz dodać inne opcje
});
