const {userNumbers} = require('./redside')


function generateTop() {
    if (userNumbers.size === 0) {
        return "Personne n'as encore de carton :'(";
    }
    const top = [...userNumbers.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([userId, value], index) => `${index + 1}. <@${userId}> avec ${value} cartons.`);

    return top;
}

module.exports = generateTop;