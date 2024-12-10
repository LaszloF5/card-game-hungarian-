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
let computerKeys: any[] = []; // computer lap értékei
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

let tempCardholder: any[] = [];
let tempAnswer: string = "";

type Card = {
  value: string;
  img: string;
};

let deck: Card[] = [
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

function updateGameTable(cards: Card[], gameField: HTMLElement) {
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

function getCardKeys(cards: any[]): number[] {
  return cards.map((card) => card.value);
}

// Player manage cards

function playerManageCards() {
  return new Promise<void>((resolve) => {
    // A void miatt valid, hogy nem ad vissza értéket a promise.
    function handleClick(event: any) {
      if (event.target.tagName === "IMG" && event.target.className === "img") {
        let selectedAlt: string = event.target.alt;
        let selectedKey: number = Number(selectedAlt.slice(1));
        // Ellenőrzi, hogy van-e kártya a gameField-ben
        if (gameField.childElementCount === 0) {
          // Ha 0, vagyis nincs lent kártyalap, akkor bármilyen lapot le lehet rakni.
          gameField.appendChild(event.target);
          processPlayerCard(selectedAlt);
          resolve();
        } else {
          if (gameField.firstChild instanceof HTMLImageElement) {
            let firstCardAlt: string = gameField.firstChild.alt; // Ezeket később pontosítani!!
            let firstCardKey: number = Number(firstCardAlt.slice(1)); // Ezeket később pontosítani!!
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
    function processPlayerCard(selectedAlt: string) {
      let index = playerCards.findIndex((card) => card.img.alt === selectedAlt);
      if (index > -1) {
        playerCards.splice(index, 1);
        updateGameTable(playerCards, playerGameTable);
        playerImgAlt = selectedAlt;
        playerCurrentKey = selectedAlt.slice(1);
        tempCardholder.push(playerCurrentKey);
        playerKeys.splice(index, 1);
      }
      console.log("playerKeys: ", playerKeys);

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

// Computer manage cards

function computerManageCards() {
  // Első eset: Ez csak a második körtől érvényes: Nem a computer kezdett és nincs olyan lapja amit a játékos rakott, vagy 7-es lapja.
  if (
    gameField.childElementCount !== 0 &&
    gameField.firstChild !== null &&
    gameField.firstChild instanceof HTMLElement &&
    gameField.firstChild.className === "computer-card" &&
    computerCurrentKey !== playerCurrentKey &&
    Number(playerCurrentKey) !== 12
  ) {
    return;
  }
  // Ez egy blokkoló, hogy ha a 3. körben is rakni akarna. Ezt később felülvizsgálni.
  if (
    gameField.childElementCount === 6 &&
    gameField.lastChild !== null &&
    gameField.lastChild instanceof HTMLElement &&
    gameField.lastChild.className === "computer-card"
  ) {
    return;
  }
  // Ellenőrizzük, hogy a computer nem rak le újabb lapot, ha már két lap van lent és a computeré az utolsó
  if (
    gameField.childElementCount === 2 &&
    gameField.lastChild !== null &&
    gameField.lastChild instanceof HTMLElement &&
    gameField.lastChild.className === "computer-card"
  ) {
    return;
  }

  // A második körtől érvényes: Ha a computer kezdte a kört, a játékos ütötte, akkor kötelező a computernek lapot raknia, ha nem tudja ütni, más lapot kell raknia, de valamit kötelező.
  if (
    gameField.childElementCount > 0 &&
    gameField.firstChild !== null &&
    gameField.firstChild !== null &&
    gameField.firstChild instanceof HTMLElement &&
    (playerCurrentKey ===
      (gameField.firstChild as HTMLImageElement).alt.slice(1) ||
      playerCurrentKey === "12") &&
    gameField.lastChild !== null &&
    !computerKeys.includes((gameField.lastChild as HTMLImageElement).alt) &&
    !computerKeys.includes("12")
  ) {
    return roundEvaluation();
  }
  // Ha a gameField üres, a computer random lapot rak
  if (gameField.childElementCount === 0) {
    let nums: string[] = computerKeys.map((key) => key.toString().slice(1));
    let lowValueCards: string[] = nums.filter((num) => {
      return ["2", "3", "4", "8", "9"].includes(num); // Helyes hívás
    });

    let randomCardKey: string =
      lowValueCards.length > 0
        ? lowValueCards[Math.floor(Math.random() * lowValueCards.length)]
        : computerKeys[Math.floor(Math.random() * computerKeys.length)];
    playComputerCard(randomCardKey);
    return;
  }

  // Ha van még lap, és a computer képes érdemben játszani, akkor válasszuk ki a megfelelő kártyalapot.

  let validCard = findValidCard();
  if (validCard) {
    playComputerCard(validCard);
  }
}

function playComputerCard(cardKey: string) {
  // A computerKey szám
  console.log("computer keys: ", computerKeys);
  let numArr: string[] = computerKeys.map((str) => str.slice(1));
  let isContains: number = numArr.indexOf(cardKey); // A computer adott lapjának az indexe.
  computerCurrentKey = computerKeys[isContains];
  tempCardholder.push(computerCurrentKey);

  // let computerIndex = computerKeys.findIndex((card) => {
  //   card === Number(computerCurrentKey);
  // });
  let computerCurrentCard: string = computerKeys[isContains];
  computerKeys.splice(isContains, 1);

  if (computerCurrentCard) {
    console.log("computer cards: ", computerCards);
    let cardHtml = computerCards[isContains].img;
    let cardHtmlValue = computerCards[isContains].value;
    // Itt a cardHtml egy objektum, ami tartalmazza value-t, és az img-t is. (Ha az 1-es index nincs ott.)
    // Kell egy img tag, aminek az src lesz a cardHtml
    let tempDiv = document.createElement("img");
    tempDiv.src = cardHtml;
    tempDiv.alt = cardHtmlValue;
    tempDiv.classList.add("computer-card");
    gameField.appendChild(tempDiv);
    computerCards.splice(isContains, 1);
    updateGameTable(computerCards, computerGameTable);
  }
}

// Computer számára lap keresése

function findValidCard() {
  if (gameField !== null && gameField.firstChild instanceof HTMLImageElement) {
    const firstChild = gameField.firstChild;
    let validCard = computerKeys.find(
      (key) => key === firstChild.alt.slice(1) || key === "12"
    );
    if (!validCard) {
      let computerCardNumbers: string[] = computerKeys.map((key) =>
        key.slice(1)
      );
      validCard = computerCardNumbers.find((key) => {
        ["2", "3", "4", "8", "9"].includes(key);
      });
    }
    if (!validCard) {
      let computerCardNumbers: string[] = computerKeys.map((key) =>
        key.slice(1)
      );
      validCard = computerCardNumbers.find((key) => {
        ["10", "11", "12"].includes(key);
      });
    }
    return validCard;
  }
}

async function playerTurn() {
  // Ha a játékos kezd:
  if (gameField.childElementCount === 0) {
    await playerManageCards();
    return;
  }

  // 1. feltétel: Ha a gameField !== 0, és a computer rakta le az első lapot.
  if (
    gameField.childElementCount !== 0 &&
    gameField.firstChild !== null &&
    gameField.firstChild instanceof HTMLImageElement
  ) {
    // 1.1 feltétel
    // if (gameField.firstChild.className === 'computer-card' && !playerKeys.includes(Number(gameField.firstChild.alt.slice(1))) && !playerKeys.includes(12)) {
    // Itt szerintem az utolsó 2 feltétel értelmetlen.
    // }
    if (gameField.firstChild.className === "computer-card") {
        await playerManageCards();
        setTimeout(async () => {
          await roundEvaluation();
        }, 2000);
        
    }
    // A másik kódban lévő 2. feltétel az előző után jön, fölösleges.
  }
  // 2. feltétel: Ha elfogyott a pakli.

  if (deck.length === 0) {
    // Ez már a játék vége kb.
    // 2.1 feltétel: Ha a gameField nem üres:

    if (
      gameField.childElementCount > 0 &&
      gameField !== null &&
      gameField.firstChild !== null &&
      gameField.firstChild instanceof HTMLImageElement &&
      gameField.firstChild.className !== "computer-card"
    ) {
      // 2.1.1 feltétel:

      if (
        (gameField.firstChild !== null &&
          gameField.firstChild instanceof HTMLImageElement &&
          playerKeys.includes(Number(gameField.firstChild.alt.slice(1)))) ||
        playerKeys.includes(12)
      ) {
        await playerManageCards();
        return;
      } else {
        // Itt a játékos nem rak, mert nincs mit,vagyis a játékos kezdte a kört.
        setTimeout(async () => {
          await roundEvaluation();
        }, 2000);
        
      }
    } else if (
      gameField.childElementCount > 0 &&
      gameField !== null &&
      gameField.firstChild !== null &&
      gameField.firstChild instanceof HTMLImageElement &&
      gameField.firstChild.className === "computer-card"
    ) {
      await playerManageCards();
      setTimeout(async () => {
        await roundEvaluation();
      }, 2000);
      
    }
  }

  // 3. feltétel

  if (playerKeys.length < 4) {
    // 3.1 feltétel: Ha a játékosnak van ütőlapja
    if (
      playerKeys.includes(12) ||
      (gameField.firstChild instanceof HTMLImageElement &&
        gameField.firstChild !== null &&
        playerKeys.includes(Number(gameField.firstChild.alt.slice(1))))
    ) {
      await playerManageCards();
      setTimeout(async () => {
        await roundEvaluation();
      }, 2000);
      
    }
  }
}

// Ez csak teszt, később bővítve lesz:

// async function playerTurn() {
//   await playerManageCards();
// }

async function computerTurn() {
  setTimeout(() => {
    computerManageCards();
  }, 1000);
}

// Ha a játékos kezdi a kört

async function nextPlayerRound() {
  await playerTurn();
  await computerTurn();
  await roundEvaluation();
  return;
}

// Ha a computer kezdi a kört

async function nextComputerRound() {
  await computerTurn();
  await playerTurn();
  await roundEvaluation();
  return;
}

function endGame() {
  if (playerPoints > computerPoints) {
    alert("Nyertél!");
  } else if (computerPoints > playerPoints) {
    alert("A számítógép nyert!");
  } else {
    alert("Döntetlen!");
  }
}

async function roundEvaluation() {
  // aki utoljára helyezte le a kártyalapot, megmutatja, hogy melyik játékos kezdte a kört : gameField.lastChild.alt[1];
  setTimeout(() => {
    kiertekeles();
  }, 2000);
}

async function handlePlayerWins() {
  for (let i = 0; i < tempCardholder.length; ++i) {
    playerOwnedCards += 1;
    if (tempCardholder[i] >= 10 && tempCardholder[i] < 12) {
      playerPoints += 1;
    }
  }
  renderAfterRound();
  if (
    deck.length === 0 &&
    playerCards.length === 0 &&
    computerCards.length === 0
  ) {
    setTimeout(() => {
      endGame();
    }, 2000);
    setTimeout(() => {
      playerGameTable.classList.remove("sign");
      startButton.style.visibility = "visible";
      location.reload();
    }, 2500);
  } else {
    await playerTurn();
    await computerTurn();
    await roundEvaluation();
    return; // További végrehajtás megállítása!!
  }
}

async function handleComputerWins() {
  for (let i = 0; i < tempCardholder.length; ++i) {
    computerOwnedCards += 1;
    if (tempCardholder[i] >= 10 && tempCardholder[i] < 12) {
      computerPoints += 1;
    }
  }
  renderAfterRound();
  if (
    deck.length === 0 &&
    playerCards.length === 0 &&
    computerCards.length === 0
  ) {
    setTimeout(() => {
      endGame();
    }, 2000);
    setTimeout(() => {
      playerGameTable.classList.remove("sign");
      startButton.style.visibility = "visible";
      location.reload();
    }, 2500);
  } else {
    await computerTurn();
    await playerTurn();
    await roundEvaluation();
    return; // További végrehajtás megállítása!!
  }
}

async function passFunction() {
  await handleComputerWins();
}

async function kiertekeles() {

}

async function startGame() {
  let currentDeck = deepClone(deck);
  deck = currentDeck;
  suffleDeck(deck);
  dealCardsForPlayerAndComputer();
  playerKeys = getCardKeys(playerCards);
  computerKeys = getCardKeys(computerCards);
  renderDatas();
  startButtonVisibility();
  // await playerTurn();
  await computerTurn();
}

startButton.addEventListener("click", startGame);
