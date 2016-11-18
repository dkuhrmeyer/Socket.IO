var my_id = null;
var players = {};

var socket = io();
$('document').ready(function () {
    $('#main').hide();
    socket.emit('get user list');

    $('#setUsername').on('click', function (evt) {
        evt.preventDefault();
        socket.emit('set username', $('#username').val());
        $('#usernameForm').hide();
        $('#main').show();
    });

    $('#message_form').submit(function (evt) {
        evt.preventDefault();

        var tim = new Date().toTimeString();
        tim = tim.substr(0, tim.indexOf(" "));

        if ($("#msg").val() != '') {
            var temp = {
                id: my_id,
                msg: $('#msg').val(),
                time: tim
            }
            socket.emit('chat message', temp);
            $('#msg').val("");
        }
        return false;
    });

    socket.on('send user list', function (data) {
        console.log(data);
        players = data;
    });

    socket.on('chat message', function (data) {
        if (data.id === my_id) {
            //$('#messages').append($('<li class="self">').text('<' + data.time + '> You: ' + data.msg));
            $('#messages').append($('<li class="self">').text('<' + data.time + '>').append($('<span class="me">').text('You:')).append(" " + data.msg));
        } else {
            $('#messages').append($('<li>').text("<" + data.time + "> " + players[data.id].name + ': ' + data.msg));
        }
    });

    socket.on('return id', function (data) {
        my_id = data;
    });


    function updateUserList() {
        document.getElementById("userList").innerHTML = '';
        $.each(Object.keys(players), function (i, k) {
            $("#userList").append($('<span class="userid' + ((players[k].id === my_id) ? ' me' : '') + '">').text('| ' + players[k].name + ' |'));
        });
        console.log(players);
    }

    socket.on('user connect', function (data) {
        $('#messages').append($('<li class="user-join">').text(data.name + ' has joined'));
        if (players[data.id] != undefined) {
            delete players[data.id];
        }
        players[data.id] = data;
        updateUserList();
    });

    socket.on('user disconnect', function (data) {
        console.log(data);
        if (players[data] != undefined) {
            $('#messages').append($('<li class="user-leave">').text(players[data].name + ' has left'));
            delete players[data];
            updateUserList();
        }
    });
});