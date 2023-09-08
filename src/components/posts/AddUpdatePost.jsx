import React, { useContext, useEffect, useId } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PostsContext } from "../../context/PostsContext";
import Spinner from "../../utills/Spinner";
import { CREATE_POST, UPDATE_POST } from "../../apifunctions/index";
import { toast } from "react-toastify";

const AddUpdatePost = () => {
  const id = useId();
  const params = useParams();
  const paramsId = Boolean(params.id);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { isLoading, setIsLoading, getSpecificPost, post, setPost, getAllPosts } = useContext(PostsContext);

  useEffect(() => {
    if (paramsId) {
      getSpecificPost(params.id);
    } else {
      reset();
    }
  }, [params.id]);

  //Create Post
  const createPost = (post) => {
    setIsLoading(true);
    setTimeout(() => {
      CREATE_POST(post)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            getAllPosts();
            setIsLoading(false);
            navigate("/");
            toast.success(`${response.data}👍`);
          }
        })
        .catch((error) => {
          toast.warn(`${error.data}❗`);
          setIsLoading(false);
        });
    }, 300);
  };

  //UPDATE Post
  const updatePost = (post, id) => {
    setIsLoading(true);
    setTimeout(() => {
      UPDATE_POST(post, id)
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false);
            navigate(`/post/${params.id}`);
            toast.success("post updated successfully 👌");
          }
        })
        .catch((error) => {
          console.log("Somthing went worng in updatePost", error);
          setIsLoading(false);
        });
    }, 300);
  };

  const onSubmit = (post) => {
    if (paramsId) {
      updatePost(post, params.id);
    } else {
      createPost(post);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="row py-4 d-flex justify-content-center align-items-center">
          <div className="col-12  col-md-10 ">
            <div className="card card-color shadow shadow-lg text-dark card-border" style={{ borderRadius: "1rem" }}>
              <div className="card-body px-4 px-sm-5 text-center">
                <div className="mb-md-4 mt-md-4">
                  <h4 className="fw-bold mb-2 text-uppercase">{paramsId ? "Edit Post" : "Add Post"}</h4>
                  <p className="text-dark-50 mb-5">Please {paramsId ? "update" : "enter"} details!</p>
                  <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-12 col-sm-6 ">
                        <div className="mb-2 text-start">
                          <label className="form-label" htmlFor={id + "-title"}>
                            Full Name
                          </label>
                          <input
                            placeholder="Enter full name"
                            {...register("fullName", {
                              required: "full name is required!",
                            })}
                            type="text"
                            id={id + "-fullName"}
                            defaultValue={paramsId ? post.fullName : ""}
                            className="bg-transparent text-dark form-control form-control-md"
                          />
                          {errors.fullName ? (
                            <span role="alert" className="text-danger">
                              {errors.fullName.message}
                            </span>
                          ) : (
                            <span>&nbsp;</span>
                          )}
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="mb-2 text-start">
                          <label className="form-label" htmlFor={id + "-email"}>
                            Email
                          </label>
                          <input
                            placeholder="Enter email"
                            {...register("email", {
                              required: "email is required!",
                              pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "invalid email address!" },
                            })}
                            type="email"
                            id={id + "-email"}
                            defaultValue={paramsId ? post.email : ""}
                            className="bg-transparent text-dark form-control form-control-md"
                          />
                          {errors.email ? (
                            <span role="alert" className="text-danger">
                              {errors.email.message}
                            </span>
                          ) : (
                            <span>&nbsp;</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <div className="mb-2 text-start">
                          <label className="form-label" htmlFor={id + "-phone"}>
                            Phone
                          </label>
                          <input
                            placeholder="Enter phone"
                            {...register("phone", {
                              required: "phone is required!",
                            })}
                            type="text"
                            id={id + "-phone"}
                            defaultValue={paramsId ? post.phone : ""}
                            className="bg-transparent text-dark form-control form-control-md"
                          />
                          {errors.phone ? (
                            <span role="alert" className="text-danger">
                              {errors.phone.message}
                            </span>
                          ) : (
                            <span>&nbsp;</span>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="mb-2 text-start">
                          <label className="form-label" htmlFor={id + "-gender"}>
                            Gender
                          </label>
                          <select
                            className="bg-transparent text-dark form-select"
                            {...register("gender", { required: "select gender!" })}
                            value={post.gender}
                            onChange={(e) => {
                              setPost({ ...post, gender: e.target.value });
                            }}>
                            <option value="" disabled>
                              --select gender--
                            </option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                          </select>
                          {errors.gender ? (
                            <span role="alert" className="text-danger">
                              {errors.gender.message}
                            </span>
                          ) : (
                            <span>&nbsp;</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <div className="mb-2 text-start">
                          <label className="form-label" htmlFor={id + "-title"}>
                            Title
                          </label>
                          <input
                            placeholder="Enter post title"
                            {...register("postTitle", {
                              required: "title is required!",
                            })}
                            type="text"
                            id={id + "-title"}
                            defaultValue={paramsId ? post.postTitle : ""}
                            className="bg-transparent text-dark form-control form-control-md"
                          />
                          {errors.postTitle ? (
                            <span role="alert" className="text-danger">
                              {errors.postTitle.message}
                            </span>
                          ) : (
                            <span>&nbsp;</span>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="mb-2 text-start">
                          <label className="form-label" htmlFor={id + "-description"}>
                            Description
                          </label>
                          <textarea
                            placeholder="Enter post description"
                            {...register("postDescription", {
                              required: "description is required",
                            })}
                            type="text"
                            id={id + "-description"}
                            defaultValue={paramsId ? post.postDescription : ""}
                            className="bg-transparent text-dark form-control form-control-md"
                          />
                          {errors.postDescription ? (
                            <span role="alert" className="text-danger">
                              {errors.postDescription.message}
                            </span>
                          ) : (
                            <span>&nbsp;</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button className="btn btn-outline-dark btn-md px-5 fw-bold" type="submit">
                      {paramsId ? "Update" : "Add"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUpdatePost;
