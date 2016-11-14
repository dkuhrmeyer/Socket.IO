var PORT = 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var MAX_USERS = 4;
/* make rooms */
var rooms = [];
var Players = [];
var userMap = {};
app.use(express.static(__dirname + '/public'));

/* Note to Felipe: Try to put the object definition/function above all code that creates an instance of it or JSLint will squawk at us */
function player(id) {
    this.id = id;
    this.score = 0;
    this.lives = 5;
    this.status = false;
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log(socket.id + " user has connected");
    var new_player = new player(socket.id);
    Players.push(new_player);
    var createNewRoom = true;
    var i;

    if (rooms.length === 0) {
        var s = new Date().toString();
        rooms.push(s);
    }

    for (i = 0; i < rooms.length; i++) {
        console.log(rooms[i]);
        if (io.sockets.adapter.rooms[rooms[i]] === undefined) {
            socket.join(rooms[i]);
            userMap[socket.id.toString()] = rooms[i];
            createNewRoom = false;
            i = Number.MAX_SAFE_INTEGER;
        } else {
            if (io.sockets.adapter.rooms[rooms[i]].length < MAX_USERS) {
                console.log("Open Space for new User");
                socket.join(rooms[i]);
                createNewRoom = false;
                userMap[socket.id.toString()] = rooms[i];
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
        userMap[socket.id.toString()] = roomName;
    }

    var room = userMap[socket.id.toString()].toString();

    io.sockets.in(room).emit('user connect', Object.keys(io.sockets.adapter.rooms[userMap[socket.id.toString()]].sockets));

    socket.on('disconnect', function () {
        if (io.sockets.adapter.rooms[userMap[socket.id.toString()]] === undefined) {
            /* fixes the issue where the non-existant room is kept in the custom array */
            rooms.splice(rooms.indexOf(room), 1);
        } else {
            console.log(socket.id + " user has disconnected");
            socket.broadcast.to(room).emit('user disconnect', Object.keys(io.sockets.adapter.rooms[userMap[socket.id.toString()]].sockets));
        }
        console.log("%j", rooms);
    });

    /* FelBen's Code */

    socket.on('death', function () {
        for (var i = 0; i < Players.length; i++) {
            if (Players[i].id === socket.id) {
                if (Players[i].status) {
                    io.emit('status', {
                        state: "Dead",
                        sid: socket.id
                    });
                    Players[i].status = !Players[i].status;

                } else {
                    io.emit('status', {
                        state: "Alive",
                        sid: socket.id
                    });
                    Players[i].status = !Players[i].status;
                }
            }
        }
    });

    socket.on('meow', function () {
        console.log("score pressed");
        for (var i = 0; i < Players.length; i++) {
            if (Players[i].id === socket.id) {
                Players[i].score++;
                io.emit('score update', {
                    num: Players[i].score,
                    sid: socket.id,
                });
                console.log(Players[i].id + " score: " + Players[i].score);
            }
        }
    });

    socket.on('roar', function () {
        for (var i = 0; i < Players.length; i++) {
            if (Players[i].id === socket.id) {
                Players[i].lives--;
                io.emit('lives update', {
                    lives: Players[i].lives,
                    sid: socket.id,
                });
                console.log(Players[i].id + " Lives Left: " + Players[i].lives);
            }
        }
    });

});

http.listen(PORT, function () {
    console.log("listening on localhost:" + PORT);
})