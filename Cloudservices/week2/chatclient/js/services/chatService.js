app.factory('chatService', ['$http', function($http) {

  var link = 'http://localhost:3000/';

  return {
    // Test function
    test: function(){
      return "test";
    },
    // Test function
    alert: function(){
      alert("alert from chatService");
    },
    // Get user by Id
    getUserById: function(userId, options){
      $http.get(link + 'users/' + userId).then(
        options.onSuccess, options.onError
      )
    },
    // Update username by Id
    updateUsername: function(userId, username, options){
      var json = {
        username: username
      }
      console.log(userId);
      $http.put(link + 'users/' + userId, json).then(
        options.onSuccess, options.onError
      )
    }
  }

}])
