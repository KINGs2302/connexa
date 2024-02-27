import React, { useEffect, useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPIs";
import '../Sass/Logincomponents.scss';
import { useNavigate } from "react-router-dom";
import LinkedinLogo from "../assets/login-logo.png";
import { GoogleSingInAPI } from "../api/AuthAPI";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import { getUniqueID } from "../helpers/getUniqueld";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../Firebaseconfig";

export default function Registercomponents() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});

  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Account created!");
      postUserData({
        userID: getUniqueID(),
        name: credentails.name,
        email: credentails.email,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/linkedin-clone-react-2ff88.appspot.com/o/profileImages%2Fuser.png?alt=media&token=524ddda0-3e6a-4d36-8383-748eca85b38a",
      });
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Cannot creat your Account");
    }
  };

    const googleSignIn = async () => {
      try {
        let response = await GoogleSingInAPI();
        toast.success("Account created successfully!");
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
          console.log("sucess");
          if (response && response.user && response.user.email) {
            localStorage.setItem("userEmail", response.user.email);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Google Failed");
      }
    };

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your name"
          />

          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone number"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />
        <p className="go-to-signup">
          Already on Connexa?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
