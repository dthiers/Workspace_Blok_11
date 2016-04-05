app.factory('apiService', function testService() {

  var testService = [
    {name: "Jeff"},
    {name: "Dion"}
  ];

  return {
    getTest: function(){
      return testService;
    }
  }

})
