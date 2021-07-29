import { FC, useEffect } from "react";
import { ARROWS } from "../../utils/play";
import * as S from "./Stats.style";

interface StatsProps {
  time: string;
  isCounting: boolean;
  startCount: () => void;
  stopCount: () => void;
}

const Stats: FC<StatsProps> = ({ startCount, isCounting, stopCount, time }) => {
  const disableScroll = (e: KeyboardEvent) => {
    if ([...ARROWS, "Space"].includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", disableScroll);

    return () => window.removeEventListener("keydown", disableScroll);
  }, []);

  return (
    <S.Wrapper>
      <div>
        Difficulty:
        <select>
          <option value='easy'>easy</option>
          <option value='medium'>medium</option>
          <option value='hard'>hard</option>
        </select>
      </div>

      <div>
        Auto-Ceck<span id='auto-check'> For Mistakes </span>
        <input type='checkbox' />
      </div>

      <div>
        {time} {isCounting && <button onClick={stopCount}> || </button>}
        {!isCounting && <button onClick={startCount}> &gt; </button>}
      </div>
    </S.Wrapper>
  );
};

export default Stats;
