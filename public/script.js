var socket = io();

$('document').ready(function () {
    $('#client_info').submit(function (evt) {
        evt.preventDefault();
        var temp = '';
        socket.emit('get clients', temp);
    });
});

socket.on("list clients", function (data){
    console.log(data);
});