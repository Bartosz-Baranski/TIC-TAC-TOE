import React from "react";

import { Message, ControlsContainer, ResetButton } from "./GameControls.styled";
const GameControls = ({ state, send }) => {
  const { currentPlayer } = state.context;

  return (
    <ControlsContainer>
      <Message>Current player: {currentPlayer}</Message>
      <ResetButton onClick={() => send({ type: "RESET" })}>
        Reset Game
      </ResetButton>
      {state.matches("won") && (
        <Message>Player {currentPlayer === "X" ? "O" : "X"} wins!</Message>
      )}
      {state.matches("draw") && <Message>It's a draw!</Message>}
    </ControlsContainer>
  );
};

export default GameControls;
