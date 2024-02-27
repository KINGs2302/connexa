import React, { useState, useMemo, useEffect } from "react";
import "./index.scss";
import PostsCard from "../PostsCard";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import {
  getSingleStatus,
  getSingleUser,
  editProfile,
  addConnection,
  getAllUsers,
} from "../../../api/FirestoreAPIs";
import { useLocation } from "react-router-dom";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import FileUploadModal from "../FileUploadModal";

export default function ProfileCard({ currentUser, onEdit }) {
  let location = useLocation();
  const [allStatus, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  const getCurrent = (id) => {
    addConnection(currentUser.id, id);
  };
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <FileUploadModal
        progress={progress}
        currentImage={currentImage}
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <div className="profile-card" onChange={getImage}>
        <div className="edit-btn">
          <HiPencil className="edit-click" onClick={onEdit} />
        </div>
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            />
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            <p className="location">
              {Object.values(currentProfile).length === 0
                ? `${currentUser.city}, ${currentUser.country} `
                : `${currentProfile?.city}, ${currentUser.country}`}
            </p>

            <a
              className="Website"
              target="_blank"
              href={
                Object.values(currentProfile).length === 0
                  ? currentUser.website
                  : currentProfile?.website
              }
            >
              {Object.values(currentProfile).length === 0
                ? currentUser.website
                : currentProfile?.website}
            </a>
          </div>

          <div className="right-info">
            <p className="collage">
              {Object.values(currentProfile).length === 0
                ? currentUser.collage
                : currentProfile?.collage}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
          </div>
        </div>

        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>

        <p className="skills">
          <span className="skill-label">Skills</span>:&nbsp;
          {Object.values(currentProfile).length === 0
            ? currentUser.skills
            : currentProfile?.skills}
        </p>
      </div>
      <div className="post-status-main">
        {allStatus?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts}/>
            </div>
          );
        })}
      </div>
    </>
  );
}
