import styled from "styled-components";

export const BoardContainer = styled.div`
  display: grid;
  --line-size: 1vmin;
  grid-template-rows: 1fr var(--line-size) 1fr var(--line-size) 1fr;
  grid-template-columns: 1fr var(--line-size) 1fr var(--line-size) 1fr;
  padding: 3vmin;
  border-radius: 1.5vmin;

  width: 50vmin;
  height: 50vmin;

  background-color: #9caa9d;
  box-shadow: -3vmin 1vmin 6vmin #bc0b0b;

  /* transform: rotateX(45deg) rotateZ(-45deg);
  transform-style: preserve-3d; */

  &[data-state="playing"] .tile:not([data-player]) {
    cursor: pointer;
  }

  &[data-state="playing"] .tile:not([data-player]):hover,
  &[data-state="playing"] .tile:not([data-player]):focus {
    background: #fff6;
  }

  &[data-state="draw"] {
    --line: #d9422c;
  }

  &[data-state="winner"] {
    --line: #86ea30;
  }

  &[data-state="winner"] .tile {
    opacity: 0.2;
  }

  &[data-state="winner"] .tile[data-winning="true"] {
    opacity: 1;
  }
`;

export const SquareButton = styled.button`
  display: grid;
  place-items: center;
  font-size: 12vmin;
  line-height: 1;
  color: transparent;
  user-select: none;

  transition: 0.15s linear;
  transition-property: opacity, background-color;
  position: relative;

  &::before,
  &::after {
    content: attr(data-player);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    animation-duration: 0.6s;
    animation-timing-function: ease-out;
    transform-style: preserve-3d;
  }

  &::before {
    text-shadow: 0 0 0.1em #bc0b0b;
  }

  &[data-player]::before {
    animation-name: shadow-in;
  }

  @keyframes shadow-in {
    from {
      opacity: 0;
      transform: scale(0);
    }
  }

  &[data-player]::after {
    color: black;
    text-shadow: 0 0 0.1em #bc0b0b;
    animation-name: tile-in;
    transform: translateZ(3px) scale(1);
  }

  @keyframes tile-in {
    from {
      opacity: 0;
      transform: translateZ(80px) scale(1.25);
    }
  }

  &[data-player="o"]::after {
    color: white;
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 100%;
  background: var(--line);
  border-radius: var(--line-size);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
  transform: translateZ(1px);
  transition: background-color 0.3s linear;

  &[data-line="0"] {
    grid-column: 2;
    grid-row: 1 / -1;
  }

  &[data-line="1"] {
    grid-column: 4;
    grid-row: 1 / -1;
  }

  &[data-line="2"] {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  &[data-line="3"] {
    grid-column: 1 / -1;
    grid-row: 4;
  }
`;
