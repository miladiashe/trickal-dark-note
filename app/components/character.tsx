type CharacterProps = {
  name: string;
  isEldine: boolean;
  onClick?: () => void;
};


export default function Character({name, isEldine, onClick}: CharacterProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md cursor-pointer" onClick={onClick}>
        {name} {isEldine ? <p>엘다인</p>: <p>일반사도</p>}
    </div>
  );
}