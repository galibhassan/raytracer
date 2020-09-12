const path = require("path")
const fs = require("fs")

const filePath = path.resolve(__dirname, '../', "fileFormats", "cube.obj");


const get3DVector = (line) => {
    const line_arr = line.split(" ")
    const x = parseFloat(line_arr[1])
    const y = parseFloat(line_arr[2])
    const z = parseFloat(line_arr[3])
    return [x,y,z]
}

const getOBJData = (filePath)=>{
    const fileContent = fs.readFileSync(filePath, {encoding:"utf-8"});
    const arrayfiedFileContent=  fileContent.split("\n")

    const vertices = [];
    const normals = [];
    const faces = [];
    arrayfiedFileContent.forEach(line=>{
        if(line[0]== "v"){
            if(line[1] === " ") {
                // vertex
                vertices.push(get3DVector(line));
            } else if(line[1] === "n") {
                // normal
                normals.push(get3DVector(line))
            } else if(line[1] === "t") {
                // texture
            }
        } else if(line[0]==="f") {
            // face
        }
    })

    return {vertices, normals, faces}
}


console.log( getOBJData(filePath) );

