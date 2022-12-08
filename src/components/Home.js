import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Popular from "./Popular";
import Trending from "./Trending";
import Viewers from "./Viewers";
import axios from "axios";

const Home = (props) => {
  const [trending, setTrending] = useState(null);
  const [popular, setPopular] = useState(null);

  const getTrending = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_TMDB_API}`
      );
      const trendingData = response.data;
      setTrending(trendingData.results.slice(0, 8));
    } catch (err) {
      console.log(err);
    }
  };
  
  const getPopular = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&page=1`
      );
      const popularData = response.data;
      setPopular(popularData.results.slice(0, 8));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTrending();
    getPopular();
  }, []);


  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Popular data={popular} type="movie"/>
      <Trending data={trending} />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
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

export default Home;
