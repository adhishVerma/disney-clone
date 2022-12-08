import React from "react";
import styled from "styled-components";
import useUser from "../functions/Store";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import axios from "axios";
import DisplayList from "./DisplayList";

export const WatchList = () => {
  const userState = useUser.getState().user;
  const [movieList, updateMovieList] = useState([]);
  const [tvList, updateTvList] = useState([]);
  const [anime, updateAnime] = useState([]);

  const getUserData = async () => {
    // eslint-disable-next-line
    const unsub = onSnapshot(doc(db, "users", userState.uid), (doc) => {
      const data = doc.data();
      updateList("movie", data.movie);
      updateList("tv", data.tv);
      updateList("anime", data.anime);
    });

    const updateList = async (type, list) => {
      if (type === "movie") {
        for (const id of list) {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API}`
            );
            const itemData = response.data;
            updateMovieList((prevState) => [...prevState, itemData]);
          } catch (err) {
            console.log(err);
          }
        }
      } else if (type === "tv") {
        for (const id of list) {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API}`
            );
            const itemData = response.data;
            updateTvList((prevState) => [...prevState, itemData]);
          } catch (err) {
            console.log(err);
          }
        }
      } else if (type === "anime") {
        for (const id of list) {
          const query = `query{
            Media(id:${id}) {
              id
              title {
                english
              }
              coverImage {
                large
              }
              bannerImage
          }
    }`;
          let url = "https://graphql.anilist.co";
          let variables = {
            id: Number(id),
          };
          const response = await axios.post(url, {
            query: query,
            variables: variables,
          });
          const itemData = response.data.data.Media;
          updateAnime((prevState) => [
            ...prevState,
            {
              id: itemData.id,
              title: itemData.title.english,
              coverImage: itemData.coverImage.large,
              bannerImage: itemData.bannerImage,
            },
          ]);
        }
      }
    };
  };

  useEffect(() => {
    getUserData()
  
    return () => {
      updateMovieList([]);
      updateTvList([]);
      updateAnime([]);
    }
    // eslint-disable-next-line
  }, [userState])
  


  return (
    <Container>
      <DisplayList type="movie" data={movieList} />
      <DisplayList type="tv" data={tvList} />
      <DisplayList type="anime" data={anime} />
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
