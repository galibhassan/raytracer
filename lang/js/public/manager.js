const getDim = (parentDiv, cellWidth, cellHeight, cellMargin) => {
  this.parentDiv = parentDiv;
  this.cellWidth = cellWidth;
  this.cellHeight = cellHeight;
  this.cellMargin = cellMargin;

  const w = this.parentDiv.offsetWidth;
  const h = this.parentDiv.offsetHeight;
  const nRows = parseInt(h / (this.cellWidth + 2 * this.cellMargin));
  const nCols = parseInt(w / (this.cellHeight + 2 * this.cellMargin));
  return { nRows, nCols };
};

const getSingleRow = (nCols, cellWidth, cellHeight, i) => {
  const row = document.createElement("div");
  row.classList.add("row");
  for (let j = 0; j < nCols; j++) {
    let cell = getSingleCell(cellWidth, cellHeight, { i, j });
    row.appendChild(cell);
  }
  return row;
};

const getSingleCell = (width, height, cell_id) => {
  const { i, j } = cell_id;
  const cell = document.createElement("div");
  cell.style.width = width + "px";
  cell.style.height = height + "px";
  cell.classList.add("cell");
  cell.setAttribute("id", `${i}_${j}`);
  return cell;
};

const getGrid = (nRows, nCols, cellWidth, cellHeight) => {
  const grid = document.createElement("div");
  grid.classList.add("grid");
  for (let i = 0; i < nRows; i++) {
    let row = getSingleRow(nCols, cellWidth, cellHeight, i);
    grid.appendChild(row);
  }
  return grid;
};

const getColorDataForCells = async (nRows, nCols, cellWidth, cellHeight) => {
  const url = "http://localhost:8000/sceneData";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nRows, nCols, cellWidth, cellHeight }),
  });

  const data = await res.json();

  return data;
};

main = async () => {
  const CELL_WIDTH = 20;
  const CELL_HEIGHT = 20;
  const CELL_MARGIN = 1;

  const container = document.querySelector(".container");
  const { nRows, nCols } = getDim(
    container,
    CELL_WIDTH,
    CELL_HEIGHT,
    CELL_MARGIN
  );
  const grid = getGrid(nRows, nCols, CELL_WIDTH, CELL_HEIGHT);
  container.appendChild(grid);

  gridData = await getColorDataForCells(nRows, nCols, CELL_WIDTH, CELL_HEIGHT);
  console.log(gridData.cells);

  gridData.cells.forEach((cell) => {
    const currentCellinDom = document.getElementById(cell.id);
    if(currentCellinDom) {
      currentCellinDom.style.backgroundColor = cell.color;
    }
  });
};

main();
