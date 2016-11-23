var WIDTH = 1280;
var HEIGHT = 720;

var stage, queue;
var manifest = [{
    src: "images/eagle.png",
    id: "img-1"
}, {
    src: "images/husky.png",
    id: "img-2"
}, {
    src: "images/pizzaDeliveryGuy.png",
    id: "img-3"
}, {
    src: "images/tank.png",
    id: "img-4"
}, {
    src: "images/Tennant Flat 400.png",
    id: "img-5"
}, {
    src: "images/Prof Pic 400.jpg",
    id: "img-6"
}, {
    src: "images/crab.png",
    id: "img-7"
}, {
    src: "images/boat.png",
    id: "img-8"
}, {
    src: "images/boatTWO.png",
    id: "img-9"
}, {
    src: "images/mountainsONE.png",
    id: "img-10"
}, {
    src: "images/mountainsTWO.png",
    id: "img-11"
}, {
    src: "images/shield.png",
    id: "img-12"
}, {
    src: "images/bell.png",
    id: "img-13"
}, {
    src: "images/bellTwo.png",
    id: "img-14"
}, {
    src: "images/dK.png",
    id: "img-15"
}, {
    src: "images/eightyOne.png",
    id: "img-16"
}, {
    src: "images/pizzaBox.png",
    id: "img-17"
}, {
    src: "images/sunBottleCap.png",
    id: "img-18"
}, {
    src: "images/throwingStar.png",
    id: "img-19"
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