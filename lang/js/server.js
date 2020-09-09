const express = require('express');
const app = express();
app.set("view engine", "ejs")
app.use(express.static("public"));

app.use(express.json())

const renderer = require("./src/renderer")


app.get('/', (req, res, next) => {
    res.render("index.ejs")
})

app.post('/sceneData', (req, res, next) => {

    console.log(req.body)
    const { nRows, nCols } = req.body

    const nRowsModified = parseInt(nCols/2)
    data = renderer( nCols, nRows)
    res.send(data)
})



const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Go to http://localhost:${PORT}`);
})