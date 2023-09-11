import React, { useContext, useEffect, useId } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PostsContext } from "../../context/PostsContext";
import Spinner from "../../utills/Spinner";
import { CREATE_POST, UPDATE_POST } from "../../apifunctions/index";
import { toast } from "react-toastify";
import { validationSchema } from "../../utills/validation";
import CustomInputField from "../../utills/CustomInputField";

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
    }
  }, [params.id]);

  //Create Post
  const createPost = (post) => {
    setIsLoading(true);
    setTimeout(() => {
      CREATE_POST(post)
        .then((response) => {
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
                        <CustomInputField id={id + "-fullName"} label="Full Name" type="text" name="fullName" defaultValue={paramsId ? post.fullName : ""} validationSchema={validationSchema.fullName} register={register} errors={errors.fullName} placeholder="Enter your fullName" />
                      </div>

                      <div className="col-12 col-sm-6">
                        <CustomInputField id={id + "-email"} label="Email" type="text" name="email" defaultValue={paramsId ? post.email : ""} validationSchema={validationSchema.email} register={register} errors={errors.email} placeholder="Enter your email" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <CustomInputField id={id + "-phone"} label="Phone" type="text" name="phone" defaultValue={paramsId ? post.phone : ""} validationSchema={validationSchema.phone} register={register} errors={errors.phone} placeholder="Enter your phone no" />
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="mb-2 text-start">
                          <label className="form-label" htmlFor={id + "-gender"}>
                            Gender
                          </label>
                          <select
                            className="bg-transparent text-dark form-select"
                            {...register("gender", validationSchema.gender)}
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
                        <CustomInputField id={id + "-postTitle"} label="Post Title" type="text" name="postTitle" defaultValue={paramsId ? post.postTitle : ""} validationSchema={validationSchema.postTitle} register={register} errors={errors.postTitle} placeholder="Enter Post Title" />
                      </div>
                      <div className="col-12 col-sm-6">
                        <CustomInputField id={id + "-postDescription"} label="Post Description" type="text" name="postDescription" defaultValue={paramsId ? post.postDescription : ""} validationSchema={validationSchema.postDescription} register={register} errors={errors.postDescription} placeholder="Enter Post Description" />
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
