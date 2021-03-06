var titleScreen;

function buildTitle() {
    titleScreen = new createjs.Bitmap(queue.getResult("title"));

    var bnd = titleScreen.getBounds();

    titleScreen.x = (WIDTH - bnd.width) / 2;
    titleScreen.y = 0;
    titleScreen.visible = false;
    stage.addChild(titleScreen);
}

function showTitle() {
    titleScreen.visible = true;
}

function hideTitle() {
    titleScreen.visible = false;
}