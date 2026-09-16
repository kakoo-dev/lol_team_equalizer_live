const { getBalancedTeams } = require("@/functions/createTeams");

// END

export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.ip || req.socket.remoteAddress; // LOG ONLY LIVE GITHUB PRIVATE DISPLAY --- PRIVATE
  if (req.method === "POST") {
    const { players, max_players_per_team } = req.body;

    if (!Array.isArray(players) || !Number.isInteger(max_players_per_team) || players.length < 3 || players.length > 10) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const isValid = players.every(player =>
      typeof player.username === "string" &&
      typeof player.rank === "string" &&
      typeof player.div === "number" &&
      typeof player.lp === "number"
    );

    if (!isValid || max_players_per_team > 5 || players.length / max_players_per_team > 2) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const teams = getBalancedTeams(players, max_players_per_team);

    return res.status(200).json({ teams });
  }
  else {
    return res.status(405).json({ message: "Unauthorized method" });
  }
}