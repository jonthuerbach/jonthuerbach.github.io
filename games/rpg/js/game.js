jQuery(document).ready(function($) {
  
  // Game Object
  var Game = {
    foo: "bar"
  };

  // Global Variables
  var btnLogin = $("#btn-login"),
      btnLogout = $("#btn-logout");

  // Functions
  function authDataCallback(authData) {
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
      console.log("User is logged out");
    }
  }

  // Firebase
  var ref = new Firebase("https://jon-rpg-game.firebaseio.com/");

  // Buttons
  btnLogin.click(function() {
    ref.authWithOAuthRedirect("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        // the access token will allow us to make Open Graph API calls
        // console.log(authData.facebook.accessToken);
      }
    }, {
      scope: "email" // permissions requested
    });
  });
  btnLogout.click(function() {
    ref.unauth();
  });

  ref.onAuth(function(authData) {
    ref.child("users").once('value', function(snapshot) {
      var isNewUser = snapshot.val();
      if (authData && isNewUser === null) {
      // save the user's profile into the database so we can list users,
      // use them in Security and Firebase Rules, and show profiles
        ref.child("users").child(authData.uid).set({
          "id": authData.facebook.id,
          "email": authData.facebook.email,
          "displayName": authData.facebook.displayName,
          "firstName": authData.facebook.cachedUserProfile.first_name,
          "lastName": authData.facebook.cachedUserProfile.last_name,
          "Game": Game
        });
      }
      authDataCallback(authData);
    });
  });

});