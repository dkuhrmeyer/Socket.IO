var instructionScreen;

function buildInstructionScreen() {
    instructionScreen = new createjs.Bitmap(queue.getResult("instruction"));
    instructionScreen.x = 0;
    instructionScreen.y = 0;
    instructionScreen.visible = false;
    stage.addChild(instructionScreen);
}

function showInstructionScreen() {
    instructionScreen.visible = true;
}

function hideInstructionScreen() {
    instructionScreen.visible = false;
}