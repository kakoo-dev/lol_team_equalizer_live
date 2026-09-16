import PlayerInput from "@/components/PlayerInput";
import { useState } from "react";

export default function PlayersForm({ players, setPlayers, setMaxPlayersPerTeam, maxPlayersPerTeam, sendTeam }) {

    const handleChange = (index, field, value) => {
        const updatedPlayers = [...players];
        updatedPlayers[index][field] = value;
        setPlayers(updatedPlayers);
    };

    const addPlayer = () => {
        if (players.length < 10) {
            if ((players.length + 1) / maxPlayersPerTeam > 2) {
                setMaxPlayersPerTeam(maxPlayersPerTeam + 1);
            }
            setPlayers([...players, { username: "", rank: "Iron 4", lp: 0 }]);
        }
    };

    const removePlayer = (index) => {
        setPlayers(players.filter((_, i) => i !== index));
    };

    const handleMaxPlayerPerTeamChange = (e) => {
        const value = Number(e.target.value);

        if (value > 5) {
            setMaxPlayersPerTeam(5);
            e.target.value = 5;
        }
        else if (players.length / value > 2) {
            let i = value + 1;
            while (players.length / i > 2)
                i++;
            setMaxPlayersPerTeam(i);
            e.target.value = i;
        }
        else
            setMaxPlayersPerTeam(value);
    }

    return (
        <>
            {
                players.length < 10 &&
                <button
                    className="disabled:opacity-50 bg-blue-600 text-white p-3 rounded-md w-full mb-4 hover:bg-blue-500 focus:outline-none cursor-pointer"
                    onClick={addPlayer}
                    disabled={players.length >= 10}
                >
                    Ajouter un joueur [{players.length}/10]
                </button>
            }

            <ul className="mb-4 space-y-4">
                {
                    players.map((player, index) => (
                        <PlayerInput
                            key={index}
                            i={index}
                            p={player}
                            removePlayer={removePlayer}
                            handleChange={handleChange} />
                    ))
                }
            </ul>

            <div className="flex items-center justify-between text-gray-600 text-sm mb-2">
                <label className="mr-2">Nombre de joueurs max par équipe* :</label>
                <input
                    type="number"
                    className="w-[15%] h-8 text-center border rounded bg-gray-50 focus:outline-none text-black text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={maxPlayersPerTeam}
                    onChange={handleMaxPlayerPerTeamChange}
                    disabled={players.length >= 9}
                />
            </div>
            <button
                className="disabled:opacity-50 bg-green-600 text-white p-3 rounded-md w-full hover:bg-green-500 focus:outline-none cursor-pointer"
                onClick={sendTeam}
                disabled={players.length < 3}
            >
                Faire les equipes
            </button>
            <p className="text-xs italic text-gray-500 mt-3">
                * Exemple: vous avez 6 joueurs et vous voulez forcer un 3v3, vous pouvez limiter le nombre de joueurs max par équipe à 3 joueurs pour éviter des situations en 1v5 ou 2v4 en cas de grande différence de LP
            </p>
        </>
    );
}
