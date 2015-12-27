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
      Game.timer = false;
      Game.food.current = 0;
      Game.wood.current = 0;
      Game.rock.current = 0;
      Game.workers = 0;
      Game.workersIncrement = 1;
      Game.workersAvailable = 0;
      Game.workersFarmer = 0;
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
      btnGetRock = $('#btn-get-rock'),
      btnCreateWorker = $('#btn-create-worker'),
      btnFarmersDec = $('#btn-farmers-dec'),
      btnFarmersInc = $('#btn-farmers-inc'),
      
      // Display
      dispFood = $('#display-food'),
      dispFoodTotal = $('#display-food-total'),
      dispFoodDps = $('#display-food-dps'),
      dispWood = $('#display-wood'),
      dispWoodTotal = $('#display-wood-total'),
      dispWoodDps = $('#display-wood-dps'),
      dispRock = $('#display-rock'),
      dispRockTotal = $('#display-rock-total'),
      dispRockDps = $('#display-rock-dps'),
      dispWorkersAvailable = $('#display-workers-available');

  //Define Game Object
  var Game = {
    isNewPlayer: false,
    food: { current: 0, total: 250, dps: 0, inc: 1 },
    wood: { current: 0, total: 250, dps: 0, inc: 1 },
    rock: { current: 0, total: 250, dps: 0, inc: 1 },
    workers: 0,
    workersIncrement: 1,
    workersAvailable: 0,
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
    dispFood.text(Game.food.current);
    dispFoodTotal.text(Game.food.total);
    dispFoodDps.text(Game.food.dps);
    dispWood.text(Game.wood.current);
    dispWoodTotal.text(Game.wood.total);
    dispWoodDps.text(Game.wood.dps);
    dispRock.text(Game.rock.current);
    dispRockTotal.text(Game.rock.total);
    dispRockDps.text(Game.rock.dps);
    dispWorkersAvailable.text(Game.workersAvailable);
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
    Game.food.current++;
    refreshView();
  });
  btnGetWood.click(function() {
    Game.wood.current++;
    refreshView();
  });
  btnGetRock.click(function() {
    Game.rock.current++;
    refreshView();
  });
  btnCreateWorker.click(function() {
    if (Game.food.current >= 20) {
      Game.workers++;
      Game.workersAvailable++;
      Game.food.current -= 20;
      refreshView();
    }
  });
  btnFarmersInc.click(function() {

  });


  // Button Disabled and DPS Checker
  setInterval(function() {
    btnCreateWorker.prop('disabled', Game.food.current <= 19);
    btnFarmersInc.prop('disabled', Game.workersAvailable === 0);
    btnFarmersDec.prop('disabled', Game.workersAvailable === 0);
  }, 100);

  // Main Game Clock
  setInterval(function() {
    if (Game.workers > 0 && Game.food.current > 0) {
      Game.food.current -= 1;
      refreshView();
    }
    
  }, 1000);

  // Init the Game
  init();

});