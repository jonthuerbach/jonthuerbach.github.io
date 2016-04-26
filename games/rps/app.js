var app = angular.module("exampleApp", [
  'ngAnimate'
]);
app.controller("MainCtrl", ["$scope",
  function($scope) {
    $scope.gameData = {
      player: {
        name: 'Jabricon',
        money: 2000,
        inventory: {
          max: 100
        },
        drugs: [
          {
            name: 'Ket',
            basePrice: 70,
            price: 70,
            mult: 1,
            units: 0
          },
          {
            name: 'Wee',
            basePrice: 150,
            price: 150,
            mult: 1,
            units: 0
          },
          {
            name: 'Cra',
            basePrice: 400,
            price: 400,
            mult: 1,
            units: 0
          },
          {
            name: 'Mush',
            basePrice: 950,
            price: 950,
            mult: 1,
            units: 0
          },
          {
            name: 'Mol',
            basePrice: 1600,
            price: 1600,
            mult: 1,
            units: 0
          },
          {
            name: 'Aci',
            basePrice: 3200,
            price: 3200,
            mult: 1,
            units: 0
          },
          {
            name: 'Her',
            basePrice: 8000,
            price: 8000,
            mult: 1,
            units: 0
          },
          {
            name: 'Coc',
            basePrice: 16000,
            price: 16000,
            mult: 1,
            units: 0
          }
        ]
      }
    };
    $scope.buyDrugModal = function($index) {
      var drug = $scope.gameData.player.drugs[$index],
          maxBuy = Math.floor($scope.gameData.player.money / drug.price),
          drugModal = $('#buyDrugModal');
      $scope.buyUnits = [];
      for (i=1; i <= maxBuy; i++) {
        $scope.buyUnits.push(i);
      }
      var lastItem = function(item) {
        var newTotal = item - 1;
        return $scope.buyUnits[newTotal];
      };
      $scope.buySelectedUnits = lastItem(maxBuy);
      $scope.buyDrugName = drug.name;
      drugModal.modal();
      $scope.buyDrug = function() {
        $scope.gameData.player.money -= $scope.buySelectedUnits * drug.price;
        drug.units += $scope.buySelectedUnits;
        drugModal.modal('hide');
      };
    };
    $scope.sellDrugModal = function($index) {
      var drug = $scope.gameData.player.drugs[$index],
          maxSell = drug.units,
          drugModal = $('#sellDrugModal');
      $scope.sellUnits = [];
      for (i=1; i <= maxSell; i++) {
        $scope.sellUnits.push(i);
      }
      var lastItem = function(item) {
        var newTotal = item - 1;
        return $scope.sellUnits[newTotal];
      };
      $scope.sellSelectedUnits = lastItem(maxSell);
      $scope.sellDrugName = drug.name;
      drugModal.modal();
      $scope.sellDrug = function() {
        $scope.gameData.player.money += drug.units * drug.price;
        drug.units -= $scope.sellSelectedUnits;
        drugModal.modal('hide');
      };
    };
    $scope.reload = function() {
      $scope.calcPrice = function(price) {
        var min = price * 0.85;
        var max = price * 1.15;
        return Math.floor(Math.random() * (max - min) + min);
      };
      $scope.clearMult = function() {
        var drugs = $scope.gameData.player.drugs;
        for (i = 0; i < drugs.length; i++) {
          var drug = drugs[i];
          drug.mult = 1;
        }
      };
      $scope.multChance = function() {
        $scope.clearMult();
        var rand = Math.round(Math.random() * 10),
            drugs = $scope.gameData.player.drugs;
        if (rand > 8) {
          var i = Math.floor(Math.random() * drugs.length);
          /**/console.log('Sell ' + drugs[i].name);
          drugs[i].mult = 2 + Math.random();
        }
      };
      $scope.multChance();
      // Refresh prices loop
      for (i = 0; i < $scope.gameData.player.drugs.length; i++) {
          var drug = $scope.gameData.player.drugs[i];
          drug.price = $scope.calcPrice(drug.basePrice) * drug.mult;
      }
    };
    $scope.reload();
  }
]);