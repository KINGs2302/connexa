import React ,  {useEffect ,useState } from 'react'
import Logincomponents from '../components/Logincomponents'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../Firebaseconfig";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader/Loader.jsx';


export default function Login() {
  const [Loading ,setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) {
        navigate("/home");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return Loading ? <Loader/> : <Logincomponents/>
}
