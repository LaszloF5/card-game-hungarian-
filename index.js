"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
let playerGameTable = document.querySelector(".js-player-table");
let computerGameTable = document.querySelector(".js-computer-table");
let dataField = document.querySelector(".js-datas");
let gameField = document.querySelector(".js-gamefield");
let gameTable = document.querySelector(".js-game-table");
let firstCardKey = 0;
let playerCards = []; // játékos lapjai ENNEK A TÍPUSÁT KÉSŐBB ÁTÍRNI
let playerKeys = []; // játékos lap értékei
let playerEarnedCards = []; // játékos megszerzett lapok
let playerCurrentKey = "";
let playerImgAlt = "";
let playerPoints = 0;
let playerOwnedCards = 0;
let computerCards = []; // computer lapjai
let computerKeys = []; // computer lap értékei
let computerEarnedCards = []; // computer megszerzett lapok
let computerCurrentKey = "";
let computerImgAlt = "";
let computerPoints = 0;
let computerOwnedCards = 0;
//Buttons
let startButton = document.querySelector(".js-start-button");
let playerPassButton = document.querySelector(".js-player-pass-button");
let tempCardholder = [];
let tempAnswer = "";
let deck = [
  { value: "L2", img: "./imgs/cards-medium/leaf-unter.png" },
  { value: "L3", img: "./imgs/cards-medium/leaf-ober.png" },
  { value: "L4", img: "./imgs/cards-medium/leaf-king.png" },
  {
    value: "L12",
    img: "./imgs/cards-medium/leaf-seven.png",
  },
  { value: "L8", img: "./imgs/cards-medium/leaf-eight.png" },
  { value: "L9", img: "./imgs/cards-medium/leaf-nine.png" },
  { value: "L10", img: "./imgs/cards-medium/leaf-ten.png" },
  { value: "L11", img: "./imgs/cards-medium/leaf-ace.png" },
  {
    value: "A2",
    img: "./imgs/cards-medium/acorn-unter.png",
  },
  { value: "A3", img: "./imgs/cards-medium/acorn-ober.png" },
  { value: "A4", img: "./imgs/cards-medium/acorn-king.png" },
  {
    value: "A12",
    img: "./imgs/cards-medium/acorn-seven.png",
  },
  { value: "A 8", img: "./imgs/cards-medium/acorn-eight.png" },
  { value: "A 9", img: "./imgs/cards-medium/acorn-nine.png" },
  { value: "A10", img: "./imgs/cards-medium/acorn-ten.png" },
  { value: "A11", img: "./imgs/cards-medium/acorn-ace.png" },
  { value: "B2", img: "./imgs/cards-medium/bell-unter.png" },
  { value: "B3", img: "./imgs/cards-medium/bell-ober.png" },
  { value: "B4", img: "./imgs/cards-medium/bell-king.png" },
  {
    value: "B12",
    img: "./imgs/cards-medium/bell-seven.png",
  },
  { value: "B8", img: "./imgs/cards-medium/bell-eight.png" },
  { value: "B9", img: "./imgs/cards-medium/bell-nine.png" },
  { value: "B10", img: "./imgs/cards-medium/bell-ten.png" },
  { value: "B11", img: "./imgs/cards-medium/bell-ace.png" },
  {
    value: "H2",
    img: "./imgs/cards-medium/heart-unter.png",
  },
  {
    value: "H3",
    img: "./imgs/cards-medium/heart-ober.png",
  },
  {
    value: "H4",
    img: "./imgs/cards-medium/heart-king.png",
  },
  {
    value: "H12",
    img: "./imgs/cards-medium/heart-seven.png",
  },
  {
    value: "H8",
    img: "./imgs/cards-medium/heart-eight.png",
  },
  { value: "H9", img: "./imgs/cards-medium/heart-nine.png" },
  {
    value: "H10",
    img: "./imgs/cards-medium/heart-ten.png",
  },
  {
    value: "H11",
    img: "./imgs/cards-medium/heart-ace.png",
  },
];
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }
  const copy = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key]);
    }
  }
  return copy;
}
let copiedDeck = deepClone(deck);
// Adatok megjelenítése
function renderDatas() {
  if (dataField !== null) {
    dataField.innerHTML = `
      <li>Player lapjainak az értéke: ${playerKeys} </li>
  <li>Computer lapjainak az értéke: ${computerKeys} </li>
               <li>Player pontszerző lapok száma: ${playerPoints}</li>
               <li>Player megszerzett lapok száma: ${playerOwnedCards}</li>
               <li>Computer pontszerző lapok száma: ${computerPoints}</li>
               <li>Computer megszerzett lapok száma: ${computerOwnedCards}</li>
               <li>Pakliban lévő lapok száma: ${deck.length}</li>
                <li>Player lapjainak az értéke: ${playerKeys} </li>
          <li>Computer lapjainak az értéke: ${computerKeys} </li>
        <li>Asztalon lévő lapok értéke: ${tempCardholder}</li>
               ;`;
    // isDisabledPassBtn();
  }
}
// Alapállapotbe helyezés
function toTheBaseState() {
  playerCards = [];
  computerCards = [];
  playerKeys = [];
  computerKeys = [];
  playerPoints = 0;
  computerPoints = 0;
  playerOwnedCards = 0;
  computerOwnedCards = 0;
  deck = copiedDeck;
  tempCardholder = [];
  renderDatas();
}
function renderAfterRound() {
  gameField.innerHTML = "";
  // dealCardsForPlayerAndComputer();
  tempCardholder = [];
  tempAnswer = "";
  // playerKeys = getCardKeys(playerCards).flat();
  // computerKeys = getCardKeys(computerCards).flat();
  renderDatas();
}
// Start button
function startButtonVisibility() {
  if (!startButton) {
    console.error("Start button not found");
    return;
  }
  startButton.style.visibility = deck.length === 32 ? "visible" : "hidden";
}
// Player pass buton
function isDisabledPassBtn() {
  playerPassButton.disabled = playerCards.length === 4 ? true : false;
}
function suffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i + 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}
// Pakliból kártya kivétele
function dealCard(deck) {
  if (deck.length > 0) {
    return deck.shift();
  } else {
    return null;
  }
}
// Játékasztal frissítése
function updateGameTable(cards, gameField) {
  gameField.innerHTML = ""; // Törli az előző tartalmat
  for (const card of cards) {
    const imgElement = document.createElement("img");
    imgElement.classList.add("card");
    imgElement.className = "img";
    imgElement.src = card.img;
    imgElement.alt = `${card.value}`;
    gameField.appendChild(imgElement);
    console.log(gameField);
  }
}
// Játékosok lapjainak kiosztása
function dealCardsForPlayerAndComputer() {
  while (
    deck.length > 0 &&
    playerCards.length < 4 &&
    computerCards.length < 4
  ) {
    if (playerCards.length < 4) {
      let dealtPlayerCard = dealCard(deck);
      if (dealtPlayerCard !== null) {
        playerCards.push(dealtPlayerCard);
      }
      console.log(playerCards);
    }
    if (computerCards.length < 4) {
      let dealtComputerCard = dealCard(deck);
      if (dealtComputerCard !== null) {
        computerCards.push(dealtComputerCard);
      }
    }
  }
  // Játékos kártyáinak renderelése
  updateGameTable(playerCards, playerGameTable);
  // Számítógép kártyáinak renderelése
  updateGameTable(computerCards, computerGameTable);
}
// Kártyák értékének kinyerése
function getCardKeys(cards) {
  return cards.map((card) => card.value);
}
// Player manage cards
function playerManageCards() {
  return new Promise((resolve) => {
    // A void miatt valid, hogy nem ad vissza értéket a promise.
    function handleClick(event) {
      if (event.target.tagName === "IMG" && event.target.className === "img") {
        let selectedAlt = event.target.alt;
        let selectedKey = Number(selectedAlt.slice(1));
        // Ellenőrzi, hogy van-e kártya a gameField-ben
        if (gameField.childElementCount === 0) {
          // Ha 0, vagyis nincs lent kártyalap, akkor bármilyen lapot le lehet rakni.
          gameField.appendChild(event.target);
          processPlayerCard(selectedAlt);
          resolve();
        } else {
          if (gameField.firstChild instanceof HTMLImageElement) {
            let firstCardAlt = gameField.firstChild.alt; // Ezeket később pontosítani!!
            let firstCardKey = Number(firstCardAlt.slice(1)); // Ezeket később pontosítani!!
            // Ellenőrzi, hogy csak akkor engedélyezi a kártya lerakását, ha a kulcsok megegyeznek, vagy ha a kártya értéke 12
            if (selectedKey === firstCardKey || selectedKey === 12) {
              gameField.appendChild(event.target);
              processPlayerCard(selectedAlt);
              resolve();
            } else {
              if (computerCards.length < 4) {
                gameField.appendChild(event.target);
                processPlayerCard(selectedAlt);
                resolve();
              }
            }
          }
        }
      }
    }
    function processPlayerCard(selectedAlt) {
      debugger;
      let index = playerCards.findIndex((card) => card.value === selectedAlt); // Mert a playerCards [ benne {}-k és {value: xy, img: img}!!!]
      if (index > -1) {
        playerCards.splice(index, 1);
        updateGameTable(playerCards, playerGameTable);
        playerImgAlt = selectedAlt;
        playerCurrentKey = selectedAlt.slice(1);
        tempCardholder.push(playerCurrentKey);
        playerKeys.splice(index, 1);
      }
      renderDatas();
      playerGameTable.removeEventListener("click", handleClick);
      playerGameTable.classList.remove("sign");
    }
    playerGameTable.addEventListener("click", handleClick);
    setTimeout(() => {
      playerGameTable.classList.add("sign");
    });
  });
}
// Ez csak teszt, később bővítve lesz:
function playerTurn() {
  return __awaiter(this, void 0, void 0, function* () {
    yield playerManageCards();
  });
}
function startGame() {
  return __awaiter(this, void 0, void 0, function* () {
    let currentDeck = deepClone(deck);
    deck = currentDeck;
    suffleDeck(deck);
    dealCardsForPlayerAndComputer();
    playerKeys = getCardKeys(playerCards);
    computerKeys = getCardKeys(computerCards);
    renderDatas();
    startButtonVisibility();
    yield playerTurn();
  });
}
startButton.addEventListener("click", startGame);
