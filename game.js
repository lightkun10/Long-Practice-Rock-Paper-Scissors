const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */
let coins = 0;

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
  const commands = [
    "  Type 'r' for Rock",
    "  Type 'p' for Paper",
    "  Type 's' for Scissors",
    "  Type 'q' to quit",
    "  Type 'h' for a list of valid commands\n"
  ]
  commands.forEach(command => console.log(command));
}

function getWinner(move1, move2) {
  let move1WinsAgainst = VALID_MOVES[move1].winsAgainst;
  let move2WinsAgainst = VALID_MOVES[move2].winsAgainst;

  if (move1WinsAgainst === move2) {
    return 1; // move1 beats move2
  } else if (move2WinsAgainst === move1) {
    return -1; // move2 beats move1
  } else {
    return 0;
  }
}

function getCPUMove() {
  const validMoveKeys = Object.keys(VALID_MOVES);
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
  return validMoveKeys[randomIndex];
}

function processMove(cmd, cpu) {
  console.log(`You pick ${cmd}, computer picks ${cpu}.`);

  let turnResult = getWinner(cmd, cpu);

  if (turnResult === 1) {
    console.log("You win!\n");
    wins++;
  } else if (turnResult === -1) {
    console.log("You lose...\n");
    losses++;
  } else if (turnResult === 0) {
    console.log("You tie.\n");
    ties++;
  }
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);

  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    // Check if coins is zero
    if (coins === 0) {
      displayGameOver();
      rl.close();
      return;
    }

    if (cmd === 'h') {
      console.log("\nHelp:\n");
      printHelp();
    } else if (cmd === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]){
      let cpu = getCPUMove();

      processMove(cmd, cpu);
      coins--;

      if (coins === 0) {
        displayGameOver();
        rl.close();
        return;
      }
    } else {
      console.log("\nInvalid command.\n");
      printHelp();
    }

    promptInput(rl);
  });
}

function insertCoin(rl) {
  console.log("Insert coin(s)...");
  rl.question('> ', (coinInsert) => {
    coins = Number(coinInsert);

    printHelp();
    promptInput(rl);
  })
}

function displayGameOver() {
  console.log("\nGame Over!");
  console.log(`Final Score: ${wins} wins - ${losses} losses - ${ties} ties`);

  if (wins > losses) {
    console.log("YOU WIN!");
  } else if (wins < losses) {
    console.log("YOU LOSE.");
  } else {
    console.log("DRAW!");
  }
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Welcome to Rock/Paper/Scissors\n");

  insertCoin(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};
