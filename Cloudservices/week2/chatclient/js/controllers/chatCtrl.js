app.controller('chatCtrl', ['$scope', 'chatService', '$location', 'socket', function(sc, chatService, $location) {

  sc.$location = $location;

  var socketService = socketService;

  chatService.getAllRooms({
    onSuccess: function(response){
      sc.rooms = response.data;
    },
    onError: function(response){
      console.log(response);
    }
  })

  // Opens the correct room
  sc.openRoom = function(room){
    $location.path('/room/' + room._id);
  }

}])
