let playerGameTable = document.querySelector(".js-player-table") as HTMLElement;
let computerGameTable = document.querySelector(
  ".js-computer-table"
) as HTMLElement;
let dataField = document.querySelector(".js-datas") as HTMLElement;
let gameField = document.querySelector(".js-gamefield") as HTMLElement;
let gameTable = document.querySelector(".js-game-table") as HTMLElement;
let firstCardKey: number = 0;

let playerCards: any[] = []; // játékos lapjai ENNEK A TÍPUSÁT KÉSŐBB ÁTÍRNI
let playerKeys: number[] = []; // játékos lap értékei
let playerEarnedCards: [] = []; // játékos megszerzett lapok
let playerCurrentKey: string = "";
let playerImgAlt: string = "";
let playerPoints: number = 0;
let playerOwnedCards: number = 0;

let computerCards: any[] = []; // computer lapjai
let computerKeys: number[] = []; // computer lap értékei
let computerEarnedCards: [] = []; // computer megszerzett lapok
let computerCurrentKey: string = "";
let computerImgAlt: string = "";
let computerPoints: number = 0;
let computerOwnedCards: number = 0;

//Buttons

let startButton = document.querySelector(
  ".js-start-button"
) as HTMLButtonElement;
let playerPassButton = document.querySelector(
  ".js-player-pass-button"
) as HTMLButtonElement;

let tempCardholder: [] = [];
let tempAnswer: string = "";

type Card = {
  value: number;
  img: string;
};

let deck: Card[] = [
  { value: 2, img: "./imgs/cards-medium/leaf-unter.png" },
  { value: 3, img: "./imgs/cards-medium/leaf-ober.png" },
  { value: 4, img: "./imgs/cards-medium/leaf-king.png" },
  {
    value: 12,
    img: "./imgs/cards-medium/leaf-seven.png",
  },
  { value: 8, img: "./imgs/cards-medium/leaf-eight.png" },
  { value: 9, img: "./imgs/cards-medium/leaf-nine.png" },
  { value: 10, img: "./imgs/cards-medium/leaf-ten.png" },
  { value: 11, img: "./imgs/cards-medium/leaf-ace.png" },
  {
    value: 2,
    img: "./imgs/cards-medium/acorn-unter.png",
  },
  { value: 3, img: "./imgs/cards-medium/acorn-ober.png" },
  { value: 4, img: "./imgs/cards-medium/acorn-king.png" },
  {
    value: 12,
    img: "./imgs/cards-medium/acorn-seven.png",
  },
  { value: 8, img: "./imgs/cards-medium/acorn-eight.png" },
  { value: 9, img: "./imgs/cards-medium/acorn-nine.png" },
  { value: 10, img: "./imgs/cards-medium/acorn-ten.png" },
  { value: 11, img: "./imgs/cards-medium/acorn-ace.png" },
  { value: 2, img: "./imgs/cards-medium/bell-unter.png" },
  { value: 3, img: "./imgs/cards-medium/bell-ober.png" },
  { value: 4, img: "./imgs/cards-medium/bell-king.png" },
  {
    value: 12,
    img: "./imgs/cards-medium/bell-seven.png",
  },
  { value: 8, img: "./imgs/cards-medium/bell-eight.png" },
  { value: 9, img: "./imgs/cards-medium/bell-nine.png" },
  { value: 10, img: "./imgs/cards-medium/bell-ten.png" },
  { value: 11, img: "./imgs/cards-medium/bell-ace.png" },
  {
    value: 2,
    img: "./imgs/cards-medium/heart-unter.png",
  },
  {
    value: 3,
    img: "./imgs/cards-medium/heart-ober.png",
  },
  {
    value: 4,
    img: "./imgs/cards-medium/heart-king.png",
  },
  {
    value: 12,
    img: "./imgs/cards-medium/heart-seven.png",
  },
  {
    value: 8,
    img: "./imgs/cards-medium/heart-eight.png",
  },
  { value: 9, img: "./imgs/cards-medium/heart-nine.png" },
  {
    value: 10,
    img: "./imgs/cards-medium/heart-ten.png",
  },
  {
    value: 11,
    img: "./imgs/cards-medium/heart-ace.png",
  },
];

function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone) as unknown as T;
  }

  const copy: any = {};
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

function suffleDeck(deck: any) {
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j: number = Math.floor(Math.random() * i + 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Pakliból kártya kivétele

function dealCard(deck: any[]) {
  if (deck.length > 0) {
    return deck.shift();
  } else {
    return null;
  }
}

// Játékasztal frissítése

function updateGameTable(cards: any, gameTable: HTMLElement) {
  gameTable.innerHTML = "";
  for (const card of cards) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    const imgElement = document.createElement("img");
    imgElement.src = card.img;
    imgElement.alt = `Card with value ${card.value}`;
    cardDiv.appendChild(imgElement);
    gameField.appendChild(cardDiv);
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
    }
    if (computerCards.length < 4) {
      let dealtComputerCard = dealCard(deck);
      if (dealtComputerCard !== null) {
        computerCards.push(dealtComputerCard);
      }
    }
  }
  updateGameTable(playerCards, playerGameTable);
  updateGameTable(computerCards, computerGameTable);
}

// Kártyák értékének kinyerése

function getCardKeys(cards: any[]): number[] {
  return cards.map((card) => card.value);
}

function startGame() {
  let currentDeck = deepClone(deck);
  deck = currentDeck;
  suffleDeck(deck);
  dealCardsForPlayerAndComputer();
  playerKeys = getCardKeys(playerCards);
  computerKeys = getCardKeys(computerCards);
  renderDatas();
  startButtonVisibility();
}

startButton.addEventListener("click", startGame);
