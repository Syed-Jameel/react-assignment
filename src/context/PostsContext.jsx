import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { GET_POSTS, GET_POST, DELETE_POST } from "../apifunctions/index";

export const PostsContext = createContext();

const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //GET ALL Posts
  const getAllPosts = () => {
    setIsLoading(true);
    setTimeout(() => {
      GET_POSTS()
        .then((response) => {
          setPosts(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Somthing went worng in getAllPosts", error);
          setIsLoading(false);
        });
    }, 300);
  };

  //GET Specific Post
  const getSpecificPost = (postId) => {
    setIsLoading(true);
    setTimeout(() => {
      GET_POST(postId)
        .then((response) => {
          setPost(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Somthing went worng in getSpecificPost", error);
          setIsLoading(false);
        });
    }, 300);
  };

  //Delete post
  const deletePost = (postId) => {
    setIsLoading(true);
    setTimeout(() => {
      DELETE_POST(postId)
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false);
            getAllPosts();
            toast.success(`${response.data}`);
          } else {
            toast.error("post not found❗");
          }
        })
        .catch((error) => {
          console.log("Somthing went worng in deletePost", error);
        });
    }, 300);
  };

  const postsData = {
    isLoading,
    setIsLoading,
    getAllPosts,
    posts,
    getSpecificPost,
    post,
    setPost,
    deletePost,
  };
  return <PostsContext.Provider value={postsData}>{children}</PostsContext.Provider>;
};

export default PostsContextProvider;
