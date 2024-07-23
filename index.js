function createBoard(num) {
  let arr = [];
  for (let i = num; i >= 0; i--) {
    let row = [];
    for (let j = 0; j < num; j++) {
      let node = {};
      row.push(node);
    }
    arr.push(row);
  }
  return arr;
}

function createField(i, j, num) {
  let data = [i, j];
  let moves = [];
  if (i + 2 < num) {
    if (j + 1 < num) {
      moves.push([i + 2, j + 1]);
    }
    if (j - 1 >= 0) {
      moves.push([i + 2, j - 1]);
    }
  }
  if (i - 2 >= 0) {
    if (j + 1 < num) {
      moves.push([i - 2, j + 1]);
    }
    if (j - 1 >= 0) {
      moves.push([i - 2, j - 1]);
    }
  }
  if (j + 2 < num) {
    if (i + 1 < num) {
      moves.push([i + 1, j + 2]);
    }
    if (i - 1 >= 0) {
      moves.push([i - 1, j + 2]);
    }
  }
  if (j - 2 >= 0) {
    if (i + 1 < num) {
      moves.push([i + 1, j - 2]);
    }
    if (i - 1 >= 0) {
      moves.push([i - 1, j - 2]);
    }
  }
  return { data, moves };
}

function fillBoard(board, num) {
  for (let i = num; i >= 0; i--) {
    for (let j = 0; j < num; j++) {
      board[i][j] = createField(i, j, num);
    }
  }
}

function newGraph(num) {
  let board = createBoard(num);
  fillBoard(board, num);
  function getField(field) {
    return board[field[0]][field[1]];
  }

  function knightMoves(start, end) {
    let currentField = getField(start);
    end = getField(end);
    let queue = [currentField];
    let parentMap = {};
    let visited = [currentField];
    parentMap[currentField.data] = null;

    while (currentField.data !== end.data) {
      for (let move of currentField.moves) {
        let newField = getField(move);
        if (!visited.includes(newField)) {
          queue.push(newField);
          visited.push(newField);
        parentMap[newField.data] = currentField.data;
        }
      }
      queue.shift();
      currentField = getField(queue[0].data);
    }
    let path = [];
    let current = currentField.data;
    while (current !== null) {
      path.unshift(current);
    current = parentMap[current];
    }
    console.log(path);
  }
  return { knightMoves };
}

let chessBoard = newGraph(8);
chessBoard.knightMoves([0, 0], [5, 6]);
