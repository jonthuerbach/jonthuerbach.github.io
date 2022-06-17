'use strict';

import {default as Square} from './classes/square.js';
import {default as Game} from './classes/game.js';

let EGG_SPAWN_RATE = 2000,
    STARTING_SECONDS = 60;
let game = new Game(12),
    gameData = game['data'],
    eggs = [],
    secondsElapsed = 0;
 
function buildBoardData(data) {
    let boardData = [];
    for (let row = 0; row < data.length; row++) {
        let boardRowData = [];
        for (let col = 0; col < data[0].length; col++) {
            boardRowData.push(new Square());
        }
        boardData.push(boardRowData);
    }
    return boardData;
}


function doRenderInitialBoardData(data) {
    const boardElem = document.getElementById('board');
    for (let r = 0; r < data.length; r++) {
        const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            rowDiv.setAttribute('id', 'board-row-' + r);
            boardElem.appendChild(rowDiv);
        for (let c = 0; c < data[0].length; c++) {
            const squareDiv = document.createElement('div'),
                currentRowDiv = document.getElementById('board-row-' + r);
            if (data[r][c] === 1) squareDiv.classList.add('active');
            squareDiv.classList.add('col', 'game-square', 'p-0', 'm-1');
            squareDiv.setAttribute('id', 'square-' + r + '-' + c);
            currentRowDiv.appendChild(squareDiv);
        }
    }
    doRenderPlayerSquares(data);
}

function doRenderPlayerSquares(data) {
    const pOnePos = game['playerOnePos'],
        pTwoPos = game['playerTwoPos'],
        playerOneSquareElem = document.getElementById('square-' + pOnePos['r'] + '-' + pOnePos['c']),
        playerTwoSquareElem = document.getElementById('square-' + pTwoPos['r'] + '-' + pTwoPos['c']);
        playerOneSquareElem.classList.add('game-player-one');
        playerTwoSquareElem.classList.add('game-player-two');
}

function doSetInitialPlayerPositions(gameData) {
    const playerTwoPos = gameData.length - 1;
    gameData[0][0]['playerOne'] = true;
    gameData[playerTwoPos][playerTwoPos]['playerTwo'] = true;
}

function doMovePlayerUp(pos, isPlayerOne) {
    let currPos = pos,
        currPosData = gameData[pos['r']][pos['c']];
    if (pos['r'] - 1 >= 0) {
        const nextPosData = gameData[pos['r'] - 1][pos['c']],
            hasFood = nextPosData['food'];
        doRenderPlayerMove(currPos, currPos['r'] - 1, currPos['c'], isPlayerOne);
        if (isPlayerOne) {
            currPosData['playerOne'] = false;
            nextPosData['playerOne'] = true;
            game['playerOnePos']['r'] -= 1;

        } else {
            currPosData['playerTwo'] = false;
            nextPosData['playerTwo'] = true;
            game['playerTwoPos']['r'] -= 1;
        }
        if (hasFood) {
            doCollectFood(nextPosData, pos['r'], pos['c'], isPlayerOne);
        }
    }
}

function doMovePlayerDown(pos, isPlayerOne) {
    let currPos = pos,
        currPosData = gameData[pos['r']][pos['c']];
    if (pos['r'] + 1 < gameData.length) {
        const nextPosData = gameData[pos['r'] + 1][pos['c']],
            hasFood = nextPosData['food'];
        doRenderPlayerMove(currPos, currPos['r'] + 1, currPos['c'], isPlayerOne);
        if (isPlayerOne) {
            currPosData['playerOne'] = false;
            nextPosData['playerOne'] = true;
            game['playerOnePos']['r'] += 1;
        } else {
            currPosData['playerTwo'] = false;
            nextPosData['playerTwo'] = true;
            game['playerTwoPos']['r'] += 1;
        }
        if (hasFood) {
            doCollectFood(nextPosData, pos['r'], pos['c'], isPlayerOne);
        }
    }
}

function doMovePlayerLeft(pos, isPlayerOne) {
    let currPos = pos,
        currPosData = gameData[pos['r']][pos['c']];
    if (pos['c'] - 1 >= 0) {
        const nextPosData = gameData[pos['r']][pos['c'] - 1],
            hasFood = nextPosData['food'];
        doRenderPlayerMove(currPos, currPos['r'], currPos['c'] - 1, isPlayerOne);
        if (isPlayerOne) {
            currPosData['playerOne'] = false;
            nextPosData['playerOne'] = true;
            game['playerOnePos']['c'] -= 1;
        } else {
            currPosData['playerTwo'] = false;
            nextPosData['playerTwo'] = true;
            game['playerTwoPos']['c'] -= 1;
        }
        if (hasFood) {
            doCollectFood(nextPosData, pos['r'], pos['c'], isPlayerOne);
        }
    }
}

function doMovePlayerRight(pos, isPlayerOne) {
    let currPos = pos,
        currPosData = gameData[pos['r']][pos['c']];
    if (pos['c'] + 1 < gameData[0].length) {
        const nextPosData = gameData[pos['r']][pos['c'] + 1],
            hasFood = nextPosData['food'];
        doRenderPlayerMove(currPos, currPos['r'], currPos['c'] + 1, isPlayerOne);
        if (isPlayerOne) {
            currPosData['playerOne'] = false;
            nextPosData['playerOne'] = true;
            game['playerOnePos']['c'] += 1;
        } else {
            currPosData['playerTwo'] = false;
            nextPosData['playerTwo'] = true;
            game['playerTwoPos']['c'] += 1;
        }
        if (hasFood) {
            doCollectFood(nextPosData, pos['r'], pos['c'], isPlayerOne);
        }
    }
}

function doCollectFood(nextPosData, nextPosRow, nextPosCol, isPlayerOne) {
    const squareElem = document.getElementById('square-' + nextPosRow + '-' + nextPosCol),
        eggElem = squareElem.childNodes[0],
        playerOneScoreElem = document.getElementById('game-player-one-score'),
        playerTwoScoreElem = document.getElementById('game-player-two-score');
    
    // collect food
    if (game['isInProgress']) {
        nextPosData['food'] = false;
        squareElem.removeChild(eggElem);
        
        // increase score & update UI
        if (isPlayerOne) {
            game['playerOneScore'] += 1;
            playerOneScoreElem.innerHTML = game['playerOneScore'];
        } else {
            game['playerTwoScore'] += 1;
            playerTwoScoreElem.innerHTML = game['playerTwoScore'];
        }
        eggs.pop();
    }
}

function doSpawnFood(gameData) {
    const len = gameData.length;
    setTimeout(function() {
        if (game['isInProgress'] && eggs.length < Math.floor((len * len)) / 2) {
            doRandomlyPlaceFood(gameData);
        }
        doSpawnFood(gameData);
    }, EGG_SPAWN_RATE);
}

function doRandomlyPlaceFood(gameData) {
    const randRow = Math.floor(Math.random() * gameData.length),
        randCol = Math.floor(Math.random() * gameData[0].length),
        squareElem = document.getElementById('square-' + randRow + '-' + randCol),
        foodElem = document.createElement('span');
    if (!gameData[randRow][randCol]['food'] && !gameData[randRow][randCol]['playerOne'] && !gameData[randRow][randCol]['playerTwo']) {
        foodElem.classList.add('fa-solid', 'fa-egg', 'fa-2x', 'game-food');
        squareElem.appendChild(foodElem);
        gameData[randRow][randCol]['food'] = true;
        eggs.push({'egg': true});
    }
    else {
        doRandomlyPlaceFood(gameData);
    }
}

function doRenderPlayerMove(currPos, nextPosRow, nextPosCol, isPlayerOne) {
    const currSquareElem = document.getElementById('square-' + currPos['r'] + '-' + currPos['c']),
        nextSquareElem = document.getElementById('square-' + nextPosRow + '-' + nextPosCol);
    if (isPlayerOne) {
        currSquareElem.classList.remove('game-player-one');
        nextSquareElem.classList.add('game-player-one');
    } else {
        currSquareElem.classList.remove('game-player-two');
        nextSquareElem.classList.add('game-player-two');
    }
}

function doStartGameTimer() {
    const startDate = new Date(),
        gameClockElem = document.getElementById('game-clock'),
        gameStartBtn = document.getElementById('game-start-button'),
        gameTimeSecondsElem = document.getElementById('game-time-seconds'),
        gameOptionsCollapse = new bootstrap.Collapse('#game-options-collapsible', {
            toggle: false
          });;
    gameTimeSecondsElem.innerHTML = STARTING_SECONDS;
    gameClockElem.classList.remove('d-none');
    gameStartBtn.classList.add('d-none');
    game['isInProgress'] = true;
    gameOptionsCollapse.hide();
    doGameTimerTick(startDate);
}

function doGameTimerTick(startDate) {
    const gameTimeSecondsElem = document.getElementById('game-time-seconds');
    setTimeout(function() {
        if (game['isInProgress']) {
            secondsElapsed += 1;
            if (secondsElapsed >= STARTING_SECONDS) {
                game['isInProgress'] = false;
                doShowEndGameModal();
            }
            let diff = STARTING_SECONDS - secondsElapsed;
            gameTimeSecondsElem.innerHTML = diff;
            
        }
        doGameTimerTick(startDate);

    }, 1000);
}

function doShowEndGameModal() {
    const gameEndModal = new bootstrap.Modal('#game-end-modal'),
        gameEndPlayerOneScoreElem = document.getElementById('game-end-player-one-score'),
        gameEndPlayerTwoScoreElem = document.getElementById('game-end-player-two-score'),
        gameEndWinnerContainerElem = document.getElementById('game-end-winner-container-default'),
        gameEndTieContainerElem = document.getElementById('game-end-tie-container-default'),
        gameEndWinner = document.getElementById('game-end-winner');
        gameEndPlayerOneScoreElem.innerHTML = game.playerOneScore;
        gameEndPlayerTwoScoreElem.innerHTML = game.playerTwoScore;
    if (game.playerOneScore === game.playerTwoScore) {
        gameEndWinnerContainerElem.classList.add('d-none');
        gameEndTieContainerElem.classList.remove('d-none');
    } else if (game.playerOneScore > game.playerTwoScore) {
        gameEndWinner.classList.add('game-end-player-one-score');
        gameEndWinner.innerHTML = 'One';
    } else {
        gameEndWinner.classList.add('game-end-player-two-score');
        gameEndWinner.innerHTML = 'Two';
    }
    gameEndModal.show();
}

function doGameEndClose() {
    const gameEndModal = new bootstrap.Modal('#game-end-modal');
    gameEndModal.hide();
    location.reload();
}

function doShowGameOptions() {
    const gameOptionsCollapse = new bootstrap.Collapse('#game-options-collapsible', {
        toggle: false
      });
      gameOptionsCollapse.toggle();
}

function doSetGameTimeOption(e) {
    e.preventDefault();
    e.stopPropagation();
    STARTING_SECONDS = e.currentTarget.value;
}

function doSetEggSpawnRateOption(e) {
    e.preventDefault();
    e.stopPropagation();
    EGG_SPAWN_RATE = e.currentTarget.value;
}

document.addEventListener('keydown', (event) => {
    var code = event.code;
    event.preventDefault();
    if (code === 'KeyW') doMovePlayerUp(game['playerOnePos'], true);
    if (code === 'KeyS') doMovePlayerDown(game['playerOnePos'], true);
    if (code === 'KeyA') doMovePlayerLeft(game['playerOnePos'], true);
    if (code === 'KeyD') doMovePlayerRight(game['playerOnePos'], true);
    if (code === 'ArrowUp') doMovePlayerUp(game['playerTwoPos'], false);
    if (code === 'ArrowDown') doMovePlayerDown(game['playerTwoPos'], false);
    if (code === 'ArrowLeft') doMovePlayerLeft(game['playerTwoPos'], false);
    if (code === 'ArrowRight') doMovePlayerRight(game['playerTwoPos'], false);
  }, false);

// Buttons
document.getElementById('game-start-button').addEventListener ("click", doStartGameTimer, false);
document.getElementById('game-end-close-btn').addEventListener ("click", doGameEndClose, false);
document.getElementById('game-options-btn').addEventListener ("click", doShowGameOptions, false);
document.getElementById('game-options-form-game-time').addEventListener('change', doSetGameTimeOption, true);
document.getElementById('game-options-form-egg-spawn-rate').addEventListener('change', doSetEggSpawnRateOption, true);

function init() {
    gameData = buildBoardData(gameData);
    doSetInitialPlayerPositions(gameData);
    doRenderInitialBoardData(gameData);
    doSpawnFood(gameData);
}

// Initialize the game!!!
init();