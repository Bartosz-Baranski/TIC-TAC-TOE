import React from "react";
import { useMachine } from "@xstate/react";

import ticTacToeMachine from "./machine/ticTacToeMechanics.js";
import Board from "./components/Board/Board.jsx";
import GameControls from "./components/GameControls/GameControls.jsx";

import { AppContainer, Title } from "./App.styled.jsx";

function App() {
  const [state, send] = useMachine(ticTacToeMachine, { devTools: true });

  React.useEffect(() => {
    console.log("Current state:", state.toJSON());
  }, [state]);

  const handleSend = (event) => {
    console.log("Sending event:", event);
    send(event);
  };

  return (
    <AppContainer>
      <Title>Tic-Tac-Toe</Title>
      <Board state={state} send={handleSend} />
      <GameControls state={state} send={handleSend} />
    </AppContainer>
  );
}

export default App;
