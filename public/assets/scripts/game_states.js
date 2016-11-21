var GAME_STATES = {
    STATE: 0,
    HOLD: 9999,
    INIT: 0,
    MENU: 100,
    INSTRUCTIONS: 200,
    WAIT_FOR_PLAYERS: 250,
    START: 300,
    NEXT_LEVEL: 400
};

var leveldata = null;
var tiles = [];

function gameSetup() {
    GAME_STATES.STATE = GAME_STATES.INIT;
}

function gameMenu() {
    GAME_STATES.STATE = GAME_STATES.MENU;
}

function gameInstructions() {
    GAME_STATES.STATE = GAME_STATES.INSTRUCTIONS;
}

function gameStart() {
    GAME_STATES.STATE = GAME_STATES.WAIT_FOR_PLAYERS;
    if (Object.keys(players).length >= 2) {
        socket.emit('start');
    } else {
        alert("Not enough players to start.");
    }
}

socket.on('start', function (data) {
    leveldata = data;
    console.log(data.grid);
    var r, c;
    for (r = 0; r < leveldata.rows; r++) {
        for (c = 0; c < leveldata.cols; c++) {
            var x_origin = (WIDTH / leveldata.cols) * c;
            var y_origin = (HEIGHT / leveldata.rows) * r;
            var x = x_origin + ((WIDTH / leveldata.cols) / 2);
            var y = y_origin + ((HEIGHT / leveldata.rows) / 2);
            tiles.push(new Tile(leveldata.grid[r][c] + 1, x, y, (WIDTH / leveldata.cols) - 5, (HEIGHT / leveldata.rows) - 5));
        }
    }
    GAME_STATES.STATE = GAME_STATES.START;
});

function gameNextLevel() {
    GAME_STATES.STATE = GAME_STATES.NEXT_LEVEL;
}