angular.module('dopeWars2K', [
  'ionic',
  'firebase'
])
.controller('MainCtrl', ['$scope', '$FirebaseArray', 'Auth', 'Leaderboard', function($scope, $FirebaseArray, Auth, Leaderboard) {
  $scope.login = function() {
    Auth.$authWithOAuthPopup("facebook").then(function(authData) {
    }).catch(function(error) {
      if (error.code === "TRANSPORT_UNAVAILABLE") {
        Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
        //console.log(authData);
        });
      } else {
        console.log(error);
      }
    });
  };
  
  $scope.auth = Auth;

  $scope.auth.$onAuth(function(authData) {
    
    $scope.authData = authData;
    if (authData) {
      $scope.gameData = {
        name: authData.facebook.cachedUserProfile.first_name,
        imageUrl: authData.facebook.profileImageURL,
        money: 2000,
        day: 0,
        city: 'Bronx',
        inventory: {
          current: 0,
          max: 100
        },
        drugs: [
          {
            name: 'Ketamine',
            price: 75,
            basePrice: 75,
            amount: 0,
            mult: 1
          },
          {
            name: 'Weed',
            price: 200,
            basePrice: 200,
            amount: 0,
            mult: 1
          },
          {
            name: 'Shrooms',
            price: 550,
            basePrice: 550,
            amount: 0,
            mult: 1
          },
          {
            name: 'Ecstasy',
            price: 1600,
            basePrice: 1600,
            amount: 0,
            mult: 1
          },
          {
            name: 'Meth',
            price: 3750,
            basePrice: 3750,
            amount: 0,
            mult: 1
          },
          {
            name: 'Heroin',
            price: 7500,
            basePrice: 7500,
            amount: 0,
            mult: 1
          },
          {
            name: 'Cocaine',
            price: 16000,
            basePrice: 16000,
            amount: 0,
            mult: 1
          }
        ]
      };
    }
    $scope.leaderboard = Leaderboard;
    $scope.refreshPrices = function() {
      $scope.calcPrice = function(price) {
        var min = price * 0.70;
        var max = price * 1.30;
        return Math.floor(Math.random() * (max - min) + min);
      };
      $scope.clearMult = function() {
        var drugs = $scope.gameData.drugs;
        for (i = 0; i < drugs.length; i++) {
          var drug = drugs[i];
          drug.mult = 1;
        }
      };
      $scope.multChance = function() {
        $scope.clearMult();
        var rand = Math.round(Math.random() * 10),
            drugs = $scope.gameData.drugs;
        if (rand > 8) {
          var rand2 = Math.ceil(Math.random() * 2),
              i = Math.floor(Math.random() * drugs.length);
          if (rand2 == 1) {
            drugs[i].mult = 0.5 * Math.random();
            console.log('buy ' + drugs[i].name);
          }
          else {
            drugs[i].mult = 2 + Math.random();
            console.log('sell ' + drugs[i].name);
          }
        }
      };
      $scope.multChance();
      for (i = 0; i < $scope.gameData.drugs.length; i++) {
        var drug = $scope.gameData.drugs[i];
        drug.price = $scope.calcPrice(drug.basePrice) * drug.mult;
      }
      if ($scope.gameData.day <= 31) {
        $scope.gameData.day += 1;
      }
    };
  
    $scope.drugSales = function($index) {
      var drug = $scope.gameData.drugs[$index],
          inventory = $scope.gameData.inventory;
      $scope.buyUnits = [];
      $scope.sellUnits = [];
      $scope.selectedDrug = {
        name: drug.name,
        amount: drug.amount,
        price: drug.price
      };
      maxBuyCheck = function() {
        if ( Math.floor($scope.gameData.money / drug.price) <= (inventory.max - inventory.current)) {
          $scope.maxBuy = Math.floor($scope.gameData.money / drug.price);
        }
        else {
          $scope.maxBuy = inventory.max - inventory.current;
        }
      };
      maxBuyCheck();
      for (i=1; i <= $scope.maxBuy; i++) {
        $scope.buyUnits.push(i);
      }
      for (i=1; i <= drug.amount; i++) {
        $scope.sellUnits.push(i);
      }
      var lastBuyItem = function(item) {
        var newTotal = item - 1,
            buyUnits = $scope.buyUnits;
        return buyUnits[newTotal];
      };
      var lastSellItem = function(item) {
        var newTotal = item - 1;
        return $scope.sellUnits[newTotal];
      };
      $scope.buySelectedUnits = lastBuyItem($scope.maxBuy);
      $scope.sellSelectedUnits = lastSellItem(drug.amount);
      $scope.calcSellPrice = drug.price * drug.amount;
      $scope.buyDrug = function(units) {
        $scope.gameData.money -= units * drug.price;
        drug.amount += units;
        inventory.current += units;
      };
      $scope.sellDrug = function(units) {
        $scope.gameData.money += units * drug.price;
        drug.amount -= units;
        inventory.current -= units;
      };
    };
    $scope.travel = {
      cities: [
        {
          name: 'Ghetto',
          isCurrent: false
        },
        {
          name: 'Bronx',
          home: true,
          isCurrent: true
        },
        {
          name: 'Central Park',
          isCurrent: false
        },
        {
          name: 'Manhattan',
          bank: true,
          isCurrent: false
        },
        {
          name: 'Coney Island',
          isCurrent: false
        },
        {
          name: 'Brooklyn',
          shop: true,
          isCurrent: false
        },
        {
          name: 'Queens',
          isCurrent: false
        }
      ]
    };
    $scope.changeCityName = function(city) {
      for (i=0; i < $scope.travel.cities.length; i++) {
        $scope.travel.cities[i].isCurrent = false;
      }
      city.isCurrent = true;
      $scope.gameData.city = city.name;
      $scope.refreshPrices();
    };
    $scope.restartGame = function() {
      $scope.shareScore = function() {
        $scope.leaderboard.$add({
          name: $scope.gameData.name,
          money: $scope.gameData.money
        });
      };
      $scope.shareScore();
      $scope.gameData.day = 0;
      $scope.gameData.inventory.current = 0;
      $scope.gameData.money = 2000;
      for (i=0; i<$scope.gameData.drugs.length; i++) {
        $scope.gameData.drugs[i].amount = 0;
      }
      $scope.refreshPrices();
    };
    $scope.refreshPrices();
  });
}])
// Factories
.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://dopewars2k.firebaseio.com");
    return $firebaseAuth(ref);
  }
])
.factory("Leaderboard", function($firebaseArray) {
  var ref = new Firebase("https://dopewars2k.firebaseio.com/leaderboard");
  return $firebaseArray(ref);
})






.config( function($stateProvider, $urlRouterProvider) {
  $stateProvider
  
  .state("market", {
    "url" : "/",
    "templateUrl" : "market.html"
  })
  .state("drug-sales", {
    "url" : "/drug-sales",
    "templateUrl" : "drug-sales.html"
  })
  .state("travel", {
    "url" : "/travel",
    "templateUrl" : "travel.html"
  })
  .state("recruit", {
    "url" : "/recruit",
    "templateUrl" : "recruit.html"
  })
  .state("shop", {
    "url" : "/shop",
    "templateUrl" : "shop.html"
  })
  .state("leaderboard", {
    "url" : "/leaderboard",
    "templateUrl" : "leaderboard.html"
  });
  
  $urlRouterProvider.otherwise("/");
  
})

.controller('MyCtrl', function($scope) {
});