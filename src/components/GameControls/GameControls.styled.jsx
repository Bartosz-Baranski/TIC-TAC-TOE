import styled from "styled-components";

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const Message = styled.p`
  font-size: 42px;
  font-weight: bold;

  margin: 10px 0;
`;

export const ResetButton = styled.button`
  appearance: none;
  font-size: 1.5rem;
  border: solid 0.2rem;
  border-radius: 0.5rem;
  color: #000000f0;
  background: #afe5d5;
  padding: 0.5rem 2rem;
  text-transform: uppercase;
  margin-top: 1rem;
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 100;
`;
