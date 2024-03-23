import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../redux/slices/userAuthorSlice";
import logo from '../../assets/logo.png'
import './Header.css'

function Header() {
  let { loginUserStatus, currentUser } = useSelector(
    (state) => state.userAuthoruserAuthorLoginReducer
  );
  let dispatch = useDispatch();

  function signout() {
    dispatch(resetState())
  }
  return (
    <nav
      className="navbar navbar-expand-sm fs-5 bg-dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="" width="60px" />
        </a>
        <li className="nav-item align-items-center">
          <NavLink
            className="nav-link"
            to="sitter-register"
          >
            Sitter-Register
          </NavLink>
        </li>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {loginUserStatus === false ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to=""
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="signup"
                  >
                    SignUp
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="signin"
                  >
                    SignIn
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="petcare"
                  >
                    Pet-Care
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">

                <NavLink
                  className="nav-link"
                  to="signin"
                  style={{ color: "var(--light-grey)" }}
                  onClick={signout}
                >
                  <span className="lead  fs-4 me-3 fw-1" style={{ color: "#994570", fontWeight: 'bold', fontSize: '1.3rem', textTransform: 'capitalize', fontFamily: 'fantasy' }}>{currentUser.username}
                    <sup style={{ color: 'var(--dark-green)', fontSize: '1rem' }}>({currentUser.userType})</sup>
                  </span>
                  Signout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;