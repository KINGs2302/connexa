import React, { useState, useMemo } from "react";
import { getCurrentUserData } from "../api/FirestoreAPIs";
import Topbar from "../components/common/Topbar/index"
import Profile from "../Pages/Profile";

export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUserData(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Profile currentUser={currentUser} />
    </div>
  );
};
