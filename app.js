var difficulties = [
    {
        cols: 3,
        rows: 4
    }, {
        cols: 4,
        rows: 4
    }, {
        cols: 4,
        rows: 5
    }, {
        cols: 4,
        rows: 6
    }, {
        cols: 6,
        rows: 6
    }
];


var PORT = 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

/* change this later */
var MAX_USERS = 3;

/* simple array of the room names, should only ever contain strings */
var roomnames = [];

/* players[id] = new Player(...); */
var players = {};

app.use(express.static(__dirname + '/public'));



function Player(id, room) {
    this.id = id;
    this.name = "Anon (" + id.substr(0, 5) + ")"; /* this will be updated when the user submits a name */
    this.room = room; /* not the literal object, just the 'name' of the room */
    this.score = 0;
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
/* socketio server code below here */

io.on('connection', function (socket) {
    var id = socket.id;
    console.log("user with id %s has connected", id);
    socket.emit('return id', id.toString());

    var makeNewRoom = true;
    for (var rn in roomnames) {
        var room = io.sockets.adapter.rooms[roomnames[rn]];
        if (room.length < MAX_USERS) {
            makeNewRoom = false;
            players[id] = new Player(id, roomnames[rn]);
            socket.join(roomnames[rn]);
            rn = Number.MAX_SAFE_INTEGER;
        }
    }
    if (makeNewRoom) {
        console.log("Creating new room and adding user");
        var d = new Date().toString();
        roomnames.push(d);
        players[id] = new Player(id, d);
        socket.join(d);
    }

    /* gets the array of players that are in the same room, inclusive */
    function getPlayersInRoom(includeSelf) {
        includeSelf = ((includeSelf === undefined) ? true : false);
        var ids = Object.keys(io.sockets.adapter.rooms[players[id].room].sockets);
        var pir = {}; /* Players In Room */
        for (var i in ids) {
            var p = players[ids[i]];
            if (p.id === id) {
                if (includeSelf) {
                    pir[p.id] = p;
                }
            } else {
                pir[p.id] = p;
            }
        }
        return pir;
    }

    socket.on('get user list', function () {
        socket.emit('send user list', getPlayersInRoom(false));
    });

    /* only broadcast new user when they have set their username */
    socket.on('set username', function (data) {

        /* only join after sumbitting a username, that way the update fires off properly */
        //socket.join(players[id].room);

        if (data != '') {
            players[id].name = data;
        }

        io.sockets.in(players[id].room).emit('user connect', players[id]);
    });

    socket.on('disconnect', function () {
        if (io.sockets.adapter.rooms[players[id].room] === undefined) {
            console.log("Deleting empty room");
            roomnames.splice(roomnames.indexOf(players[id].room), 1);
        } else {
            console.log("Notifying remaining users in room");
            io.sockets.in(players[id].room).emit('user disconnect', id);
        }
        delete players[id];
    });

    socket.on('chat message', function (data) {
        io.sockets.in(players[id].room).emit('chat message', data);
    });

    socket.on('update score', function (data) {
        //console.log(data);
        io.sockets.in(players[id].room).emit('update score', "this is a test");
    });

    socket.on('get level', function (data) {
        var diff = data;
        var i;
        var oneDimensional = [];
        var twoDimensional = [];
        for (i = 0; i < ((difficulties[diff].cols * difficulties[diff].rows) / 2); i++) {
            oneDimensional.push(i);
            oneDimensional.push(i);
        }

        var j, x, i;
        for (i = oneDimensional.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = oneDimensional[i - 1];
            oneDimensional[i - 1] = oneDimensional[j];
            oneDimensional[j] = x;
        }

        var r, c;
        for (r = 0; r < difficulties[diff].rows; r++) {
            twoDimensional[r] = [];
            for (c = 0; c < difficulties[diff].cols; c++) {
                twoDimensional[r][c] = oneDimensional[(r * difficulties[diff].cols) + c];
            }
        }
        //console.log("%j", twoDimensional);
        //io.sockets.in(players[id].room).emit('post level', twoDimensional);

        var obj = {
            cols: difficulties[diff].cols,
            rows: difficulties[diff].rows,
            arr: oneDimensional,
            grid: twoDimensional
        }

        console.log('%j', obj);

        io.sockets.in(players[id].room).emit('post level', obj);
    });

});

/* http listen below here */
http.listen(PORT, function () {
    console.log("listening on localhost:" + PORT);
});