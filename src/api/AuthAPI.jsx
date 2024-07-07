import { signInWithEmailAndPassword , createUserWithEmailAndPassword , GoogleAuthProvider , signInWithPopup , signOut} from "firebase/auth";
import { auth } from '../Firebaseconfig';

export const LoginAPI = (email, password) => {
    try {
       let respones = signInWithEmailAndPassword(auth, email, password); 
       return respones;
    } catch (error) {
        return error;
    }
};

export const RegisterAPI = (email, password) => {
  try {
    let response = createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};

export const GoogleSingInAPI  = () => {
  try {
    let googleProvider = new GoogleAuthProvider;
    let res = signInWithPopup(auth, googleProvider);
    return res;
  } catch (error) {
    return error;
  }
};



export const onLogout = () => {
  try {
    signOut(auth);
  } catch (error) {
    return error;
  }
}