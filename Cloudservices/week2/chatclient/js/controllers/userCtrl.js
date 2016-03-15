app.controller('userCtrl', ['$scope', 'chatService', function(sc, chatService) {

  sc.user = {};
  sc.users = {};
  sc.activeUser;

  // On load check if user is set in localStorage
  if(window.localStorage.getItem('activeUser')){
    sc.activeUser = angular.fromJson(window.localStorage.getItem('activeUser'));
    console.log(sc.activeUser);
  }

  // Create new user
  sc.insertUser = function(username){
    // Err handeling in Mongoose
    if(username){
      chatService.insertUser(username, {
        onSuccess: function(response){
          console.log("successfully inserted new user with name " + username);
        },
        onError: function(response){
          console.log(response);
        }
      })
    } else {
      console.log("Username not defined");
    }
  }


  // Get all rooms
  chatService.getAllUsers({
    onSuccess: function(response){
      console.log(response.data);
      sc.users = response.data;
      window.localStorage.setItem('users', angular.toJson(response.data));
    },
    onError: function(response){
      console.log(response)
    }
  })

  // Change username
  sc.changeUsername = function(){
    chatService.updateUsername(sc.activeUser._id, sc.activeUser.username, {
      onSuccess: function(response){
        console.log("User updated successfully");
        // TODO: get new username
      },
      onError: function(response){
        console.log(response.data);
      }
    });
  }

  // Delete user
  sc.deleteUser = function(user){
    chatService.deleteUserById(user._id)
  }

  // TODO:
  sc.setUserActive = function(user){
    window.localStorage.setItem('activeUser', angular.toJson(user));
    // TODO: naar cache schrijven
    if(sc.activeUser){
      if(sc.activeUser._id === user._id){
        sc.activeUser = null;
      } else {
        sc.activeUser = user;
      }
    } else {
      sc.activeUser = user;
    }
  }

}]);
