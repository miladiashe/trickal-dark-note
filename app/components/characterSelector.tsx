"use client"
import { useEffect, useState } from "react";
import Character from "./character";

export default function CharacterSelector() {

    const [isOpenCharacterSelect, setIsOpenCharacterSelect] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [ownCharacters, setOwnCharacters] = useState<number[]>([]);


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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={() => { setIsOpenCharacterSelect(!isOpenCharacterSelect) }}>
        캐릭터 선택</button>
        </div>
{isOpenCharacterSelect ? <div className="mt-4 flex justify-center gap-16 ">
        <div className="flex flex-col items-center flex-1">
            <h3 className="font-bold mb-2">보유 캐릭터</h3>
            {ownCharacters.length === 0 ? <p>보유한 캐릭터가 없습니다.</p> : <div className="mt-4 flex flex-wrap gap-4 justify-center max-h-[70vh] overflow-y-auto overflow-x-hidden">
                {characters.filter((character: { key: number; name: string; isEldine: boolean }) => ownCharacters.includes(character.key)).map((character: { key: number; name: string; isEldine: boolean }) => (
                    <Character key={character.key} name={character.name} isEldine={character.isEldine} onClick={() => toggleOwnCharacter(character.key)}/>
                ))}
            </div>}
        </div>
                <div className="flex flex-col items-center flex-1">
            <h3 className="font-bold mb-2">미보유 캐릭터</h3>
            {ownCharacters.length === characters.length ? <p>모든 캐릭터를 모았습니다..</p> : <div className="mt-4 flex flex-wrap gap-4 justify-center max-h-[70vh] overflow-y-auto overflow-x-hidden">
                {characters.filter((character: { key: number; name: string; isEldine: boolean }) => !ownCharacters.includes(character.key)).map((character: { key: number; name: string; isEldine: boolean }) => (
                    <Character key={character.key} name={character.name} isEldine={character.isEldine} onClick={() => toggleOwnCharacter(character.key)}/>
                ))}
            </div>}
        </div>
</div> : null}
        
        {/* {isOpenCharacterSelect ? <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {characters.map((character: { id: number; name: string; isEldine: boolean }) => (
                <Character key={character.id} name={character.name} isEldine={character.isEldine}/>
            ))}
        </div> : null} */}
    </div>
  );
}