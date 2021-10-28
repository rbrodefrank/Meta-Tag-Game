import axios from "axios";
const base = "/api/";

export default {
  //Tag Routes
  getTags: function (id) {
    return axios.get(`${base}tags/tag/${id}`);
  },
  getAllTagInfo () {
    return axios.get(`${base}tags/`);
  },
  getAllTagInfoByID (id) {
    return axios.get(`${base}tags/${id}`);
  },
  incrementAccepted(data) {
    return axios.put(`${base}tags/accepted/`, data);
  },
  incrementRejected(data) {
    return axios.put(`${base}tags/rejected/`, data);
  },

  //Image Routes
  getImages () {
    return axios.get(`${base}images/`);
  },

  //UserTag Routes
  getUserTags () {
    return axios.get(`${base}userTags`);
  },
  createUserTag (data) {
    return axios.post(`${base}userTags`, data);
  }
}