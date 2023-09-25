import data from "./validVariations.json" assert { "type": "json" };

import { mapping } from "./gridLinkingTest";

const gridContainer = document.querySelector(".gridContainer");

const pageComponent = (gridStr, index) => {
  let htmlStr = `<div class="gridPage page-${index} ${
    index !== 0 && "hidden"
  }">`;

  gridStr.forEach((element) => {
    htmlStr += gridComponent(element);
  });

  return (htmlStr += `</div>`);
};

const gridComponent = (direction) => {
  let arrowDir = "";

  switch (direction) {
    case mapping.right:
      arrowDir = "right";
      break;
    case mapping.left:
      arrowDir = "left";
      break;
    case mapping.top:
      arrowDir = "top";
      break;
    case mapping.bottom:
      arrowDir = "bottom";
      break;
    case mapping.topLeft:
      arrowDir = "topLeft";
      break;
    case mapping.bottomRight:
      arrowDir = "bottomRight";
      break;
  }

  return `<div class="gridItem">
  <div class="arrow ${arrowDir}"></div>
      </div>`;
};

const createPages = (grids) => {
  let htmlStr = "";

  shuffleArray(grids).forEach((grid, index) => {
    htmlStr += pageComponent(stringToArray(grid), index);
  });

  return htmlStr;
};

const buttonPrev = document.querySelector(".prev");
const buttonNext = document.querySelector(".next");

const counter = document.querySelector(".counter");
counter.innerText = `0/${data.length}`;

const controlPages = (length) => {
  let currPageIndex = 0;

  const counter = document.querySelector(".counter");

  buttonPrev.addEventListener("click", () => {
    const currentPage = document.querySelector(`.page-${currPageIndex}`);

    if (currPageIndex !== 0) {
      currPageIndex--;
    } else currPageIndex = length - 1;

    currentPage.classList.add("hidden");
    const prevPage = document.querySelector(`.page-${currPageIndex}`);
    prevPage.classList.remove("hidden");
    counter.innerText = `${currPageIndex}/${length}`;
  });

  buttonNext.addEventListener("click", () => {
    const currentPage = document.querySelector(`.page-${currPageIndex}`);

    if (currPageIndex !== length - 1) {
      currPageIndex++;
    } else currPageIndex = 0;

    currentPage.classList.add("hidden");
    const nextPage = document.querySelector(`.page-${currPageIndex}`);
    nextPage.classList.remove("hidden");
    counter.innerText = `${currPageIndex}/${length}`;
  });
};

function stringToArray(str) {
  const result = [];
  for (let i = 0; i < str.length; i += 3) {
    result.push(str.substr(i, 3));
  }
  return result;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

gridContainer.innerHTML = createPages(data);

controlPages(data.length);
