var socket = io();
$('document').ready(function () {
    $('#client_info').submit(function (evt) {
        evt.preventDefault();
        var temp = '';
        socket.emit('get clients', temp);
    });
});

socket.on('bort', function (msg) {
    console.log(msg);
})