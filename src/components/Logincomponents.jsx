import React, {useState, useEffect} from 'react';
import '../Sass/Logincomponents.scss';
import { useNavigate } from "react-router-dom";
import LinkedinLogo from "../assets/login-logo.png";
import { LoginAPI , GoogleSingInAPI } from '../api/AuthAPI';
import GoogleButton from "react-google-button";
import { toast } from 'react-toastify';
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../Firebaseconfig";
import { postUserData } from "../api/FirestoreAPIs";
import { getUniqueID } from "../helpers/getUniqueld";


export default function Logincomponents() {
  let navigate = useNavigate();
   const [credentails, setCredentials] = useState({});
    const login = async () => {
       try {
         let res = await LoginAPI(credentails.email, credentails.password);
         toast.success("successfully Login");
         navigate("/home");
         localStorage.setItem('userEmail',res.user.email);
       } catch (err) {
         console.log(err);
         toast.error("Please Check your Credentials");
       }
    }

    const googleSingIn = async () => {
      try {
        let response = await GoogleSingInAPI();
        toast.success("Account successfully Login!");
        const user = auth.currentUser;
        if (user != null) {
          if (user.email != null) {
            localStorage.setItem("userEmail", user.email);
          }
        } else {
          postUserData({
            userID: getUniqueID(),
            email: response.user.email,
            name: response.user.displayName,
            imageLink: 
              "https://firebasestorage.googleapis.com/v0/b/linkedin-clone-react-2ff88.appspot.com/o/profileImages%2Fuser.png?alt=media&token=524ddda0-3e6a-4d36-8383-748eca85b38a",
          });
          if (response && response.user && response.user.email) {
            localStorage.setItem("userEmail", response.user.email);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Google LogIn Failed");
      }
    };


    return (
      <div className="login-wrapper">
        <div className="imgs">
          <a>
            <img src={LinkedinLogo} className="linkedinLogo" />
          </a>
        </div>
        <div className="login-wrapper-inner">
          <h1 className="heading">Sign in</h1>
          <p className="sub-heading">Stay updated on your professional world</p>

          <div className="auth-inputs">
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, email: event.target.value })
              }
              type="email"
              className="common-input"
              placeholder="Email or Phone"
            />
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value })
              }
              type="password"
              className="common-input"
              placeholder="Password"
            />
          </div>
          <button onClick={login} className="login-btn">
            Sign in
          </button>
        </div>
        <hr className="hr-text" data-content="or" />
        <div className="google-btn-container">
          <GoogleButton className="google-btn" onClick={googleSingIn} />
          <p className="go-to-signup">
            New to Connexa?{" "}
            <span className="join-now" onClick={() => navigate("/register")}>
              Join now
            </span>
          </p>
        </div>
      </div>
    );
}