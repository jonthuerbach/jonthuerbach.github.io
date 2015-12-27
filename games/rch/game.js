// FastClick.JS
$(function() {
    FastClick.attach(document.body);
});

$( document ).ready(function() {
  
  // Game Save Mechanics
  function loadGame() {
    var result = localStorage.getItem("save");
    Game = JSON.parse(result);
  };
  function saveGame() {
    localStorage.setItem("save", JSON.stringify(Game));
  };
  function resetGame() {
    var r = confirm('Are you sure you want to reset your game? You will lose your game data and it cannot be recovered.');
    if (r === true) {
      localStorage.removeItem("save");
      Game.isNewPlayer = true;
      Game.food = 0;
      Game.wood = 0;
      Game.stone = 0;
      Game.workers= 0;
      Game.workersIncrement= 1;
      Game.workersUnemployed= 0;
      Game.workersFarmer= 0;
      refreshView();
    }
  };
  function gameCheck() {
    if (localStorage.getItem("save") === null) {
      saveGame();
    } else {
      loadGame();
    }
  };

  // New Player Modal
  function newPlayer() {
    //
  };

  // Define Game Variables
      // Buttons
  var btnSaveGame = $('#btn-save-game'),
      btnResetGame = $('#btn-reset-game'),
      btnGetFood = $('#btn-get-food'),
      btnGetWood = $('#btn-get-wood'),
      btnGetStone = $('#btn-get-stone'),
      btnCreateWorker = $('#btn-create-worker'),
      
      // Display
      dispFood = $('#display-food'),
      dispWood = $('#display-wood'),
      dispStone = $('#display-stone'),
      dispWorkersUnemployed = $('#display-workers-unemployed');

  //Define Game Object
  var Game = {
    isNewPlayer: false,
    food: 0,
    foodInc: 1,
    wood: 0,
    stone: 0,
    workers: 0,
    workersIncrement: 1,
    workersUnemployed: 0,
    workersFarmer: 0
  }

  // Game Init Function
  function init() {
    gameCheck();
    // newPlayer();
    refreshView();
  };

  // Game Refresh View
  function refreshView() {
    dispFood.text(Game.food);
    dispWood.text(Game.wood);
    dispStone.text(Game.stone);
    dispWorkersUnemployed.text(Game.workersUnemployed);
  };

  // Button Functions
  btnSaveGame.click(function() {
    saveGame();
    alert('Game Saved');
  });
  btnResetGame.click(function() {
    resetGame();
  });
  btnGetFood.click(function() {
    Game.food++;
    refreshView();
  });
  btnGetWood.click(function() {
    Game.wood++;
    refreshView();
  });
  btnGetStone.click(function() {
    Game.stone++;
    refreshView();
  });
  btnCreateWorker.click(function() {
    if (Game.food >= 20) {
      Game.workers++;
      Game.workersUnemployed++;
      Game.food -= 20;
      refreshView();
    }
  });

  // Button Disabled Checker
  setInterval(function() {
    btnCreateWorker.prop('disabled', Game.food <= 19);
  }, 100);

  // Init the Game
  init();

});