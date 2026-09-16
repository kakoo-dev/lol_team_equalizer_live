import PlayersForm from "@/components/PlayersForm";
import Teams from "@/components/Teams";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [maxPlayersPerTeam, setMaxPlayersPerTeam] = useState(5);
  const [teams, setTeams] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendTeam = async () => {
    if (players.length >= 3) {
      const formattedPlayers = players.map(player => {
        const [rank, div] = player.rank.includes("Master") ? ["Master+", 0] : player.rank.split(" ");
        return { ...player, rank, div: Number(div), lp: Number(player.lp) };
      });

      const body = { players: formattedPlayers, max_players_per_team: maxPlayersPerTeam };

      const response = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.status === 200 && data.teams) {
        setTeams(data.teams);
        setFormSubmitted(true);
      } else {
        alert(`Une erreur est survenue: [${response.status}] ${response.statusText}\n\n${data.message}`);
      }
    }
  };

  const handleReturnToForm = () => {
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className={`z-[1] p-6 w-full mx-auto bg-white text-black shadow-xl rounded-xl border border-gray-300 ${formSubmitted ? "lg:ml-[5vw] lg:mr-[5vw]" : "max-w-xl"}`}>
        {!formSubmitted ? (
          <PlayersForm players={players}
            setPlayers={setPlayers}
            setMaxPlayersPerTeam={setMaxPlayersPerTeam}
            maxPlayersPerTeam={maxPlayersPerTeam}
            sendTeam={sendTeam} />
        ) : (
          <Teams
            teams={teams}
            handleReturnToForm={handleReturnToForm} />
        )}
      </div>
      <Footer />
    </div>
  );
}