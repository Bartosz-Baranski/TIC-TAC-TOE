import styled from "styled-components";

export const BoardContainer = styled.div`
  --line-size: 1vmin;
  --line-color: grey;
  --line-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);

  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  padding: 3vmin;
  border-radius: 1.5vmin;
  width: 50vmin;
  height: 50vmin;
  gap: 2vmin;

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
    background-color: #d9422c;
  }

  &[data-state="winner"] {
    background-color: #86ea30;
  }

  &[data-state="winner"] .tile {
    opacity: 0.2;
  }

  &[data-state="winner"] .tile[data-winning="true"] {
    opacity: 1;
  }
`;

export const Line = styled.div`
  position: absolute;
  background: var(--line-color);
  border-radius: var(--line-size);
  box-shadow: var(--line-shadow);
  transform: translateZ(1px);
  transition: background-color 0.3s linear;
  z-index: 1;

  /* Linie pionowe */
  &[data-line="0"] {
    width: var(--line-size);
    height: 88%;
    top: 6%;
    left: 33.5%;
    /* left: calc(
      33.33% + 0.2vmin
    ); Ustawienie linii w poziomie w środku kolumny, uwzględniając gap */
  }

  &[data-line="1"] {
    width: var(--line-size); /* Grubość linii */
    height: 88%;
    top: 6%;
    left: 64.5%;
    /* calc(
      66.66% + 0.5vmin
    ); Ustawienie linii w poziomie w środku kolumny, uwzględniając gap */
  }

  /* Linie poziome */
  &[data-line="2"] {
    width: 88%;
    height: var(--line-size); /* Grubość linii */
    top: 33.7%;
    /* calc(
      33.33% + 0.5vmin
    ); Ustawienie linii w pionie w środku wiersza, uwzględniając gap */
    left: 6%;
  }

  &[data-line="3"] {
    width: 88%;
    height: var(--line-size); /* Grubość linii */
    top: 64.5%;

    /* calc(
      66.66% + 0.5vmin
    ); Ustawienie linii w pionie w środku wiersza, uwzględniając gap */
    left: 6%;
  }
`;
