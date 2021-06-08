import styled from "styled-components";

interface CellProps {
  readonly: boolean;
  borderTop: boolean;
  borderLeft: boolean;
  isHover: boolean;
  isCorrect: boolean;
  isCurrentSpot: boolean;
  isHighlightedNum: boolean;
}

export const Cell = styled.div<CellProps>`
  border: 1px inset black;
  border-top: ${({ borderTop }) => borderTop && "3px inset black"};
  border-left: ${({ borderLeft }) => borderLeft && "3px inset black"};
  color: ${({ readonly, isCorrect }) =>
    readonly ? "#000" : isCorrect ? "blue" : "red"};
  background-color: ${({ isHover, isCurrentSpot, isHighlightedNum }) => isCurrentSpot ? 'rgba(0, 0, 0, 0.35)' : isHighlightedNum ? "rgba(0,132,0,0.25)" : isHover ? "rgba(0,0,0,0.15)" : ''};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  width: 35px;
  height: 35px;
  font-size: 1.3rem;

  @media (min-width: 620px) {
    width: 50px;
    height: 50px;
    font-size: 1.9rem;
  }

`;