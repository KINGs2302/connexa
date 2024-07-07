import React, { useState } from "react";
import { Button, Modal, Progress } from "antd";
import { AiOutlinePicture } from "react-icons/ai";
import ReactQuill from "react-quill";
import './index.scss'

const ModalComponent = ({
  modal1Open,
  setModal1Open,
  setStatus,
  status,
  sendStatus,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
}) => {
   const [progress, setProgress] = useState(0);
  return (
    <>
      <Modal
        title="Creat the post"
        style={{ top: 20 }}
        open={modal1Open}
        onOk={() => {
          setStatus("");
          setModal1Open(false);
          setPostImage("");
          setCurrentPost({});
        }}
        onCancel={() => {
          setStatus("");
          setModal1Open(false);
          setPostImage("");
          setCurrentPost({});
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
            onClick={isEdit ? updateStatus : sendStatus}
          >
            {isEdit ? "Update" : "Post"}
            {console.log(isEdit ? "Update" : "Post")}
          </Button>,
        ]}
      >
        <div className="posts-body">
          <input
            className="modal-input"
            value={status}
            placeholder="Share Something Useful.."
            onChange={(event) => setStatus(event.target.value)}
          />
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          {postImage?.length > 0 || currentPost?.postImage?.length ? (
            <img
              className="preview-image"
              src={postImage || currentPost?.postImage}
              alt="postImage"
            />
          ) : (
            <></>
          )}
        </div>
        <label for="pic-upload">
          <AiOutlinePicture size={35} className="picture-icon" />
        </label>
        <input
          id="pic-upload"
          type={"file"}
          hidden
          onChange={(event) =>
            uploadPostImage(event.target.files[0], setPostImage, setProgress)
          }
        />
      </Modal>
    </>
  );
};

export default ModalComponent;
