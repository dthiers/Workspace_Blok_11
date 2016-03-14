app.controller('testCtrl', ['$scope', 'testService', function(sc, testService){
  sc.test = "Test";

  sc.clicked = false;

  sc.names = testService.getTest();

  sc.alertThisName = function(name){
    alert(name);
    sc.clicked = !sc.clicked;
  }
}]);
