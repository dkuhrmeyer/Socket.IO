var GAME_STATES = {
    STATE: 0,
    INIT: 0,
    MENU: 1,
    HOLD: 9999,
    INSTRUCTIONS: 2,
    START: 3,
    NEXT_LEVEL: 4
    
};

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
    GAME_STATES.STATE = GAME_STATES.START;
}

function gameNextLevel() {
    GAME_STATES.STATE = GAME_STATES.NEXT_LEVEL;
}