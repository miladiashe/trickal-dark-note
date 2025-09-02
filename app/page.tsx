"use client";
import { useEffect, useState } from "react";
import CharacterSelector from "./components/characterSelector";
import Login from "./components/login";


export default function Home() {

    const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen align-middle flex-col">
      <h2 className="text-center text-3xl">Welcome To Darknet</h2>
      {uid ? null : <Login  onLogin={setUid} />}
      <br/>
      {uid ? <CharacterSelector /> : <p>로그인 후 이용 가능합니다.</p>}
    </div>
  );
}
