import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="container">
          <div className="flex justify-center items-center flex-col">
            <img className="w-96" src="/404.svg" alt="" />
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
