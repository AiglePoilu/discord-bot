const {userNumbers} = require('./redside')

function generateTop3() {
    const top3 = [...userNumbers.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    if (top3.length === 0) {
        return "Il n'y a pas de top 3 actuellement.";
    }

    const top3String = top3.map(([userId, value], index) => `${index + 1}. <@${userId}> avec ${value} cartons.`).join('\n');
    return `Voici le top 3 :\n${top3String}`;
}
module.exports = generateTop3;