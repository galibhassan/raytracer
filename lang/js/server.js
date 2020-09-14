const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.json());

const main = require("./src/main");

app.get("/", (req, res, next) => {
  res.render("index");
});

app.post("/sceneData", (req, res, next) => {
  console.log(req.body);
  const { nRows, nCols, cellWidth, cellHeight } = req.body;
  data = main({ nCols, nRows, cellWidth, cellHeight });
  res.send(data);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}`);
});
