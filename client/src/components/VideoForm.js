import React, { useRef } from "react";
import { Button, Form, FormGroup, Label} from "reactstrap";
import { addVideo } from "../modules/videoManager";

export const VideoForm = ({getVideos}) => {
  const videoTitle = useRef();
  const videoUrl = useRef();
  const videoDescription = useRef();

  const handleAddVideo = () => {
    const newVideoObj = {
      Title: videoTitle.current.value,
      Url: videoUrl.current.value,
      Description: videoDescription.current.value,
    };

    addVideo(newVideoObj).then(getVideos);
  };

  return (
    <>
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <input
            type="title"
            name="title"
            id="title"
            placeholder="video title"
            ref={videoTitle}
          />
        </FormGroup>
        <FormGroup>
          <Label for="url">Url</Label>
          <input
            type="url"
            name="url"
            id="url"
            placeholder="youtube url"
            ref={videoUrl}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <input
            type="description"
            name="description"
            id="description"
            placeholder="what's this about?"
            ref={videoDescription}
          />
        </FormGroup>
        <Button onClick={handleAddVideo}>Submit</Button>
      </Form>
    </>
  );
};
