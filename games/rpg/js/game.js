jQuery(document).ready(function($) {
  // Firebase
  var ref = new Firebase("https://rpg-game-thingy.firebaseio.com/");

  // Global Variables
  var dUsername = $("#d-username"),
      dProfileImage = $("#d-profile-image"),
      btnLogin = $("#btn-login");

  // Buttons
  btnLogin.click(function() {
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log(authData.google.profileImageURL);
        dUsername.text(authData.google.displayName);
      }
    });
  });
  dUsername.text(authData.google.displayName);
  console.log("ready");
});  
