import React, {  useState } from "react";
import { useForm } from "react-hook-form";

import { toast, ToastContainer } from "react-toastify";

export default function EditModal({
  cardId,
  selectedCard,
  handleUpdatePost,
  handleCloseClick,
  loading,
}) {
  // ----------- States -----------
  const [title, setTitle] = useState(selectedCard.title);
  const [content, setContent] = useState(selectedCard.content);
  const [imageUrl, setImage] = useState(selectedCard.photo[0].url);
  const [isErrorFile, setErrorFile] = useState(false);


  // ----------- Handlers ------------
  const onChangeTitleInput = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContentInput = (e) => {
    setContent(e.target.value);
  };

  const onChangePhotoInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setErrorFile(false);
      const url = URL.createObjectURL(file);
      setImage(url);
    } else {
      // to make save button disabled
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

  // -------- For form validation -----------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  return (
    <div>
      {/* The Modal Body */}
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />

      <div id="modal" className="modal">
        <div className="modal-box  2xsm:w-[90%] md:w-[70%]">
          <h3 className="font-bold text-xl text-center">Update Post</h3>

          <form
            onSubmit={handleSubmit((data) => handleUpdatePost(data, cardId))}
          >
            <input
              {...register("title", {
                required: "Title is required",
                maxLength: { value: 250, message: "Max length 250" },
                minLength: { value: 5, message: "Min length 5" },
              })}
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={onChangeTitleInput}
              placeholder="Title"
              className="input input-lg input-bordered w-full my-2 text-lg focus:outline-none border-gray-200"
            />
            {<p className="text-red-600">{errors.title?.message}</p>}

            <textarea
              {...register("content", {
                required: "Description is required",
                minLength: { value: 10, message: "Min length 10" },
              })}
              name="content"
              id="content"
              value={content}
              onChange={onChangeContentInput}
              placeholder="Brief description for your post"
              className="textarea textarea-lg textarea-bordered w-full resize-none my-2 text-lg focus:outline-none border-gray-200"
            ></textarea>
            <p className="text-red-600">{errors.content?.message}</p>

            <div className="flex flex-col justify-center items-center gap-1">
              <input
                {...register("photo")}
                type="file"
                name="photo"
                id="photo"
                onChange={onChangePhotoInput}
                accept="image/*"
                className="file-input file-input-bordered rounded-none w-full focus:outline-none border-gray-200 my-2"
              />
              <p className="text-red-600">{errors.photo?.message}</p>

              <div className="2xsm:w-full md:w-1/2">
                <img
                  src={imageUrl}
                  alt="blog image"
                  className="w-full object-cover h-[260px] rounded-xl"
                />
              </div>
            </div>

            <div className="modal-action">
              <label
                onClick={handleCloseClick}
                htmlFor="my-modal-5"
                className="btn px-[10px] capitalize text-sm"
              >
                Cancel
              </label>
              <button
                disabled={isErrorFile}
                id="saveBtn"
                type="submit"
                htmlFor="my-modal-5"
                className={`${
                  loading ? "loading" : ""
                } btn btn-warning  text-white outline-none border-none hover:bg-yellow-400 w-24 text-base capitalize`}
              >
                Save
              </button>
            </div>
          </form>
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
    </div>
  );
}
