type CharacterProps = {
  name: string;
  isEldein: boolean;
  star: number;
  personality: string;
  onClick?: () => void;
};

const personalityBg: Record<string, string> = {
  Madness: "bg-red-800",
  Depressed: "bg-purple-800",
  Innocence: "bg-green-800",
  Composed: "bg-blue-800",
  Vivacious: "bg-yellow-600",
};


export default function Character({name, isEldein, star, personality, onClick}: CharacterProps) {
  const bgClass = personalityBg[personality] || "bg-gray-200";
  
  return (
    <div className={`border p-4 rounded-lg shadow-md cursor-pointer ${bgClass}`} onClick={onClick}>
        {name} {star}성 {isEldein ? <p>엘다인</p>: <p>일반사도</p>}
    </div>
  );
}