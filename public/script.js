var my_id = null;
var players = {};
/*move this outisde this script?*/
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

        if ($("#msg").val() != '') {
            var temp = {
                id: my_id,
                msg: $('#msg').val()
            }
            socket.emit('chat message', temp);
            $('#msg').val("");
        }
        return false;
    });

    socket.on('send user list', function (data) {
        players = data;
        updateUserList();
    });

    socket.on('chat message', function (data) {
        var time = new Date().toTimeString();
        time = time.substr(0, time.indexOf(" "));
        if (data.id === my_id) {
            $('#messages').append($('<li class="self">').text('<' + time + '>').append($('<span class="me">').text('You:')).append(" " + data.msg));
        } else {
            $('#messages').append($('<li>').text("<" + time + "> " + players[data.id].name + ': ' + data.msg));
        }
    });

    socket.on('return id', function (data) {
        my_id = data;
    });

    function updateUserList() {
        document.getElementById("userList").innerHTML = '';
        $.each(Object.keys(players), function (i, k) {
            $("#userList").append($('<tr class="userid' + ((players[k].id === my_id) ? ' me' : '') + '">').text(players[k].name + ': score = ' + players[k].score));
        });
        console.log(players);
    }

    socket.on('update score', function (player) {
        players[player.id] = player;
        updateUserList();
    });

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