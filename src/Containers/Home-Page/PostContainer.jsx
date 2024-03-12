import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-up";

import PostCard from "../../Components/shared/PostCard/PostCard";
import EditModal from "./../../Components/EditModal/EditModal";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import ServerError from "./../../Pages/ServerError/ServerError";

// ------ BACKEND API --------
import { BASE_URL } from "./../../Service/API";

export default function PostContainer() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("username");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // reference for scrolling to section
  const sectionRef = useRef();

  // ---------------- States ----------------
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, SetLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setdeletedCard] = useState(null);
  const [cardId, setCardId] = useState(null);

  // ---------------- Effects ----------------
  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(`${BASE_URL}/v1/post?limit=1000`);
        setPosts(data.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }
    setTimeout(() => {
      window.scrollTo({top:0,behavior:'smooth'});
    }, 0);
    getPosts();
  }, []);

  // --------------- Handlers ----------------
  const handleDeletePost = async (id) => {
    console.log(id);
    // Start button loading
    SetLoading(true);
    try {
      // to delete the post
      await axios.delete(`${BASE_URL}/v1/post/${id}`, config);

      // Stop button loading
      SetLoading(false);

      // to render the new data
      const response = await axios.get(`${BASE_URL}/v1/post?limit=1000`);
      setPosts(response.data.data);

      // Success pop up
      toast.success("Deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

      //To Close Modal
      setdeletedCard(null);
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
      // await axios.patch(`${BASE_URL}/v1/post/${id}`, formData, config);

      // Stop button loading
      SetLoading(false);

      // to render the new data
      const response = await axios.get(`${BASE_URL}/v1/post?limit=1000`);
      setPosts(response.data.data);

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
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
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
      {posts.length ? (
        <>
          {/* // Header */}
          <div className="hero min-h-screen bg-bgHome">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold text-white">
                  Hello {name?.split(" ")[0]}
                </h1>
                <p className="text-[#d9d9d9]">
                  Welcome to ChillTime! We're excited to have you here
                </p>
                <p className="mb-5 text-[#d9d9d9]">
                  Dive into the World of Film and TV with us
                </p>
                <button
                  onClick={() => {
                    sectionRef.current.scrollIntoView({ behavior: "smooth" });
                  }}
                  className=" btn btn-primary"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Card */}
          <div
            ref={sectionRef}
            className=" w-[95%] mx-auto grid gap-x-6 gap-y-1 justify-center items-center 2xsm:grid-cols-1  md:grid-cols-3 mt-16 mb-11"
          >
            {posts.map((post) => (
              <PostCard
                key={post._id}
                postId={post._id}
                title={post.title.substring(0, 50) + "..."}
                content={post.content.substring(0, 70) + "..."}
                photo={post.photo}
                name={post.user?.username}
                userPostId={post.user?._id}
                // createdAt={post.createdAt}
                handleDeletePost={handleDeletePost}
                handleUpdatePost={handleUpdatePost}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                post={post}
                loading={loading}
              />
            ))}
          </div>
        </>
      ) : !posts.length && !error ? (
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

      {error ? <ServerError /> : ""}

      <ToastContainer
        position="top-right"
        autoClose={2000}
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

      {/* ------- Button to scroll to top --------- */}
      <ScrollToTop
        showUnder={200}
        duration={500}
        style={{
          bottom: 60,
          right: 13,
        }}
      >
        <button className="hover:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
            />
          </svg>
        </button>
      </ScrollToTop>

      {/* ------- to open & hide Edit Modal ---------- */}
      {selectedCard && (
        <EditModal
          selectedCard={selectedCard}
          cardId={cardId}
          handleUpdatePost={handleUpdatePost}
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
