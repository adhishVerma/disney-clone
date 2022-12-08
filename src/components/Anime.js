import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

export const Anime = () => {
  const [anime, updateAnime] = useState(null);

  let windowLarge = window.matchMedia(("(max-width : 768px)"))

  const screenCheck = () => {if (windowLarge.matches) {
    return true
  }else {
    return false
  }}

  const ifPoster = screenCheck()

  const getAnime = async () => {
    let query = `query($perPage: Int){
        Page(perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
          }
          media(type: ANIME, sort: TRENDING_DESC) {
            id
            title {
              english
            }
            coverImage {
              large
            }
            bannerImage
          }
        }
      }`;

    // Define our query variables and values that will be used in the query request
    let variables = {
      perPage: 16,
    };

    // Define the config we'll need for our Api request
    let url = "https://graphql.anilist.co";

    const response = await axios.post(url, {
      query: query,
      variables: variables,
    });

    if (response.status === 200) {
      const animeList = response.data.data.Page.media;
      updateAnime(animeList);
    }
  };

  useEffect(() => {
    getAnime();
  }, []);

  return (
    <Container>
      <h4>Trending Anime</h4>
      <Wrapper>
        <Content>
          {anime?.map((item) => {
            return (
              <Link to={`/anime/${item.id}`} reloadDocument>
                <Wrap>
                  <img src={ifPoster? item.coverImage.large : item.bannerImage? item.bannerImage : item.coverImage.large} alt="" />
                  <h3>{item.title.english}</h3>
                </Wrap>
              </Link>
            );
          })}
        </Content>
      </Wrapper>
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

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrapper = styled.div`
  padding: 0 0 26px;
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

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    filter: opacity(0.6);
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;

    &:hover{
      filter: opacity(0.8);
    }    
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    
  }

  @media (max-width: 768px) {
    min-height: 256px;
  }

  h3 {
    z-index: 2;
    letter-spacing: 1.02px;
    position: absolute;
    margin-left: 2px;
    bottom: 2px;
    left: 2px;
    right: 2px;
  }
`;
