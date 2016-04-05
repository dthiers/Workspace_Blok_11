app.controller('apiCtrl', ['$scope', 'apiService', function(sc, apiService) {

  sc.title = "API Controller";
  sc.test = apiService.getTest();
}])
