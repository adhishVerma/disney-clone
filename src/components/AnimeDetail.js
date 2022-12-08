import styled from "styled-components";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AnimeRecommends from "./AnimeRecommends";
import useUser from "../functions/Store";
import { db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const AnimeDetail = (props) => {
  const userState = useUser.getState().user;
  const { id } = useParams();
  const [watchlist, updateWatchlist] = useState([]);
  const [watched, setWatched] = useState(false);
  const [detailData, setDetailData] = useState({
    coverImage: "",
    title: "",
    genres: [],
    startDate: {},
  });
  const [recommends, setRecommends] = useState(null);

  const getWatchlist = async () => {
    const docRef = doc(db, "users", userState.uid);
    const docSnap = await getDoc(docRef);
    const watchData = docSnap.data();
    updateWatchlist(watchData.anime);
    setWatched(watchData.anime.includes(id));
  };

  const addToWatchlist = async () => {
    const docRef = doc(db, "users", userState.uid);
    await updateDoc(docRef, {
      anime: [id, ...watchlist],
    });
    setWatched(true);
  };

  const removeFromWatchlist = async () => {
    const docRef = doc(db, "users", userState.uid);
    const data = {
      anime: watchlist.filter((item) => item !== id),
    };
    await updateDoc(docRef, data);
    setWatched(false);
  };

  const getData = async () => {
    let query = `query{
        Media(id: ${id}) {
          id
          title {
            english
          }
          coverImage {
            medium
            large
          }
          bannerImage
        description
        trailer {
          id
        }
        episodes
        genres
        startDate {
          year
        }
        recommendations(perPage:4) {
          nodes {
            mediaRecommendation {
              id
              title {
                english
              }
              coverImage {
                large
                medium
              }
              bannerImage
            }
          }
        }
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
    const data = response.data.data.Media;
    const recommendData = data.recommendations.nodes.map((item) => {
      return {
        id: item.mediaRecommendation.id,
        title: item.mediaRecommendation.title.english,
        coverImage: item.mediaRecommendation.coverImage.large,
        bannerImage: item.mediaRecommendation.bannerImage,
      };
    });
    setDetailData(data);
    setRecommends(recommendData);
  };

  useEffect(() => {
    if (userState) {
      getWatchlist();
    }
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Background>
        <img alt="" src={detailData.bannerImage} />
      </Background>

      <ImageTitle>
        <img alt="" src={detailData.coverImage.large} />
        <Title>
          {detailData.title.english}
          <Homepage>{detailData.homepage}</Homepage>
          <Genre>
            <span>Genres: </span>
            {detailData.genres?.map((genre) => {
              return (
                <span
                  key={detailData.genres.indexOf(genre)}
                >{`${genre}, `}</span>
              );
            })}
          </Genre>
        </Title>
      </ImageTitle>

      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>
          <a
            href={
              detailData.trailer
                ? `https://www.youtube.com/watch?v=${detailData.trailer.id}`
                : ""
            }
          >
            <Trailer>
              <img src="/images/play-icon-white.png" alt="" />
              <span>Trailer</span>
            </Trailer>
          </a>{userState && <div>
          {!watched && (
            <AddList onClick={addToWatchlist}>
              <span>
                <img src="/images/watchlist-icon.svg" alt="add-icon" />
              </span>
            </AddList>
          )}
          {watched && (
            <RemoveList onClick={removeFromWatchlist}>
              <span>
                <img src="/images/watchlist-icon.svg" alt="remove-icon" />
              </span>
            </RemoveList>
          )}</div>}
        </Controls>
        <Subtitle>
          {detailData.startDate.year &&
            `Release year: ${detailData.startDate.year}`}
        </Subtitle>
        <Description
          dangerouslySetInnerHTML={{ __html: detailData.description }}
        ></Description>
      </ContentMeta>
      <AnimeRecommends data={recommends} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0;
  opacity: 0.3;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
  margin-top: 5vw;
  height: 30vw;
  min-height: 300px;
  padding-bottom: 24px;
  width: 100%;
  max-height: 300px;
  display: flex;

  img {
    min-width: 200px;
    width: 10vw;
    max-height: 300px;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  margin: 24px 0px;
  min-height: 56px;
  display: flex;
  align-items: center;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0 22px 0 0;
  padding: 0 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 12px;
    font-size: 12px;
    margin: 0 18px 0 0;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);

  &:hover {
    background: rgb(22, 22, 22);
  }
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid rgb(249, 249, 249);
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Subtitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768x) {
    font-size: 12px;
  }
`;
const Description = styled.div`
  color: rgb(249, 249, 249);
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Title = styled.div`
  top: 0px;
  left: 0px;
  margin-left: 15px;
  font-size: 24px;
`;

const Homepage = styled.div`
  font-size: 15px;
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  &:hover {
    color: rgb(200, 211, 222);
    cursor: pointer;
  }
`;

const Genre = styled.div`
  font-size: 15px;
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const RemoveList = styled(AddList)`
  img {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export default AnimeDetail;
