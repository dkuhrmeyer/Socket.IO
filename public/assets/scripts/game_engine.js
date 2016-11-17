function menu() {
    switch (GAME_STATES.STATE) {
        case GAME_STATES.INIT:
            gameSetup();
            break;
        default:
            break;
    }
    stage.update();
}