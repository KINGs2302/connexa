import React, {useState, useEffect, useMemo}from 'react';
import LinkedinLogo from '../../../assets/login-logo.png'
import { AiFillHome, AiOutlineSearch, AiFillMessage } from "react-icons/ai";
import {  BsBellFill } from "react-icons/bs";
import { BiSolidUserPlus, BiSolidBriefcase } from "react-icons/bi";
import "./index.scss";
import { useNavigate } from 'react-router-dom';
import ProfilePopup from '../ProfilePopup';
import SearchUsers from "../SearchUsers";
import { getAllUsers } from '../../../api/FirestoreAPIs';
import Profilecomponents from '../../Profilecomponents';


export default function Topbar({currentUser}) {
  let navigate = useNavigate()
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
   const [users, setUsers] = useState([]);
  const goToRoute = (route) =>{
    navigate(route);
  }
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };
  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  
  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
      <img className="linkedin-Logo" src={LinkedinLogo} alt="Linkedin-Logo" />
      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <>
          <div className="search">
            <AiOutlineSearch
              size={"30"}
              color="rgba(255,255,255)"
              className="react_icon"
              onClick={() => setIsSearch(true)}
            />
          </div>
          <div className="home">
            <AiFillHome
              size={"30"}
              color="rgba(255,255,255)"
              className="react_icon"
              onClick={() => goToRoute("/home")}
            />
            <BiSolidUserPlus
              size={"35"}
              color="rgba(255,255,255)"
              className="react_icon"
              onClick={() => goToRoute("/connections")}
            />
            <BiSolidBriefcase
              size={"35"}
              color="rgba(255,255,255)"
              className="react_icon"
            />
            <AiFillMessage
              size={"30"}
              color="rgba(255,255,255)"
              className="react_icon"
            />
            <BsBellFill
              size={"30"}
              color="rgba(255,255,255)"
              className="react_icon"
            />
          </div>
        </>
      )}
      <div className="image">
        <img
          className="user"
          src={currentUser?.imageLink}
          alt="user"
          onClick={displayPopup}
        />
      </div>

      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)}>
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
