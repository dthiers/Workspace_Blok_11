app.controller('chatCtrl', ['$scope', 'chatService', function(sc, chatService) {

  chatService.getAllRooms({
    onSuccess: function(response){
      sc.rooms = response.data;
    },
    onError: function(response){
      console.log(response);
    }
  })

}])
