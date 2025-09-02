import CharacterSelector from "./components/characterSelector";


export default function Home() {



  return (
    <div className="flex items-center justify-center h-screen align-middle flex-col">
      <h2 className="font-bold text-center">Welcome To Darknet</h2>
      <br/>
      <CharacterSelector/>
    </div>
  );
}
