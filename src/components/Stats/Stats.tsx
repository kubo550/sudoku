import { useEffect } from "react";
import { ARROWS } from "../../utils/play";
import * as S from "./Stats.style";

const Stats = () => {
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
        Auto-Ceck For Mistakes
        <input type='checkbox' />
      </div>

      <div>00:00</div>
    </S.Wrapper>
  );
};

export default Stats;
