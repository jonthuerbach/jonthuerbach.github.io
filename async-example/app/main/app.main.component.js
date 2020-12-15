define( [], function(){ return mainComponent; } );

var mainComponent = {
    controller: ['$log', '$q', '$timeout', 'testService', MainCtrl],
    templateUrl: 'app/main/app-main-tpl.html'
};

function MainCtrl($log, $q, $timeout, testService) {
  var ctrl = this;

  ctrl.$onInit = onInit;
  ctrl.getAllData = getAllData;

  ctrl.dataObject = {
    taskOne: null,
    taskTwo: null,
    taskThree: null
  }

  function onInit() {
    //getAllData();
  }

  function doTaskOne() {
    let deferred = $q.defer();
    ctrl.isTaskOneLoading = true;
    testService.doTaskOne().then(function(res) {
      deferred.resolve(res);
      ctrl.dataObject.taskOne = res;
      ctrl.isTaskOneLoading = false;
    });

    return deferred.promise;
  }

  function doTaskTwo() {
    let deferred = $q.defer();
    ctrl.isTaskTwoLoading = true;
    testService.doTaskTwo().then(function(res) {
      deferred.resolve(res);
      ctrl.dataObject.taskTwo = res;
      ctrl.isTaskTwoLoading = false;
    });

    return deferred.promise;
  }

  function doTaskThree() {
    let deferred = $q.defer();
    ctrl.isTaskThreeLoading = true;
    $timeout(function() {
      let res = {'foo': 'bar'}
      deferred.resolve(res);
      ctrl.dataObject.taskThree = res;
      ctrl.isTaskThreeLoading = false;
    }, 2000);

    return deferred.promise;
  }

  function getAllData() {
    ctrl.isShowingResults = true;
    ctrl.isAllTasksLoading = true;
    $q.all([
      $q.when(doTaskOne()),
      $q.when(doTaskTwo()),
      $q.when(doTaskThree())
    ])
    .then(function(res) {
      console.log(res);
      ctrl.isAllTasksLoading = false;
    });
  }
}