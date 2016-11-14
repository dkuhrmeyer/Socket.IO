var PORT = 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var MAX_USERS = 4;
var rooms = [];
/* make rooms */

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log(socket.id + "user has connected");
    socket.on("disconnect", function(){
        console.log(socket.id + "user has disconnected")
    });
    /* do stuff */
    console.log(io.sockets.clients());
    io.emit('list clients', io.sockets.clients().adapter.sids);
    console.log(new Date());

});




http.listen(PORT, function () {
    console.log("listening on localhost:" + PORT);
})