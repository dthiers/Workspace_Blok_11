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
    },
    // Insert new user
    insertUser: function(username, options){
      var json = {
        username: username
      }
      $http.post(link + 'users', json).then(
        options.onSuccess, options.onError
      )
    },
    // TODO: delete user by id
    deleteUserById: function(userId, options){
      console.log('delete user');
    },
    // Get all users
    getAllUsers: function(options){
      $http.get(link + 'users').then(
        options.onSuccess, options.onError
      )
    },
    // TODO: insert room
    insertRoom: function(roomName, options){
      var json = {
        roomName: roomName
      }
      $http.post(link + 'rooms', json).then(
        options.onSuccess, options.onError
      )
    },
    // Get all rooms
    getAllRooms: function(options){
      $http.get(link + 'rooms').then(
        options.onSuccess, options.onError
      )
    }
  }

}])
