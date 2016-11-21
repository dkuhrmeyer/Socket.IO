var locker = true;
var HIDE_DELAY = 30 * 1;
var delay = 0;

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
        }

        if (clicked.length === 2) {
            if (clicked[0].val === clicked[1].val) {
                //they're the same
                console.log("Match!");
                socket.emit('match');
                for (var i in clicked) {
                    matches.push(clicked[i]);
                }
                clicked = [];

                if (matches.length === leveldata.arr.length) {
                    socket.emit('player win');
                }
            } else {
                if (delay < HIDE_DELAY) {
                    delay++;
                } else {
                    delay = 0;
                    clicked[0].showFace(false);
                    clicked[1].showFace(false);
                    //                    for (var a in clicked) {
                    //                        clicked.pop();
                    //                    }
                    clicked = [];
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