import styled from "styled-components";
import { Link } from "react-router-dom";


const Trending = (props) => {
  const trending = props.data 

  let windowSmall = window.matchMedia(("(max-width : 768px)"))

  const screenCheck = () => {if (windowSmall.matches) {
    return true
  }else {
    return false
  }}

  const ifSmall = screenCheck()


  return (
    <Container>
      <h4>Trending this week</h4>
      <Content>
        {     
        trending?.map((item) => {
          return (
            <Wrap key={item.id}>
              <h3>{item.title || item.original_title} </h3>
              <h3>{item.name}</h3>
              <Link to={`/detail/${item.media_type}/${item.id}`}>
                <img
                  src={ifSmall?`https://image.tmdb.org/t/p/w300/${item.poster_path}`:`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                  alt=""
                />
              </Link>
            </Wrap>
          );
        })}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
`;
const Content = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  h3 {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    bottom: -15px;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 0px;
  }

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    filter: opacity(0.6);
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
    right: 0;
    left: 0;

    &:hover {
      filter: opacity(1);
    }
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }

  @media (max-width: 768px) {
    min-height: 240px;
    h3 {
      display: none;
    }
  }
`;

export default Trending;
