import React, { useEffect, useState, useRef } from "react";
import Video from "./Video";
import {
  getAllVideos,
  getAllVideosWithComments,
  searchVideos,
} from "../modules/videoManager";
import { VideoForm } from "./VideoForm";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  //   const [refresh, setRefresh] = useState(false);

  const getVideos = () => {
    getAllVideosWithComments().then((videos) => setVideos(videos));
  };

  useEffect(() => {
    getVideos();
  }, []);

  const VideoSearch = () => {
    let textInput = useRef();

    const handleSearch = () => {
      console.log(textInput.current.value);
      searchVideos(textInput.current.value).then((searchResults) =>
        setVideos(searchResults)
      );
    };

    return (
      <>
        <input ref={textInput} type="text"></input>
        <button onClick={handleSearch}>Search Videos</button>
      </>
    );
  };

  return (
    <>
      <div>
        <div>Seach Videos</div>
        <p>
          <VideoSearch />
        </p>
      </div>
      <div>
        <div>Add Video</div>
        <p>
          <VideoForm getVideos={getVideos} />
        </p>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {videos.map((video) => (
            <Video video={video} key={video.id} />
          ))}
          {console.log(videos)}
        </div>
      </div>
    </>
  );
};

export default VideoList;
