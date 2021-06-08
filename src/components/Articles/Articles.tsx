import * as S from "./Articles.style";
import articles from "./data";

const Articles = () => {
  return (
    <S.Wrapper>
      {articles.map(article => (
        <article key={article.id}>
          <h3> {article.title} </h3>
          <p> {article.content} </p>
        </article>
      ))}
    </S.Wrapper>
  );
};

export default Articles;
