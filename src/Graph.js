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

    console.log(matrix);
    return matrix
}





const cities = getCities('./src/data/nodes.csv');
const edges = getEdges('./src/data/edges.csv');
const arrOfConnections = getConections(edges)
makeMatrix(arrOfConnections)
