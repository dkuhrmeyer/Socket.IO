var PORT = 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var MAX_USERS = 4;
/* make rooms */
var rooms = [];
var s = new Date().toString();
console.log(s);
rooms.push(s);
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    /* do stuff */
    socket.join('waiting room');
    var createNewRoom = true;
    var i;
    for (i = 0; i < rooms.length; i++) {
        console.log(rooms[i]);
        console.log("\t%j", io.sockets.adapter.rooms['waiting room']);
        console.log("\t\t%j", io.sockets.adapter.rooms[rooms[i]]);
        if (io.sockets.adapter.rooms[rooms[i]] === undefined) {
            socket.join(rooms[i]);
            console.log("\t\t%j", io.sockets.adapter.rooms[rooms[i]]);
            createNewRoom = false;
        } else {
            if (io.sockets.adapter.rooms[rooms[i]].length < MAX_USERS) {
                console.log("Open Space for new User");
                socket.join(rooms[i]);
                console.log("\t\t%j", io.sockets.adapter.rooms[rooms[i]]);
                createNewRoom = false;
                /* break out of loop */
                i = Number.MAX_SAFE_INTEGER;
            } else {
                console.log("Room is Full");
            }
        }
    }
    if (createNewRoom) {
        console.log("Making new room");
        var roomName = new Date().toString();
        rooms.push(roomName);
        socket.join(roomName);
        console.log("%j", io.sockets.adapter.rooms[roomName]);
    }
});

http.listen(PORT, function () {
    console.log("listening on localhost:" + PORT);
})