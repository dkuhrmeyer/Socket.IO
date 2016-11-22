var WIDTH = 1280;
var HEIGHT = 720;

var stage, queue;
var manifest = [{
    src: "images/eagle.png",
    id: "img-1"
}, {
    src: "images/2.png",
    id: "img-2"
}, {
    src: "images/3.png",
    id: "img-3"
}, {
    src: "images/4.png",
    id: "img-4"
}, {
    src: "images/5.png",
    id: "img-5"
}, {
    src: "images/6.png",
    id: "img-6"
}, {
    src: "images/7.png",
    id: "img-7"
}, {
    src: "images/8.png",
    id: "img-8"
}, {
    src: "images/9.png",
    id: "img-9"
}, {
    src: "images/10.png",
    id: "img-10"
}, {
    src: "images/11.png",
    id: "img-11"
}, {
    src: "images/12.png",
    id: "img-12"
}, {
    src: "images/backOfCard.png",
    id: "backOfCard"
}, {
    src: "scripts/tile.js"
}, {
    src: "scripts/game_states.js"
}, {
    src: "scripts/game_engine.js"
}, {
    src: "scripts/game_start.js"
}, {
    src: "scripts/loop.js"
}, {
    src: "scripts/game_screen_menu.js"
}, {
    src: "scripts/game_screen_instructions.js"
}, {
    src: "scripts/game_screen_level_one.js"
}, {
    src: "scripts/game_buttons.js"
}, {
    src: "images/titleScreen.png",
    id: "title"
}, {
    src: "images/instructionScreen.png",
    id: "instruction"
}, {
    src: "images/levelOneScreen.png",
    id: "levelOne"
}, {
    src: "images/playGameButton.png",
    id: "playGameButton"
}, {
    src: "images/playButton.png",
    id: "playButton"
}, {
    src: "images/continueButton.png",
    id: "continueButton"
}, {
    src: "images/instructionButton.png",
    id: "instructionButton"
}, {
    src: "images/menuButton.png",
    id: "menuButton"
}];

function setupCanvas() {
    var canvas = document.getElementById("game");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    stage = new createjs.Stage(canvas);
}

function loadComplete(evt) {
    GAME_STATES.STATE = GAME_STATES.INIT;
    startLoop();
}

function loadFiles() {
    queue = new createjs.LoadQueue(true, "assets/");
    queue.on("complete", loadComplete, this);
    queue.installPlugin(createjs.Sound);
    queue.loadManifest(manifest);
}

(function main() { //Main
    setupCanvas();
    loadFiles();
})();