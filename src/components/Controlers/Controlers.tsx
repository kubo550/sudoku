import { FC } from "react";
import { Value } from "../../types";
import * as S from "./Controlers.style";

interface ControlersProps {
  erase: () => void;
  hint: () => void;
  typeNumber: (value: number) => void;
  newGame: () => void;
  completedNums: Value[];
}

const Controlers: FC<ControlersProps> = ({
  erase,
  hint,
  typeNumber,
  newGame,
  completedNums,
}) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <S.Wrapper>
      <button onClick={newGame}> NEW GAME </button>
      <div className='buttons'>
        <div title='back'>back</div>
        <div title='Or press Backspace key' onClick={erase}>
          remove
        </div>
        <div title="Or press 'h' key" onClick={hint}>
          hint
        </div>
      </div>
      <div className='numbers'>
        {numbers.map(num => {
          const isHidden = completedNums.includes(num);

          return (
            <S.NumberBtn
              key={num}
              hidden={isHidden}
              onClick={isHidden ? () => {} : () => typeNumber(num)}
            >
              {num}
            </S.NumberBtn>
          );
        })}
      </div>
    </S.Wrapper>
  );
};

export default Controlers;
