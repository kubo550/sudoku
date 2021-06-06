import styled from "styled-components";

interface CellProps {
    readonly: boolean;
    borderTop: boolean;
    borderLeft: boolean;
    isHover: boolean;
    isCorrect: boolean;
}

export const Cell = styled.div<CellProps>`
  width: 50px;
  height: 50px;
  border: 1px inset black;
  border-top: ${({ borderTop }) => borderTop && "3px inset black"};
  border-left: ${({ borderLeft }) => borderLeft && "3px inset black"};
  color: ${({ readonly, isCorrect }) =>
        readonly ? "#000" : isCorrect ? "green" : "red"};
  background-color: ${({ isHover }) => isHover && "rgba(0,0,0,0.3)"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.9rem;
  user-select: none;
`;