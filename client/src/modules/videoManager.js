import { getToken } from "./authManager";

const baseUrl = "/api/video";

export const getAllVideos = () => {
  return getToken().then((token) => {
  return fetch(baseUrl, {
    method: "Get",
    headers :{
      Authorization : `Bearer ${token}`
    }
  }).then((res) => {
    if (res.ok){
      return res.json();
    } else{ 
      throw new Error("An unkown error ocured while trying to get quotes.");
    }
  })
})
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

export const getVideo = (id) => {
    return fetch(`${baseUrl}/GetVideoByIdWithComments?id=${id}`).then((res) => res.json());
};

export const getUserVideos = (id) => {
  return fetch(`/api/UserProfile/${id}`).then((res) => res.json())
}

export const addVideo = (video) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(video),
  });
};
