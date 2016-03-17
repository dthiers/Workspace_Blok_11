app.controller('roomCtrl', ['$scope', 'room', 'chatService', 'socket', function(sc, room, chatService, socket) {
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
      })
    } else { console.log("fuck that"); }
  }

  // Socket listeners
  // ================

  socket.on('init', function (data) {
    $scope.name = data.name;
    $scope.users = data.users;
  });

  socket.on('send:message', function (message) {
    $scope.messages.push(message);
  });

  socket.on('change:name', function (data) {
    changeName(data.oldName, data.newName);
  });

  socket.on('user:join', function (data) {
    $scope.messages.push({
      user: 'chatroom',
      text: 'User ' + data.name + ' has joined.'
    });
    $scope.users.push(data.name);
  });

  // add a message to the conversation when a user disconnects or leaves the room
  socket.on('user:left', function (data) {
    $scope.messages.push({
      user: 'chatroom',
      text: 'User ' + data.name + ' has left.'
    });
    var i, user;
    for (i = 0; i < $scope.users.length; i++) {
      user = $scope.users[i];
      if (user === data.name) {
        $scope.users.splice(i, 1);
        break;
      }
    }
  });

  // Socket listeners
  // ================

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
