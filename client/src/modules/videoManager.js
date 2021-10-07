const baseUrl = "/api/video";

export const getAllVideos = () => {
  return fetch(baseUrl).then((res) => res.json());
};

export const videoWithCommentsEndpoint = baseUrl + "/GetWithComments";

export const searchVideosEndpoint = baseUrl + "/search";

export const getAllVideosWithComments = () => {
  return fetch(videoWithCommentsEndpoint).then((res) => res.json());
};

export const searchVideos = (searchText) => {
  return fetch(
    searchVideosEndpoint + "/?q=" + searchText + "&sortDesc=true"
  ).then((res) => res.json());
};

export const addVideo = (video) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(video),
  });
};
