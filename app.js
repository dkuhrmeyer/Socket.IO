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
    /* do stuff */
    console.log(new Date());

});

http.listen(PORT, function () {
    console.log("listening on localhost:" + PORT);
})