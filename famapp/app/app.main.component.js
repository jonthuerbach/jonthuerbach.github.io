'use strict';

(function( angular ){
  angular.module('app.main', [
    'app.navigation.component'
  ])
    .component('appMain', {
      templateUrl: 'app/app-main-tpl.html',
      controller: appMainController
    });

    function appMainController($log, $scope, $timeout) {
      var firebaseConfig = {
        apiKey: "AIzaSyAWnpe_8NHqjaftBnche7BVA05wZBylaOo",
        authDomain: "fam-sched.firebaseapp.com",
        databaseURL: "https://fam-sched.firebaseio.com",
        projectId: "fam-sched",
        storageBucket: "fam-sched.appspot.com",
        messagingSenderId: "827539947460",
        appId: "1:827539947460:web:bc0f16f2c0c1c6787cae91",
        measurementId: "G-L46QLE1HQD"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      
      var ctrl = this;

      ctrl.signInWithEmailAndPassword = signInWithEmailAndPassword;
      ctrl.getAuthInfo = getAuthInfo;
      ctrl.signOut = signOut;
      ctrl.addItem = addItem;
      ctrl.user = null;
      ctrl.$onInit = onInit;

      function signInWithEmailAndPassword(email, password) {
        ctrl.isLoading = true;
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(function(res) {
            ctrl.user = angular.copy(res.user);
            ctrl.isLoading = false;
            ctrl.email = null;
            ctrl.password = null;
            $scope.$apply();
          })
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            ctrl.isLoading = false;
            ctrl.passwordErrorMessage = getPasswordErrorMessage(error);
            //console.log(errorCode + ': ' + errorMessage);
            $scope.$apply();
          });
      }

      function signOut() {
        firebase.auth().signOut().then(function() {
          $timeout(function() {
            ctrl.user = null;
          });
        }).catch(function(error) {
          // handle sign out errors
        });
      }

      function getAuthInfo() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            $timeout(function() {
              ctrl.user = angular.copy(user);
            });
          }
        });
      }

      function getPasswordErrorMessage(error) {
        var message;
        
        switch (error.code) {
          case 'auth/wrong-password':
            message = 'You have entered the incorrect password.';
            ctrl.password = null; // clear out password
            ctrl.loginForm.password.$touched = true;
            break;

          case 'auth/user-not-found':
            message = 'You do not have an account.';
            ctrl.email = null; // clear out password
            ctrl.password = null; // clear out password
            ctrl.loginForm.email.$touched = true;
            break;

          default:
            message = 'Unable to log user in.';
        }

        return message;
      }

      function getItems() {
        var itemsRef = firebase.database().ref('items');
        itemsRef.on('value', function(snapshot) {
          $timeout(function() {
            ctrl.items = snapshot.val();
          });
        });
      }

      function addItem(itemName, categoryName) {
        var id = uuidv4();
        firebase.database().ref('items/' + id).set({
          name: itemName,
          category: categoryName,
        });
      }

      function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      }
      
      // Init
      function onInit() {
        getAuthInfo(); // try to get credentials
        getItems(); //get that data b
      }
    }
})( angular );