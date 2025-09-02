"use client"
import { useEffect, useState } from "react";
import Character from "./character";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function CharacterSelector() {

    const [isOpenCharacterSelect, setIsOpenCharacterSelect] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [ownCharacters, setOwnCharacters] = useState<number[]>([]);
    const [isLoaded, setIsLoaded] = useState(false); // 추가

    // Firestore에서 불러오기
    useEffect(() => {
        async function fetchOwnCharacters() {
            const uid = localStorage.getItem("uid");
            if(uid === null) {setIsLoaded(true); return;}
            const docRef = doc(db, "users", uid); 

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setOwnCharacters(docSnap.data().ownCharacters || []);
            }
            setIsLoaded(true); 
        }
        fetchOwnCharacters();
    }, []);
    // Firestore에 저장하기
     useEffect(() => {
        if (!isLoaded) return; // 처음 불러올 때는 저장하지 않음
        async function saveOwnCharacters() {
            const uid = localStorage.getItem("uid");
            if(uid === null) return;
            await setDoc(doc(db, "users", uid), {
                ownCharacters
            });
        }
        saveOwnCharacters();
    }, [isLoaded, ownCharacters]);

    const toggleOwnCharacter = ( id: number) => {
        setOwnCharacters((prev)=>
            prev.includes(id) ? prev.filter((charId) => charId !== id) : [...prev, id]
    );
    };


    useEffect(() => {
        fetch('/data/data.json')
        .then(response => response.json())
        .then(data => {
            setCharacters(data);
        })
    }, []);

  return (
    <div className="border p-4 rounded-lg shadow-md justify-center max-h-[90vh]">
        <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4" onClick={() => { setIsOpenCharacterSelect(!isOpenCharacterSelect) }}>
        보유 캐릭터 선택</button>
        </div>
        {isOpenCharacterSelect ? <div className="mt-4 flex justify-center gap-16 ">
                <div className="flex flex-col items-center flex-1">
                    <h3 className="font-bold mb-2">보유 캐릭터</h3>
                    {ownCharacters.length === 0 ? <p>보유한 캐릭터가 없습니다.</p> : <div className="mt-4 flex flex-wrap gap-4 justify-center max-h-[70vh] overflow-y-auto overflow-x-hidden">
                        {characters.filter((character: { key: number; name: string; star:number; personality:string; isEldein: boolean }) => 
                        ownCharacters.includes(character.key)).map((character: { key: number; name: string; star:number; personality:string; isEldein: boolean }) => (
                            <Character key={character.key} name={character.name} isEldein={character.isEldein} personality={character.personality} star={character.star} onClick={() => {toggleOwnCharacter(character.key); console.log(character.isEldein)}}/>
                        ))}
                    </div>}
                </div>
                        <div className="flex flex-col items-center flex-1">
                    <h3 className="font-bold mb-2">미보유 캐릭터</h3>
                    {ownCharacters.length === characters.length ? <p>모든 캐릭터를 모았습니다.</p> : <div className="mt-4 flex flex-wrap gap-4 justify-center max-h-[70vh] overflow-y-auto overflow-x-hidden">
                        {characters.filter((character: { key: number; name: string; star:number; personality:string; isEldein: boolean }) => 
                        !ownCharacters.includes(character.key)).map((character: { key: number; name: string; star:number; personality:string; isEldein: boolean }) => ( 
                        <Character key={character.key} name={character.name} isEldein={character.isEldein} personality={character.personality} star={character.star} onClick={() => {toggleOwnCharacter(character.key); console.log(character.isEldein)}}/>
                        ))}
                    </div>}
                </div>
        </div> : null}
    </div>
  );
}