export default function DeleteModal({ cardId, handleDeletePost, loading  }) {



  return (
    <div>
      {/* The Modal Body */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div id="modal" className="modal">
        <div id="modal-box" className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this post?
          </h3>
          <p className="py-4">
            This will delete this post permanently, You cannot undo this action.
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn capitalize">
              No
            </label>
            <button
              onClick={() => handleDeletePost(cardId)}
              htmlFor="my-modal"
              className={`${
                loading ? "loading" : ""
              } btn bg-red-600 text-white outline-none border-none hover:bg-red-500 capitalize text-base px-5`}
            >
              yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
