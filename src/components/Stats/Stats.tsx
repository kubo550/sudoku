import * as S from "./Stats.style";

const Stats = () => {
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
