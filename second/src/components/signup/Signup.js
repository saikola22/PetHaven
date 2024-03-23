import './signup.css'
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err, setErr] = useState("");
  let [state, setState] = useState(false);
  let [signupSuccess, setSignupSuccess] = useState(false);

  async function onSignUpFormSubmit(userObj) {
    let res = await axios.post("http://localhost:4000/owner-api/owner", userObj);
    console.log(res);
    if (res.data.message === "owner created") {
      setState(true);
      setSignupSuccess(true);
      setErr("");
    } else {
      setErr(res.data.message);
    }
  }

  return (
    <div className="container my-5">
      {/* //   <div className="row justify-content-center">
    //       <div className="border"> */}
      <div className="row justify-content-center">
        <div className="shadow col-lg-4 col-md-6 col-sm-6 m-5">
          <div className="card-title text-center border-bottom">
            {signupSuccess === true ? (
              <div>
                <p className="lead fs-3 text-center display-4 text-success">
                  User registration success
                </p>
                <p className="text-center fs-6 text-secondary">
                  Proceed to <Link to="/signin">Login</Link>
                </p>
                <p className="text-center fs-6 text-secondary">
                  Back to <Link to="/">Home</Link>
                </p>
              </div>
            ) : (
              <h2 className="p-3">Signup</h2>
            )}
          </div>

          {err.length !== 0 && (
            <p className="lead text-center text-danger">{err}</p>
          )}

          <div className="body1 p-5">
            <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
              <div className="mb-4">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  {...register("username", { required: true, disabled: state })}
                />
                {errors.username?.type === 'required' && <p className='text-danger'>*Username Required!</p>}

              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password", { required: true, disabled: state })}
                />
                {errors.password?.type === 'required' && <p className='text-danger'>*Password Required!</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register("email", { required: true, disabled: state })}
                />
                {errors.email?.type === 'required' && <p className='text-danger'>*Email Required!</p>}
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-success" disabled={state}>
                  Register
                </button>
              </div>
              {/* <div className="text-end"> */}

              {/* </div> */}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
