jQuery(document).ready(function($) {
  
  // Game Object
  var Game = {
    foo: "bar"
  };

  // Global Variables
  var btnLogin = $("#btn-login");

  // Firebase
  var ref = new Firebase("https://jon-rpg-game.firebaseio.com/");


  // Buttons
  btnLogin.click(function() {
    ref.authWithOAuthPopup("facebook", function(error) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        // We'll never get here, as the page will redirect on success.
      }
    });
  });

  console.log(ref);
  
});