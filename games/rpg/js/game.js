jQuery(document).ready(function($) {
  // Firebase
  var ref = new Firebase("https://rpg-game-thingy.firebaseio.com/");

  // Global Variables
  var dUsername = $("#d-username"),
      dProfileImage = $("#d-profile-image"),
      btnLogin = $("#btn-login");

  // Functions
  function authenticateUser() {
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        dUsername.text(authData.google.displayName);
        console.log(authData.google.email);
      }
    }, {
      remember: "default",
      scope: "email"
    });
    dUsername.text(authData.google.displayName);
    console.log("ready");
  }

  // Buttons
  btnLogin.click(function() {
    
});  

