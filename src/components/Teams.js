import Team from "@/components/Team";

export default function Teams({ teams, handleReturnToForm }) {
    return (
        <>
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                <Team team={teams.teamA} lp={teams.lpTeamA} name="Blue Side" color="blue" />
                {/* --- */}
                <Team team={teams.teamB} lp={teams.lpTeamB} name="Red Side" color="red" />
            </div>

            <div className="mt-6 text-center">
                <p
                    className={`text-lg ${teams.lpTeamA == teams.lpTeamB ? "" : (teams.lpTeamA > teams.lpTeamB ? "text-blue-600" : "text-red-600")}`}
                >
                    + {Math.abs(teams.lpTeamA - teams.lpTeamB)}LP
                </p>
            </div>

            <button
                className="bg-yellow-600 text-white p-3 rounded-md mt-6 w-full hover:bg-yellow-500 focus:outline-none cursor-pointer"
                onClick={handleReturnToForm} >
                Retour au formulaire
            </button>

            <p className="text-xs italic text-gray-500 mt-3">
                Pour equilibrer les équipes avec un nombre de joueurs différent et prendre en compte les joueurs iron 4 0LP, tout les joueurs ont une valeur par defaut de 400 LPs
            </p>
        </>
    );
}