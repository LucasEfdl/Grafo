const fs = require('fs');

const City = require("./entities/city")
const Edge = require("./entities/Edge")



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

function createdNode(id, name, arr) {
    const arrAux = arr.flat()
    return {
        id: id,
        name: name,
        connections: [...arrAux]
    }
}

function getConections(edges) {
    
    let count = 0;
    let arrAux = []
    let arrOfNodes = []
    
    for(let i = 0; i < edges.length; i++) {

        if(edges[i].id == count) {
            
            arrAux.push(edges[i].connections);
            

        } else if (edges[i].id != count) {

            const node = createdNode(count, cities[count], arrAux)
            arrOfNodes.push(node)
            arrAux = []
            count++
            i--
        } 
    }

    return arrOfNodes

}


function makeMatrix(arrOfConnections) {

    const numRows = 38;
    const numCols = 38;
    const matrix = new Array(numRows).fill().map(() => new Array(numCols).fill(0));

    
    for(let i = 0; i < arrOfConnections.length; i++) {
        const id = arrOfConnections[i].id
        for (let j = 0; j < arrOfConnections.length; j++) {
            if(arrOfConnections[j].connections.includes(id)){
                matrix[i][j] = 1
                matrix[j][i] = 1
            }
        }
    }
    console.log(matrix);
    return matrix
}

const cities = getCities('./src/data/nodes.csv');
const edges = getEdges('./src/data/edges.csv');

const arrOfConnections = getConections(edges)


makeMatrix(arrOfConnections)
