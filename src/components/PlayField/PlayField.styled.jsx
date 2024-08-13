import styled from "styled-components";

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
