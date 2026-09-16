
const baseRanks = ["Iron", "Bronze", "Silver", "Gold", "Platine", "Emeraude", "Diamant"];

const ranks = [...baseRanks.flatMap(rank =>
    [4, 3, 2, 1].map(div => `${rank} ${div}`)), "Master+"];

export default function PlayerInput({ p, i, removePlayer, handleChange }) {
    return (
        <li className="flex gap-2 items-center border-b border-gray-300 pb-3">
            <input
                className="border pl-2 pr-2 h-12 text-sm rounded-md w-full bg-gray-50 text-black focus:outline-none"
                placeholder="Pseudo"
                value={p.username}
                maxLength="30"
                onChange={(e) => handleChange(i, "username", e.target.value)}
            />
            <select
                className="border pl-2 h-12 text-sm rounded-md w-full bg-gray-50 text-black focus:outline-none cursor-pointer"
                value={p.rank}
                onChange={(e) => handleChange(i, "rank", e.target.value)}
            >
                {ranks.map((r) => (
                    <option key={r} value={r}>{r}</option>
                ))}
            </select>
            <input
                className="border w-[125px] h-12 text-sm rounded-md w-12 bg-gray-50 text-center text-black focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                min="0"
                max="100"
                value={p.lp}
                onChange={(e) => handleChange(i, "lp", e.target.value)}
            />
            <button
                className="text-white pl-1 pt-2 pb-2 rounded-md cursor-pointer"
                onClick={() => removePlayer(i)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
            </button>
        </li>
    );
}