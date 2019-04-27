module.exports = {
    random: (list) => list[Math.floor((Math.random()*list.length))],
    getRndInteger: (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min,
};