import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getConnections } from "../../../api/FirestoreAPIs";
import "./index.scss";

export default function ConnecteUsers({ user, getCurrent, currentUser }) {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    getConnections(currentUser.id, user.id, setIsConnected);
  }, [currentUser.id, user.id]);
  return isConnected ? (
    <></>
  ) : (
      <button onClick={() => getCurrent(user.id)}>
        <AiOutlineUsergroupAdd size={20} />
        Connect
      </button>
    
  );
}
