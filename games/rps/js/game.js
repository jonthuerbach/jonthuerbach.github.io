// Firebase Ref
var ref = new Firebase("https://tootie-rps.firebaseio.com/");
var gameRef = ref.child("game");
// Variables
var headerTest = $("#header-test"),
    p1Msg = $("#p1-message-container"),
    p2Msg = $("#p2-message-container"),
    p1BtnContainer = $("#p1-btn-container"),
    p2BtnContainer = $("#p2-btn-container"),
    battleContainer = $("#battle-container"),
    btnReset = $("#btn-reset"),
    btnP1Rock = $("#p1-btn-rock"),
    btnP1Paper = $("#p1-btn-paper"),
    btnP1Scissors = $("#p1-btn-scissors"),
    btnP2Rock = $("#p2-btn-rock"),
    btnP2Paper = $("#p2-btn-paper"),
    btnP2Scissors = $("#p2-btn-scissors"),
    btnTest = $("#btn-test");

// Buttons
btnTest.click(function() {
  gameRef.set({
    "p1": {
      "isReady": false,
      "rock": false,
      "paper": false,
      "scissors": false
    },
    "p2": {
      "isReady": false,
      "rock": false,
      "paper": false,
      "scissors": false
    }
  });
});
btnP1Rock.click(function() {
  var rockRef = gameRef.child("p1");
  rockRef.update({
      "isReady": true,
      "rock": true
  });
});
btnP1Paper.click(function() {
  var paperRef = gameRef.child("p1");
  paperRef.update({
      "isReady": true,
      "paper": true
  });
});
btnP1Scissors.click(function() {
  var scissorsRef = gameRef.child("p1");
  scissorsRef.update({
      "isReady": true,
      "scissors": true
  });
});
btnP2Rock.click(function() {
  var rockRef = gameRef.child("p2");
  rockRef.update({
      "isReady": true,
      "rock": true
  });
});
btnP2Paper.click(function() {
  var paperRef = gameRef.child("p2");
  paperRef.update({
      "isReady": true,
      "paper": true
  });
});
btnP2Scissors.click(function() {
  var scissorsRef = gameRef.child("p2");
  scissorsRef.update({
      "isReady": true,
      "scissors": true
  });
});

btnReset.click(function() {
  var resetP1 = gameRef.child("p1"),
      resetP2 = gameRef.child("p2");
  resetP1.update({
    "isReady": false,
    "rock": false,
    "paper": false,
    "scissors": false
  });
  resetP2.update({
    "isReady": false,
    "rock": false,
    "paper": false,
    "scissors": false
  });
  p1Msg.fadeOut("fast", function() {
    p1BtnContainer.fadeIn("fast");
  });
  p2Msg.fadeOut("fast", function() {
    p2BtnContainer.fadeIn("fast");
  });
  battleContainer.fadeOut("fast");
});
ref.on("child_changed", function(snapshot) {
  var changed = snapshot.val();
  function checkP1() {
    if (changed.p1.isReady === true) {
      p1BtnContainer.fadeOut("fast", function() {
        p1Msg.fadeIn("fast");
      });
    }
  }
  function checkP2() {
    if (changed.p2.isReady === true) {
      p2BtnContainer.fadeOut("fast", function() {
        p2Msg.fadeIn("fast");
      });
    }
  }
  function battleCheck() {
    if (changed.p1.isReady === true && changed.p2.isReady === true) {
      battleContainer.fadeIn("fast");
    }
  }
  checkP1();
  checkP2();
  battleCheck();
});

// Functions
function init() {
  gameRef.on("value", function(snapshot) {
    var getData = snapshot.val();
    if (getData.p1.isReady === true) {
      p1BtnContainer.fadeOut("fast", function() {
        p1Msg.fadeIn("fast");
      });
    }
    if (getData.p2.isReady === true) {
      p2BtnContainer.fadeOut("fast", function() {
        p2Msg.fadeIn("fast");
      });
    }
    if (getData.p1.isReady === true 
        && getData.p2.isReady === true) {
      battleContainer.fadeIn("fast");
    }
  });
}
init();