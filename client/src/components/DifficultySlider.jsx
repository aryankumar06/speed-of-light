export default function DifficultySlider({ difficulty, setDifficulty }) {
  const Row = ({ label, keyName }) => <div>
    <div className="flex justify-between text-sm"><span>{label}</span><span>{difficulty[keyName]}%</span></div>
    <input type="range" min="0" max="100" value={difficulty[keyName]} className="w-full" onChange={(e) => setDifficulty({ ...difficulty, [keyName]: Number(e.target.value) })} />
  </div>;
  return <div className="space-y-3"><Row label="Easy" keyName="easy" /><Row label="Medium" keyName="medium" /><Row label="Hard" keyName="hard" /></div>;
}
