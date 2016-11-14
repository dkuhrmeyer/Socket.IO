var socket = io();
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