import { Link } from "react-router-dom";

import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "./../EditButton/EditButton";

export default function PostCard({
  title,
  content,
  postId,
  // name,
  createdAt,
  photo,
  flag,
  userPostId,
  handleDeletePost,
  post,
  loading,
  handleEditClick,
  handleDeleteClick
}) {
  const userId = localStorage.getItem("userId");

  // -- to get the image object --
  const [image] = photo;

  //---- displaying the date of post in dd mm yy ----
  let date = new Date(createdAt);
  date = date.toDateString().substring(4);
  const swapDate = date.replace(/(\w+)\s(\w+)/, "$2 $1,");

  return (
    <>
      {/* *********** Card *********** */}
      <div
        className={`mx-auto md:w-full ${flag ? "2xsm:w-full" : "2xsm:w-[90%]"}`}
      >
        <div
          className={`card card-compact h-[448px] bg-formColor shadow-xl overflow-hidden w-full hover:shadow-gray-600 hover:shadow-sm ${
            flag ? "mx-auto w-full h-auto" : ""
          }`}
        >
          <div className={flag ? "visible p-4" : "hidden"}>
            <Link to={`/post/${postId}`}>
              <h2 className="card-title 2xsm:text-xl md:text-2xl mb-2 hover:text-gray-300 transition-all duration-200 ease-in-out">
                {title}
              </h2>
            </Link>
            <span className="text-sm text-gray-300"> By</span>{" Sarah Hassan"}
            {/* <span className="2xsm:text-base md:text-lg capitalize text-gray-300">{name}</span> */}
            <h6 className="text-sm text-gray-500">{}</h6>
          </div>

          <figure>
            <Link to={`/post/${postId}`}>
              <img
                className={`w-full h-[260px] object-cover rounded-tl-2xl rounded-tr-2xl hover:scale-105 transition-all duration-200 ease-in-out ${
                  flag ? "h-[300px] rounded-tl-none rounded-tr-none" : ""
                }`}
                src={image.url}
                alt="blog"
              />
            </Link>
          </figure>

          <div className="card-body justify-between">
            <div>
              <div className={flag ? "hidden" : ""}>
                <Link to={`/post/${postId}`}>
                  <h2 className="card-title mb-2 hover:text-gray-300 transition-all duration-200 ease-in-out">
                    {title}
                  </h2>
                </Link>
              </div>

              <div>
                <Link to={`/post/${postId}`}>
                  <p
                    className={`flex-grow-0 font-light ${
                      flag ? "2xsm:text-lg md:text-base" : ""
                    }`}
                  >
                    {content}
                  </p>
                </Link>
              </div>
            </div>

            <div
              className={`card-actions items-end mt-1 ${
                flag ? "justify-end" : "justify-between"
              }`}
            >
              <div
                className={`flex justify-center items-end ${
                  flag ? "hidden" : "visible"
                }`}
              >
                <div className="flex flex-col justify-center">
                  <span className="text-gray-300 text-sm capitalize">
                    {name}
                  </span>
                  {/* <span className="text-gray-400 text-xs">{swapDate}</span> */}
                </div>
              </div>

              {userPostId === userId ? (
                <div className="flex gap-2">
                  <EditButton
                    key={postId}
                    post={post}
                    postId={postId}
                    handleEditClick={handleEditClick}
                  />
                  <DeleteButton
                    key={postId + 1}
                    postId={postId}
                    handleDeletePost={handleDeletePost}
                    loading={loading}
                    handleDeleteClick={handleDeleteClick}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div
          className={`divider mt-2 mb-0 w-full ${
            flag ? "mx-auto" : ""
          }`}
        ></div>
      </div>
    </>
  );
}
