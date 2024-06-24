import { api } from "../configs/axiosConfigs";
// import { defineCancelApiObject } from "../configs/axiosUtils";

// Need to update all endpoints and move this to boilerplate
// const youtubeEndpoint = '/api/youtube'
const apiKey = process.env.YOUTUBE_API_KEY;
const maxResults = 20;
// let apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&maxResults=${maxResults}&order=relevance&part=snippet&videoId=${video_id}`;

export const youtubeApi = {
  user: async function (cancel = false) {
    const response = await api.request({
      url: `/user/`,
      method: "get",
      // retrieving the signal value by using the property name
    });
    // returning the product returned by the API
    return response.data;
  },
};

// defining the cancel API object for youtubeApi
// const cancelApiObject = defineCancelApiObject(authApi);