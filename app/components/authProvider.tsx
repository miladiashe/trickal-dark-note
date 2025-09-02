"use client";
import { useEffect, useState } from "react";
import CharacterSelector from "./characterSelector";
import Login from "./login";


export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {

    const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen align-middle flex-col">
      <h2 className="text-center text-3xl">Welcome To Darknet</h2>
      <br/>
      {uid ? null: <Login  onLogin={setUid} />}
      <br/>
      {uid ? <CharacterSelector /> : <p>로그인 후 이용 가능합니다.</p>}

      {children}
    </div>
  );
}
