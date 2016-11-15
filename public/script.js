var socket = io();
var stage, queue;
var manifest = [{
    
}];

function setupCanvas(){
    var canvas = document.getElementById("game");
    canvas.width = 800;
    canvas.height = 600;
    stage = new createjs.Stage(canvas);
}

function loadComplete(evt){
    GAME_STATES.STATE = GAME_STATES.INIT;
}

function loadFiles(){
    queue = new createjs.LoadQueue(true, "assets/");
    queue.on("complete", loadComplete, this);
    queue.installPlugin(createjs.Sound);
    queue.loadManifest(manifest);
}

(function main() { //Main
    setupCanvas();
    loadFiles();
})();


$('document').ready(function () {
    $('#client_info').submit(function (evt) {
        evt.preventDefault();
        var temp = '';
        socket.emit('get clients', temp);
    });
});

//socket.on('bort', function (msg) {
//    console.log(msg);
//});

function updateUserList(data) {
    console.log(data);
    document.getElementById("userList").innerHTML = '';
    $.each(data, function (i, v) {
        $("#userList").append($('<span class="userid">').text('| ' + v + ' |'));
    });
}

socket.on('user connect', updateUserList);
socket.on('user disconnect', updateUserList);

/* FelBen's Code */

$('#score').submit(function (evt) {
    evt.preventDefault();
    socket.emit('meow');
});

$('#lives').submit(function (evt) {
    evt.preventDefault();
    socket.emit('roar');
});

$('#state').submit(function (evt) {
    evt.preventDefault();
    console.log("button");
    socket.emit('death');
});

socket.on('score update', function (points) {
    $('#prints').prepend($('<li>').text(points.sid + ' now has ' + points.num + ' points'));
});

socket.on('lives update', function (points) {
    $('#prints').prepend($('<li>').text(points.sid + ' now has ' + points.lives + ' lives'));
});

socket.on('status', function (points) {
    $('#prints').prepend($('<li>').text(points.sid + ' is ' + points.state + ' !'));
});