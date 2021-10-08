import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import Video from "./Video";
import { getVideo } from "../modules/videoManager";

export const VideoDetails = () => {
  const [video, setVideo] = useState();
  const { id } = useParams();

  useEffect(() => {
    getVideo(id).then(setVideo);
  }, []);

  if (!video) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
            {console.log(video)}
          <Video video={video} key={video.id}/>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
