import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { getUserVideos } from "../modules/videoManager";
import { Video } from "./Video";

export const UserVideos = () => {
  const [userVideos, setuserVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getUserVideos(id).then(setuserVideos);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          {userVideos.videos?.map((video) => (
            <Video video={video} key={video.id} />
          ))}
          {console.log(userVideos.videos)}
        </div>
      </div>
    </>
  );
};
