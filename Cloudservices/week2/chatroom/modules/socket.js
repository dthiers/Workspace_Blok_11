module.exports = function(http){
  var io = null;

  if(!io && http){
    io = require('socket.io')(http);


    io.on('connection', function(socket){
      console.log('connected!')
      socket.emit('test', 'hello world');
      socket.on('test', function(content){
        console.log(content);
      });
    });
  }

  return io;



  //io.connected(' ')

  // return {
  //   SendMSg: function(content){
  //     io.emit('msg', content);
  //   },
  //   SendUpdate:
  // }

}
