var done = false;

function setupGame(){
    buildTitle();
    buildInstructionScreen();
    buildLevelOneScreen();
    buildButtons();
    setButtonListeners();
    setButtons();
    menuScreenView();
}

function menuScreenView(){
    hideInstructionScreen();
    showTitle();
    showPlayGameButton();
    showInstructionButton();
}

function instructionScreenView(){
    hidePlayGameButton();
    hideInstructionButton();
    showInstructionScreen();
    showMenuButton();
    
}

function firstLevelScreenView(){
    hideTitle();
    hideInstructionScreen();
    hidePlayGameButton();
    hideInstructionButton();
    hideMenuButton();
    showLevelOneScreen();
}

function nextLevel() {
    switch (counter) {
    case 0:
        //firstLevelScreenView();
        break;
    case 1:
        //levelTwoView();
        break;
    case 2:
        //levelThreeView();
        break;
    case 3:
        //gameVictory();
        break;
    }
}