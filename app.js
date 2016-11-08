var PORT = 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var MAX_USERS = 4;
/* make rooms */

app.use(express.static(_dirname + '/public'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    /* do stuff */
});

http.listen(PORT, function () {
    console.log("listening on localhost:" + PORT);
})