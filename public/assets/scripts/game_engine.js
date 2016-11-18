function menu() {
    switch (GAME_STATES.STATE) {
        case GAME_STATES.INIT:
            setupGame();
            gameMenu();
            break;
        case GAME_STATES.MENU:
            menuScreenView();
            break;
        case GAME_STATES.INSTRUCTIONS:
            instructionScreenView();
            break;
        case GAME_STATES.START:
            firstLevelScreenView();
            break;
        case GAME_STATES.HOLD:
            break;
        default:
            break;
    }
    stage.update();
}