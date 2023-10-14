const fs = require('fs');

const Edge = require("../entities/Edge")
const City = require("../entities/City")

function getCities(arquivo) {
    try {
        const data = fs.readFileSync(arquivo, 'utf8');
        const lines = data.split('\n');
        lines.shift(); // Ignore the header line


        const cities = [];

        for (const line of lines) {
            const [id, name] = line.replace(/\r/g, "").split(',');
            cities.push(new City(parseInt(id), name));
        }

        return cities;
    } catch (err) {

        console.error('Error:', err.message);
        return null;
    }
}

function getEdges(arquivo) {
    try {
        const data = fs.readFileSync(arquivo, 'utf8');
        const lines = data.split('\n');
        lines.shift(); // Ignore the header line

        const edges = [];

        for (const line of lines) {
            const [id, ...connections] = line.split(',').map(Number);
            edges.push(new Edge(id, connections));
        }
        return edges;
    } catch (err) {
        console.error('Error:', err.message);
        return null;
    }
}

module.exports = {
    getCities,
    getEdges
}