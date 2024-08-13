import React from "react";
import { SquareButton } from "./PlayField.styled.jsx";

const PlayField = ({ content, onClick, isWinningSquare }) => {
  return (
    <SquareButton
      onClick={onClick}
      data-player={content}
      data-winning={isWinningSquare || undefined}
      disabled={Boolean(content)}
      aria-disabled={Boolean(content)}
      aria-label={`Playfield ${content ? content : "empty"}`}
    >
      {content}
    </SquareButton>
  );
};

export default PlayField;
