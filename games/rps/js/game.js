// Firebase Ref
var ref = new Firebase("https://tootie-rps.firebaseio.com");
var gameRef = ref.child("game");
// Variables
var btnReset = $("#btn-reset"),
    btnP1Rock = $("#p1-btn-rock"),
    btnP1Paper = $("#p1-btn-paper"),
    btnP1Scissors = $("#p1-btn-scissors"),
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
btnP1Scissors.click(function() {
  console.log('hi');
})

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
});