import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Video = ({ video }) => {
  return (
    <Card>
      <p className="text-left px-2">Posted by:<Link to={`/users/${video.userProfile?.id}`}> {video.userProfile?.name} </Link></p>
      <CardBody>
        <iframe
          className="video"
          src={video.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <div>
        <Link to={`/videos/${video.id}`}>
          <strong>{video.title}</strong>
        </Link>
        </div>
        <p>{video.description}</p>

        <p>
          <strong>Comments</strong>
        </p>

        {video.comments?.length !== 0 ? (
          video.comments?.map((c) => <p>{c.message}</p>)
        ) : (
          <div> No Comments </div>
        )}
      </CardBody>
    </Card>
  );
};

export default Video;
