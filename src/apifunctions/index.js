import axios from "axios";
import { api } from "../api";

export const GET_POSTS = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}${api.getPosts}`)
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res.error);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const GET_POST = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}${api.getPost}${id}`)
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res.error);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const CREATE_POST = (post) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}${api.createPost}`, post)
      .then((res) => {
        if (res.status === 201) {
          resolve(res);
        } else {
          reject(res.error);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const UPDATE_POST = (post, id) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${import.meta.env.VITE_BASE_URL}${api.updatePost}${id}`, post)
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res.error);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const DELETE_POST = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_BASE_URL}${api.deletePost}${id}`)
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res.error);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
