import React, { useEffect , useState} from "react";
import Homecomponents from '../components/Homecomponents'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Firebaseconfig';
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader/Loader.jsx";


export default function Home({currentUser}) {
  const [Loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return Loading ? <Loader /> : <Homecomponents currentUser = {currentUser} />;
}
