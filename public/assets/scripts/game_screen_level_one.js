var levelOneScreen;

function buildLevelOneScreen() {
    levelOneScreen = new createjs.Bitmap(queue.getResult("levelOne"));
    levelOneScreen.x = 0;
    levelOneScreen.y = 0;
    levelOneScreen.visible = false;
    stage.addChild(levelOneScreen);
}

function showLevelOneScreen() {
    levelOneScreen.visible = true;
}

function hideLevelOneScreen() {
    levelOneScreen.visible = false;
}