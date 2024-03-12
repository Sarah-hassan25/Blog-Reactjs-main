import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

//BACKEND
import { BASE_URL } from "./../../Service/API";

export default function PostForm() {
  const token = localStorage.getItem("token");
  // -------- States ---------
  const [imageUrl, setImage] = useState(null);
  const [loading, SetLoading] = useState(false);
  const [isErrorFile, setErrorFile] = useState(false);

  // -------- Handlers -------------
  const handleSavePost = async (data) => {
    SetLoading(true);

    const { photo, title, content } = data;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("photo", photo[0]);

    // for Authorization
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.post(`${BASE_URL}/v1/post`, formData, config);
      SetLoading(false);

      // Success pop up
      toast.success("Posted successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

      // navigate to home after the success pop finish
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      SetLoading(false);
      // Error pop up
      toast.error(`${error.response.data.message} 😞`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const onPhotoInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setErrorFile(false);
      const url = URL.createObjectURL(file);
      setImage(url);
    } else {
      // to make post button disabled
      setErrorFile(true);
      // Error pop up
      toast.error(`Please select a valid image file`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  // ------- For form validation ----------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ------- For navigation -------
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-[75px] mb-11">
        <div className="md:grid ">
          <div className="mt-5 md:mt-0">
            <form onSubmit={handleSubmit(handleSavePost)}>
              <div className="sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 px-4 py-5 sm:p-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-lg font-medium leading-6 "
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("title", {
                          required: "Title is required",
                          maxLength: { value: 250, message: "Max length 250" },
                          minLength: { value: 5, message: "Min length 5" },
                        })}
                        id="title"
                        type="text"
                        name="title"
                        className="input input-bordered focus:outline-none w-full border-gray-200  bg-transparent"
                      />
                      {<p className="text-red-600">{errors.title?.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-lg font-medium leading-6 "
                    >
                      Description
                    </label>
                    <div className="mt-2 ">
                      <textarea
                        {...register("content", {
                          required: "Description is required",
                          minLength: { value: 10, message: "Min length 10" },
                        })}
                        id="description"
                        name="content"
                        rows={3}
                        className="resize-none bg-transparent border-gray-200 mt-1 block w-full rounded-md border input-bordered p-4 leading-5 focus:outline-none"
                        placeholder="Brief description for your post"
                      />
                      <p className="text-red-600">{errors.content?.message}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium leading-6 ">
                      Cover photo
                    </label>

                    <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 "
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <div className="flex text-sm text-gray-300">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload Image</span>
                            <input
                              {...register("photo", {
                                required: "Image is required",
                              })}
                              id="file-upload"
                              onChange={onPhotoInputChange}
                              name="photo"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-red-600">{errors.photo?.message}</p>
                  </div>

                  <div
                    className={`2xsm:w-full sm:w-[60%] md:w-[40%] mx-auto ${
                      imageUrl ? "visible" : "hidden"
                    }`}
                  >
                    <img
                      className="w-full object-cover h-[260px] rounded-xl"
                      src={imageUrl}
                      alt="blog image"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 px-4 py-3 text-right sm:px-6">
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    className="btn capitalize px-[10px]"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isErrorFile}
                    type="submit"
                    className={`${loading ? "loading" : ""} 
                      
                     text-white btn btn-primary capitalize text-base`}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}
