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
  return getToken().then((token) => {
    return fetch(videoWithCommentsEndpoint, {
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


export const searchVideos = (searchText) => {
  return getToken().then((token) => {
    return fetch(searchVideosEndpoint + "/?q=" + searchText + "&sortDesc=true", {
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


export const getVideo = (id) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/GetVideoByIdWithComments?id=${id}`, {
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


export const getUserVideos = (id) => {
  return getToken().then((token) => {
    return fetch(`/api/UserProfile/${id}`, {
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
}

export const addVideo = (video) => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(video),
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else if (res.status === 401) {
      throw new Error("Unautherized");
    } else {
      throw new Error("An unkown error ocured while trying to get quotes.");
    }
    })
  });
};
