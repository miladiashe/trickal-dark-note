type CharacterProps = {
  name: string;
  isEldine: boolean;
};


export default function Character({name, isEldine}: CharacterProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
        {name} {isEldine ? <p>엘다인</p>: <p>일반사도</p>}
    </div>
  );
}