const { getCities, getEdges } = require("./data/getData")

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

    return matrix
}


function showNodes(cities) {
    console.log(cities);
}

function verifyBorder(id1, id2, arrOfConnections) {

    const result = arrOfConnections[id1].connections.includes(id2)

    const city01 = arrOfConnections[id1].name
    const city02 = arrOfConnections[id2].name

    if(result) {
        console.log(`\nExiste conexão ente o Estado de${city01.name} e o Estado de${city02.name}\n`);
    } else {
        console.log(`\nNão existe conexão ente o Estado de${city01.name} e o Estado de${city02.name}\n`);
    }
}




const cities = getCities('./src/data/nodes.csv');
const edges = getEdges('./src/data/edges.csv');
const arrOfConnections = getConections(edges)
makeMatrix(arrOfConnections)

verifyBorder(12, 14, arrOfConnections)

//showNodes(cities)
