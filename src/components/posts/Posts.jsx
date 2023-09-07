import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostsContext } from "../../context/PostsContext";
import Spinner from "../../utills/Spinner";

const Posts = () => {
  const { isLoading, getAllPosts, posts, deletePost } = useContext(PostsContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <section className="container-fluid gradient-custom " style={{ paddingTop: "8rem" }}>
      <div className="container">
        <div className="row py-4 d-flex justify-content-start align-items-center">
          {isLoading ? (
            <Spinner />
          ) : posts.length > 0 ? (
            posts
              ?.slice(0)
              .reverse()
              .map((post) => (
                <div key={post._id} className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4">
                  <div className="card post-card  border-0 shadow ">
                    <h6 className="card-header  card-color border-0">
                      <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle me-3 avatar" style={{ width: "50px" }} alt="Avatar" />
                      {post.fullName}
                    </h6>
                    <div className="card-body card-color">
                      <p className="card-text">{post.postTitle}</p>
                    </div>
                    <div className="card-footer card-color border-0 d-flex justify-content-end">
                      <div className="">
                        <Link to={`/post/${post._id}`} replace={true}>
                          <i className="bi bi-eye text-info large-icon icon-hover" title="view post"></i>
                        </Link>

                        <i className="bi bi-trash3 text-danger large-icon icon-hover" title="remove post" onClick={() => deletePost(post._id)}></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-white text-center h1">No Post Found!</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Posts;
