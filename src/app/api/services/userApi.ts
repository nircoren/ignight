import { api } from "../configs/axiosConfigs";
// import { defineCancelApiObject } from "../configs/axiosUtils";

// Need to update all endpoints and move this to boilerplate
// const youtubeEndpoint = '/api/youtube'
export const userApi = {
  user: async function (cancel = false) {
    const response = await api.request({
      url: `/user/`,
      method: "get",
      withCredentials: true,
      // retrieving the signal value by using the property name
    });
    // returning the product returned by the API
    return response.data;
  },
};

// defining the cancel API object for youtubeApi
// const cancelApiObject = defineCancelApiObject(authApi);
