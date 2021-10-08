import React, { useEffect, useState, useRef } from "react";
import Video from "./Video";
import {
  getAllVideosWithComments,
  searchVideos,
} from "../modules/videoManager";
import { VideoForm } from "./VideoForm";

export const VideoList = () => {
  const [videos, setVideos] = useState([]);
 

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
        <h3>Seach Videos</h3>
        <input ref={textInput} type="text"></input>
        <button onClick={handleSearch}>Search Videos</button>
      </>
    );
  };

  return (
    <>
      <div>
        <VideoSearch />
      </div>
      <div>
        {/* <VideoForm getVideos={getVideos} /> */}
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
