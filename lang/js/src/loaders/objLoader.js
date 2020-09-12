const path = require("path")
const fs = require("fs")



const get3DVector = (line) => {
    const line_arr = line.split(" ")
    const x = parseFloat(line_arr[1])
    const y = parseFloat(line_arr[2])
    const z = parseFloat(line_arr[3])
    return [x, y, z]
}

const parseFaceLine = (faceLine) => {
    // faceline comes in the form
    // f 2/1/1 4/2/1 1/3/1
    
    const ibo_chunk = []
    const vNormals_chunk = []
    const textureCoordinates_chunk = []

    const fLine_arr = faceLine.split(" ");
    const v0Data = fLine_arr[1]
    const parsedV0 = parseFaceVertex(v0Data)
    const v1Data = fLine_arr[2]
    const parsedV1 = parseFaceVertex(v1Data)
    const v2Data = fLine_arr[3]
    const parsedV2 = parseFaceVertex(v2Data)
    
    ibo_chunk.push(
        parsedV0.vertIndex,
        parsedV1.vertIndex,
        parsedV2.vertIndex,
    )
    textureCoordinates_chunk.push(
        parsedV0.textureCoord,
        parsedV1.textureCoord,
        parsedV2.textureCoord,
    )
    vNormals_chunk.push(
        parsedV0.vNormal,
        parsedV1.vNormal,
        parsedV2.vNormal,
    )
    return {
        ibo_chunk, textureCoordinates_chunk, vNormals_chunk
    }
}

const parseFaceVertex = (fVert) => {
    fVertSingle = fVert.split(`/`)
    const vertIndex = parseInt(fVertSingle[0])-1 // -1, because obj counts from 1
    const textureCoord = parseInt(fVertSingle[1])
    const vNormal = parseInt(fVertSingle[2])
    return { vertIndex, textureCoord, vNormal }
}


const getOBJData = (filePath) => {
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    const arrayfiedFileContent = fileContent.split("\n")

    const vertices = [];
    const normals = [];
    const faces = [];
    arrayfiedFileContent.forEach(line => {
        if (line[0] == "v") {
            if (line[1] === " ") {
                // vertex
                vertices.push(get3DVector(line));
            } else if (line[1] === "n") {
                // normal
                normals.push(get3DVector(line))
            } else if (line[1] === "t") {
                // texture
            }
        } else if (line[0] === "f") {
            // face
            faces.push(parseFaceLine(line))

        }
    })

    return { vertices, normals, faces }
}

module.exports = getOBJData

// test
// const filePath = path.resolve(__dirname, "samplemodel", "polygonGeometry.obj");
// console.log(getOBJData(filePath));

// test face
// fLine = `f 7//9 10//9 11//9`
// console.log(parseFaceLine(fLine))
