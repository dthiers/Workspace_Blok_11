app.controller('roomCtrl', ['$scope', 'room', 'chatService', function(sc, room, chatService) {
  sc.room = room;

  if(window.localStorage.activeUser){
    sc.activeUser = angular.fromJson(window.localStorage.activeUser);
  }

  chatService.getLinesForRoom(room.roomId, {
    onSuccess: function(response){
      sc.lines = response.data;
      console.log(response.data);
    },
    onError: function(response){
      console.log(response);
    }
  })


  // Add message to room
  sc.addLineToRoom = function(userId, roomId, line){
    if(userId && roomId && line){
      obj = {
        userId: userId,
        roomId: roomId,
        line: line
      };

      chatService.addLineToRoom(obj, {
        onSuccess: function(response){
          console.log("het is gelukt");
          // TODO: sc.lines refreshen
          sc.refresh();
        },
        onError: function(response){
          console.log("het is niet gelukt");
        }
      });

    } else {
      console.log("fuck that");
    }

    sc.newMessage = "";
  }

  sc.refresh = function(){
    chatService.getLinesForRoom(sc.room.roomId, {
      onSuccess: function(response){
        sc.lines = response.data;
      },
      onError: function(response){
        console.log('error');
      }
    })
  }

  sc.getDate = function(line){
    var date = new Date(line.date);
    var options = {
       day: "numeric", year: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit"
    }

    return date.toLocaleDateString("en-us", options);

  }
}])
