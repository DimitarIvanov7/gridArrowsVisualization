import fs from "fs";

export const mapping = {
  right: "000",
  left: "001",
  top: "010",
  bottom: "011",
  topLeft: "100",
  bottomRight: "101",
};

let variations = 0;

const getColPosition = (x) => {
  return x % 3;
};

const getRowPosition = (x) => {
  return Math.floor(x / 3);
};

const getLeftElementIndex = (x) => {
  const currentElementColPosition = getColPosition(x);

  return currentElementColPosition !== 0 ? x - 1 : null;
};

const getRightElementIndex = (x) => {
  const currentElementColPosition = getColPosition(x);
  const gridEndOfColPosition = 3 - 1;

  return currentElementColPosition !== gridEndOfColPosition ? x + 1 : null;
};

const getTopElementIndex = (x) => {
  const currentElementRowPosition = getRowPosition(x);

  return currentElementRowPosition !== 0 ? x - 3 : null;
};

const getBottomElementIndex = (x) => {
  const currentElementRowPosition = getRowPosition(x);

  return currentElementRowPosition !== 4 - 1 ? x + 3 : null;
};

const validateGrid = (strGrid, deliminator) => {
  for (let i = 0; i < strGrid.length; i += deliminator) {
    switch (strGrid.substring(i, i + deliminator)) {
      case mapping.right:
        if (getColPosition(i / deliminator) === 2) {
          return false;
        }
        break;

      case mapping.left:
        if (getColPosition(i / deliminator) === 0) return false;
        break;

      case mapping.top:
        if (getRowPosition(i / deliminator) === 0) return false;
        break;

      case mapping.bottom:
        if (getRowPosition(i / deliminator) === 3) return false;
        break;

      //diagonal

      case mapping.topLeft:
        if (
          getRowPosition(i / deliminator) === 0 ||
          getColPosition(i / deliminator) === 0
        )
          return false;
        break;

      case mapping.bottomRight:
        if (
          getRowPosition(i / deliminator) === 3 ||
          getColPosition(i / deliminator) === 2
        )
          return false;
        break;
    }
  }

  return true;
};

const checkGrid = (strGrid, deliminator) => {
  const mappingArr = new Array(12).fill(0);

  for (let i = 0; i < strGrid.length; i += deliminator) {
    const left = getLeftElementIndex(i / deliminator);
    const right = getRightElementIndex(i / deliminator);
    const top = getTopElementIndex(i / deliminator);
    const bottom = getBottomElementIndex(i / deliminator);

    switch (strGrid.substring(i, i + deliminator)) {
      case mapping.right:
        if (mappingArr[right] === 1) return;
        mappingArr[right] += 1;
        break;

      case mapping.left:
        if (mappingArr[left] === 1) return;

        mappingArr[left] += 1;
        break;

      case mapping.top:
        if (mappingArr[top] === 1) return;

        mappingArr[top] += 1;
        break;

      case mapping.bottom:
        if (mappingArr[bottom] === 1) return;

        mappingArr[bottom] += 1;
        break;

      //diagonal

      case mapping.topLeft:
        if (mappingArr[top - 1] === 1) return;

        mappingArr[top - 1] += 1;
        break;

      case mapping.bottomRight:
        if (mappingArr[bottom + 1] === 1) return;

        mappingArr[bottom + 1] += 1;
        break;
    }
  }

  return !mappingArr.find((val) => val > 1);
};

const generateAndWrite = () => {
  const validVariations = [];

  const generateVariations = (
    length,
    characters,
    deliminator = 3,
    current = ""
  ) => {
    if (current.length / deliminator === length) {
      variations++;
      variations % 100000000 === 0 &&
        console.log(
          variations / 1000000,
          " million generated variations",
          "| valid variations: ",
          validVariations.length
        );

      if (
        validateGrid(current, deliminator) &&
        checkGrid(current, deliminator)
      ) {
        validVariations.push(current);
      }
      return;
    }

    for (let i = 0; i < characters.length; i++) {
      generateVariations(
        length,
        characters,
        deliminator,
        current + characters[i]
      );
    }
  };
  generateVariations(12, ["000", "001", "010", "011", "100", "101"], 3);

  const json = JSON.stringify(validVariations);

  fs.writeFile("validVariations.json", json, function (err) {
    if (err) return console.log(err);
    console.log("Added");
  });
};

generateAndWrite();
