"use client"
import { getAuth, signInAnonymously, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../firebase";


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Login({ onLogin }: { onLogin: (uid: string) => void }) {

function handleGoogleLogin() {
  signInWithPopup(auth, provider)
    .then((result) => {
        localStorage.setItem("uid", result.user.uid);
      console.log(result.user);
       onLogin(result.user.uid);
    })
    .catch((error) => {
      console.error(error);
    });
}
function handleAnonymousLogin() {
  signInAnonymously(auth)
    .then((result) => {
        localStorage.setItem("uid", result.user.uid);
      console.log(result.user);
       onLogin(result.user.uid);
    })
    .catch((error) => {
      console.error(error);
    });
}
  return (
    <div className="flex flex-col items-center justify-center gap-4">
    <h2 className="text-center">Login</h2>
    <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded" onClick={handleAnonymousLogin}>Anonymous Login</button>
    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={handleGoogleLogin}>Google Login</button>
</div>  

)
}