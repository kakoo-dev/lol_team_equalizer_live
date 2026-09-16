const ranks = {
    "Iron": 0,
    "Bronze": 1,
    "Silver": 2,
    "Gold": 3,
    "Platine": 4,
    "Emeraude": 5,
    "Diamant": 6,
    "Master+": 7
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function PlayerGetTotalLP(player) {
    let total_lp = 400;
    total_lp += ranks[player.rank] * 400;

    if (ranks[player.rank] < 7) {
        total_lp += 100 * ((player.div - 4) * -1);
    }
    total_lp += player.lp;
    return total_lp;
}

function TeamGetTotalLP(team) {
    let total_lp = 0;
    team.forEach(player => total_lp += PlayerGetTotalLP(player));
    return total_lp;
}

function getCombinations(players, k) {
    const result = [];
    const combination = [];

    function backtrack(start) {
        if (combination.length === k) {
            result.push([...combination]);
            return;
        }
        for (let i = start; i < players.length; i++) {
            combination.push(players[i]);
            backtrack(i + 1);
            combination.pop();
        }
    }

    backtrack(0);
    return result;
}


function getBalancedTeams(players, max_players_per_team) {
    let bestTeams = null;
    let minDifference = Infinity;

    const n = players.length;
    const possibleSplits = [];

    for (let i = 0; i < randomIntFromInterval(1, 10); i++)
        shuffleArray(players);

    for (let sizeA = 1; sizeA <= Math.min(5, n - 1, max_players_per_team); sizeA++) {
        const teamCombinations = getCombinations(players, sizeA);
        teamCombinations.forEach(teamA => {
            const teamB = players.filter(player => !teamA.includes(player));
            if (teamB.length <= max_players_per_team)
                possibleSplits.push([teamA, teamB]);
        });
    }

    possibleSplits.forEach(([teamA, teamB]) => {
        const lpTeamA = TeamGetTotalLP(teamA);
        const lpTeamB = TeamGetTotalLP(teamB);
        const difference = Math.abs(lpTeamA - lpTeamB);

        if (difference < minDifference) {
            minDifference = difference;
            bestTeams = { teamA, teamB, lpTeamA, lpTeamB };
        }
    });

    return bestTeams;
}


export { getBalancedTeams };