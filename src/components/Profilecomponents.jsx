import React, {useState} from 'react'
import ProfileEdit from "../components/common/ProfileEdit";
import ProfileCard from "./common/ProfileCard/index.jsx";

export default function Profilecomponents({ currentUser, serchUser }) {
  const [isEdit, setisEdit] = useState(false);

  const onEdit = () => {
    setisEdit(!isEdit)
  }
  return (
    <div className="home-component">
      {isEdit ? (
        <ProfileEdit onEdit={onEdit} currentUser={currentUser} />
      ) : (
        <ProfileCard
          currentUser={currentUser}
          onEdit={onEdit}
        />
      )}
    </div>
  );
}
