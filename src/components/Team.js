export default function Team({ team, lp, name, color }) {
    return (
        <>
            <div className={`bg-${color}-50 p-3 rounded-md shadow-lg md:mb-0 w-full md:w-1/2`}>
                <h3 className={`text-2xl font-semibold text-${color}-600 mb-4`}>Blue Side</h3>
                <table className="min-w-full table-auto text-sm text-gray-700">
                    <thead className={`border-b bg-${color}-100`}>
                        <tr>
                            <th className="px-6 py-3 text-left">Pseudo</th>
                            <th className="px-6 py-3 text-left">Rank</th>
                            <th className="px-6 py-3 text-left">LP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map((player, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-6 py-2">{player.username}</td>
                                <td className="px-6 py-2">{player.rank} {player.rank != "Master+" && player.div}</td>
                                <td className="px-6 py-2">{player.lp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 text-center">
                    <p className={`text-lg text-${color}-600`}>LP {name}: {lp}</p>
                </div>
            </div>
        </>
    );
}