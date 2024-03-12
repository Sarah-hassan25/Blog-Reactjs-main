import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

import PostCard from "../../Components/shared/PostCard/PostCard";
import EditModal from "./../../Components/EditModal/EditModal";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import ServerError from "../../Pages/ServerError/ServerError";

// ------ BACKEND API --------
import { BASE_URL } from "./../../Service/API";

export default function PostDetailsContainer() {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate();

  // to make UI chanegs for post card
  const flag = true;

  // to get id from url
  const { id } = useParams();

  // ---------------- States ----------------
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [loading, SetLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setdeletedCard] = useState(null);
  const [cardId, setCardId] = useState(null);

  // ---------------- Effects ----------------
  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await axios.get(`${BASE_URL}/v1/post/${id}`);
        setPost(data.data);
      } catch (error) {
        setError(error);
        console.log("error", error);
      }
    }

    window.scrollTo({top:0,behavior:'smooth'});

    getPost();
  }, []);

  // --------------- Handlers ----------------
  const handleDeletePost = async (id) => {
    // Start button loading
    SetLoading(true);
    try {
      // to delete the post
      await axios.delete(`${BASE_URL}/v1/post/${id}`, config);

      // Stop Loading
      SetLoading(false);

      // Success pop up
      toast.success("Deleted successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

      /// To Close modal
      setdeletedCard(null);

      // navigate to home after the success pop up finish
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      // Stop button loading
      SetLoading(false);
      console.log("error", error);
      // Error pop up
      toast.error("Sorry.., something went wrong. Please try again later", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleUpdatePost = async (data, id) => {
    // Start button loading
    SetLoading(true);

    // The new data
    const { title, content, photo } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (photo.length) {
      formData.append("photo", photo[0]);
    }

    try {
      // to edit the data
      await axios.patch(`${BASE_URL}/v1/post/${id}`, formData, config);

      // Stop button loading
      SetLoading(false);

      // to render the new data
      const { data } = await axios.get(`${BASE_URL}/v1/post/${id}`);
      setPost(data.data);

      // Success pop up
      toast.success("Updated successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

      // Close Modal
      setSelectedCard(null);
    } catch (error) {
      // Stop button loading
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

  const handleDeleteClick = (event, id) => {
    event.target.classList.add("modal-open");
    setdeletedCard(true);
    setCardId(id);
  };

  const handleEditClick = (event, post, id) => {
    event.target.classList.add("modal-open");
    setSelectedCard(post);
    setCardId(id);
  };

  const handleCloseClick = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <div className="2xsm:w-[90%] sm:w-[70%] md:w-[50%] mx-auto mt-28 mb-11">
        {Object.keys(post).length ? (
          <PostCard
            key={post._id}
            postId={post._id}
            title={post.title}
            content={post.content}
            photo={post.photo}
            name={post.user?.username}
            userPostId={post.user?._id}
            createdAt={post.createdAt}
            handleDeletePost={handleDeletePost}
            handleUpdatePost={handleUpdatePost}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            post={post}
            loading={loading}
            flag={flag}
          />
        ) : !Object.keys(post).length && !error ? (
          <>
            <div className="container mx-auto text-cente h-screen flex justify-center items-center">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#661AE6"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {error ? <ServerError /> : ""}

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

      {/* ------- to open & hide Edit Modal ---------- */}
      {selectedCard && (
        <EditModal
          cardId={cardId}
          handleUpdatePost={handleUpdatePost}
          selectedCard={selectedCard}
          handleCloseClick={handleCloseClick}
          loading={loading}
        />
      )}

      {/* ------- to open & hide Delete Modal ---------- */}
      {deletedCard && (
        <DeleteModal
          cardId={cardId}
          handleDeletePost={handleDeletePost}
          loading={loading}
        />
      )}
    </>
  );
}
