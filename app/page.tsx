import Image from "next/image";
import Character from "./character";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen align-middle flex-col">
      <h2 className="font-bold text-center">Welcome To Darknet</h2>
      <br/>
      <br/>
      <br/>
      <Character name="시온" isEldine={true}></Character>
      <Character name="시온" isEldine={true}></Character>
      <Character name="시온" isEldine={true}></Character>
      <Character name="시온" isEldine={true}></Character>
      <Character name="시온" isEldine={true}></Character>
      <Character name="시온" isEldine={true}></Character>
      

      xxxx
    </div>
  );
}
