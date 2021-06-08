import { FC } from "react";
import * as S from "./Controlers.style";

interface ControlersProps {
  erase: () => void;
  hint: () => void;
  typeNumber: (value: number) => void;
  newGame: () => void;
}

const Controlers: FC<ControlersProps> = ({
  erase,
  hint,
  typeNumber,
  newGame,
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
        {numbers.map(num => (
          <div key={num} onClick={() => typeNumber(num)}>
            {num}
          </div>
        ))}
      </div>
    </S.Wrapper>
  );
};

export default Controlers;
