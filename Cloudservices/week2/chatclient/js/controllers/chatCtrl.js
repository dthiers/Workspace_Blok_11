app.controller('chatCtrl', ['$scope', 'chatService', function(sc, chatService) {

  sc.user = {

  };

  this.userId = "56d8886feb55e8b72e5bbfff";
  console.log(this.userId);
  sc.title = "Chatclient";

  // Retrieve user by userId
  chatService.getUserById(this.userId, {
    onSuccess: function(response){
      console.log(response.data);
      sc.user = response.data;
    },
    onError: function(response){
      sc.user.username = "geen user ingelogd";
      console.log(response);
    }
  })

  // Change username
  sc.changeUsername = function(username){
    chatService.updateUsername(sc.user._id, username, {
      onSuccess: function(response){
        console.log("User updated successfully");
        // TODO: get new username
      },
      onError: function(response){
        console.log(response.data);
      }
    });
  }

}])
