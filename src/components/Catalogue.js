import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import React from "react";
import CatalogueDisplay from "./CatalogueDisplay";

const Catalogue = (props) => {
  const { id } = useParams();
  const [moviesData, setMoviesData] = useState(null);
  const [tvData, setTVData] = useState(null);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API}&with_keywords=${id}`
      );
      const data = response.data;
      setMoviesData(data.results);
    } catch (err) {
      console.log(err)
    }
  }

  const getTV = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API}&with_keywords=${id}`
      );
      const data = response.data;
      setTVData(data.results);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMovies();
    getTV();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <CatalogueDisplay type="movie" data={moviesData} />
      <CatalogueDisplay type="tv" data={tvData} />
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

export default Catalogue;
