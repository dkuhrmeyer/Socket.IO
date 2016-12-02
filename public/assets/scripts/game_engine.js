var locker = true;
var HIDE_DELAY = 30 * 1;
var delay = 0;
var notifyUpdate = false;

function goToMainMenu() {
    $.each(tiles, function (index, tile) {
        stage.removeChild(tile.obj);
    });
    GAME_STATES.STATE = GAME_STATES.MENU;
}

socket.on('winner won', function (player) {
    $('#messages').append($('<li>').append($('<span class="winMsg">').text("Player " + player.name + " won!")));
    goToMainMenu();
    tiles = [];
    clicked = [];
    matches = [];
    locked = [];
});

socket.on('remove tiles', function (indicies) {
    var toBeRemoved = [];
    for (var i in indicies) {
        toBeRemoved.push(tiles[indicies[i]]);
    }
    for (var t in toBeRemoved) {
        var tbr = toBeRemoved[t];
        if (matches.indexOf(tbr) === -1) {
            locked.push(tbr);
        }
        if (clicked.indexOf(tbr) != -1) {
            clicked.splice(clicked.indexOf(tbr), 1);
        }
        stage.removeChild(tbr.obj);
    }
});

socket.on('lock tile', function (index) {
    //    tiles[index].lock();
    console.log('lock tile: ' + index);
    tiles[index].lock();
});

socket.on('unlock tiles', function (indicies) {
    //    tiles[index].unlock();
    console.log('unlock tiles: ' + indicies);
    for (var i in indicies) {
        tiles[indicies[i]].unlock();
    }
});

function menu() {
    switch (GAME_STATES.STATE) {
    case GAME_STATES.INIT:
        setupGame();
        gameMenu();
        break;
    case GAME_STATES.MENU:
        locker = true;
        menuScreenView();
        break;
    case GAME_STATES.INSTRUCTIONS:
        instructionScreenView();
        break;
    case GAME_STATES.START:
        if (locker) {
            locker = false;
            firstLevelScreenView();
            clicked = [];
            matches = [];
            locked = [];
        }

        if (notifyUpdate) {
            notifyUpdate = false;
            clicked = [];
        }
        if (clicked.length === 2) {
            if (clicked[0].val === clicked[1].val) {
                if (delay < HIDE_DELAY) {
                    if (delay === 0) {
                        clicked[0].success();
                        clicked[1].success();
                        console.log("Match!");
                        ding.play();
                    }
                    delay++;
                } else {
                    delay = 0;
                    for (var i in clicked) {
                        matches.push(clicked[i]);
                    }
                    notifyUpdate = true;
                    if ((matches.length + locked.length) === leveldata.arr.length) {
                        socket.emit('gameover');
                    }
                    socket.emit('match', [tiles.indexOf(clicked[0]), tiles.indexOf(clicked[1])]);
                }
            } else {
                if (delay === 0) {
                    buzzer.play();
                }
                if (delay < HIDE_DELAY) {
                    delay++;
                } else {
                    delay = 0;
                    clicked[0].showFace(false);
                    clicked[1].showFace(false);
                    socket.emit('unlock', [
                        tiles.indexOf(clicked[0]),
                        tiles.indexOf(clicked[1])
                    ]);
                    notifyUpdate = true;
                }
            }
        }
        break;
    case GAME_STATES.HOLD:
    case GAME_STATES.WAIT_FOR_PLAYERS:
        break;
    default:
        break;
    }
    stage.update();
}