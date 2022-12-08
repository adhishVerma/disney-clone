import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Pixar = () => {
  const [moviesData, setMoviesData] = useState(null);

  let windowSmall = window.matchMedia("(max-width : 768px)");

  const screenCheck = () => {
    if (windowSmall.matches) {
      return true;
    } else {
      return false;
    }
  };

  const ifPoster = screenCheck();

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_companies=3&with_watch_monetization_types=flatrate`
      );
      const data = response.data;
      setMoviesData(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Container>
      <h3>Movies on Pixar</h3>
      <Content>
        {moviesData?.map((item) => {
          return (
            <Wrap key={item.id}>
              <h3>{item.title || item.original_title} </h3>
              <h3>{item.name}</h3>
              <Link to={`/detail/movie/${item.id}`}>
                <img
                  src={
                    ifPoster
                      ? `https://image.tmdb.org/t/p/w300/${item.poster_path}`
                      : `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                  }
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
  margin-top: 72px;
  min-height: calc(100vh - 250px);
  position: relative;
  overflow-x: hidden;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

const Content = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-bottom: 3vw;

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
    min-height: 290px;
    h3 {
      display: none;
    }
  }
`;
