

// export default Sitter;
import { useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { axiosWithToken } from "../../axiosWithToken";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FcComments, FcPortraitMode } from "react-icons/fc";
import { BiCommentAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdRestore } from "react-icons/md";
import './Sitter.css'

function Sitter() {
  const { state } = useLocation();
  let { currentUser } = useSelector(
    (state) => state.userAuthoruserAuthorLoginReducer
  );

  let { register, handleSubmit } = useForm();
  let [comment, setComment] = useState("");
  let navigate = useNavigate();

  // Add comment to an article by user
  const writeComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    let res = await axiosWithToken.post(
      `http://localhost:4000/owner-api/comment/${state.sitterId}`,
      commentObj
    );
    if (res.data.message === "Comment posted") {
      setComment(res.data.message);
    }
  };

  // Convert ISO date to UTC data
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="mt-5 shadow">
            <div className="body4">
              <h1 className="title">{state.sittername}</h1>
              <p className="lead">Age: {state.age}</p>
              <p className="lead">Location: {state.loacation}</p>
              <p className="lead">Description: {state.discription}</p>
              <p className="lead">Price per Day: {state.pricePerDay}</p>
              <p className="lead">Available: {state.available}</p>
              <p className="lead">Experience: {state.experience}</p>
              {/* <p className="lead">Rating: {state.rating}</p> */}
              <p className="lead">Accepted Pets:</p>
              <ul>
                {state.acceptedPets.map((pet, index) => (
                  <li key={index}>{pet}</li>
                ))}
              </ul>
              {/* <p className="lead">Accepted Pets: {state.acceptedPets}</p> */}
              <p className="lead">Number of Pets Accepted at a Time: {state.numberOfPetsAcceptedAtATime}</p>
              <p className="lead">Number of Walks per Day: {state.numberOfWalksPerDay}</p>
              <h1 className="display-6 text-center">MOBILE:</h1>
              <h1 className="lead text-center text-success display-6">  {state.phone}</h1>
            </div>
          </div>

          <div className="comments my-4 rounded p-4">
            {state.comments.length === 0 ? (
              <p className="display-3">No comments yet...</p>
            ) : (
              state.comments.map((commentObj, ind) => (
                <div key={ind} className="bg-light my-3 shadow rounded p-4">
                  <div className="">
                    <p className="card-text fs-5">
                      <FcPortraitMode className="me-2" />
                      {commentObj.username}
                    </p>
                    <p className="card-text">
                      <FcComments className="me-2" />
                      {commentObj.comment}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <h1 className="mt-4 text-success rounded">{comment}</h1>
          <form onSubmit={handleSubmit(writeComment)}>
            <div className="input-group mb-3 rounded">
              <input
                type="text"
                {...register("comment")}
                className="form-control rounded"
                placeholder="Write a comment here...."
              />
              <button type="submit" className="btn btn-success m-3 rounded">
                Add Comment <BiCommentAdd className="ms-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sitter;
