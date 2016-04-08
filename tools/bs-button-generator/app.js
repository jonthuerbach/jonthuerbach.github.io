var app = angular.module("buttonGenerator", [
  'ngAnimate'
]);

app.controller("MainCtrl", ["$scope",
  function($scope) {
    $scope.shadeBlend = function (p,c0,c1) {
      var n=p<0?p*-1:p,u=Math.round,w=parseInt;
      if(c0.length>7){
          var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
          return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")";
      }else{
          var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
          return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1);
      }
    };
    $scope.SelectAll = function(id) {
      document.getElementById(id).focus();
      document.getElementById(id).select();
    }
    $scope.customBtn = {
      name: 'btn-custom',
      baseHex: 'F77D0E',
    };
    $scope.updateHex = function() {
      if ($scope.customBtn.baseHex.length === 6) {  
        $scope.generatedValues = {
          btnHex: '#'+$scope.customBtn.baseHex,
          btnHexHover: $scope.shadeBlend(-0.16, '#'+$scope.customBtn.baseHex),
          btnHexBorder: $scope.shadeBlend(-0.08, '#'+$scope.customBtn.baseHex),
          btnHexHoverBorder: $scope.shadeBlend(-0.27, '#'+$scope.customBtn.baseHex),
          btnHexFocusBorder: $scope.shadeBlend(-0.47, '#'+$scope.customBtn.baseHex)
        };
      }
    }
    $scope.updateHex();
  }
]);