"use strict";
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
    }
    else {
        return null;
    }
}
// Játékasztal frissítése
function updateGameTable(cards, gameTable) {
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
    while (deck.length > 0 &&
        playerCards.length < 4 &&
        computerCards.length < 4) {
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
function getCardKeys(cards) {
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
