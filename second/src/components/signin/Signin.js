import "./Signin.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { userAuthorLoginThunk } from "../../redux/slices/userAuthorSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { isPending, currentUser, loginUserStatus, errorOccurred, errMsg } =
    useSelector((state) => state.userAuthoruserAuthorLoginReducer);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function onSignUpFormSubmit(userCred) {
    dispatch(userAuthorLoginThunk(userCred));
  }

  useEffect(() => {
    if (loginUserStatus) {
        navigate("/sitters");
      // if (currentUser.userType === "author") {
      //   navigate("/author-profile");
      // }
    }
  }, [loginUserStatus]);

  return (
    <div className="container p-5 my-5">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="shadow p-4">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Signin</h2>
            </div>
            <div className="body2">
              {/* invalid cred err */}
              {errorOccurred === true && (
                <p className="text-center text-danger">
                  {errMsg}
                </p>
              )}
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* radio */}
                <div className="my-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username", { required: true })}
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
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === 'required' && <p className='text-danger'>*Password Required!</p>}
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-success">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;