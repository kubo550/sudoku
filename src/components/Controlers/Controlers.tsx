import { FC } from "react";
import * as S from "./Controlers.style";

interface ControlersProps {
  erase: () => void;
  hint: () => void;
  typeNumber: (value: number) => void;
}

const Controlers: FC<ControlersProps> = ({ erase, hint, typeNumber }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <S.Wrapper>
      <button> NEW GAME </button>
      <div className='buttons'>
        <button>back</button>
        <button onClick={erase}>remove</button>
        <button onClick={hint}>hint</button>
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
