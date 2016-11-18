var stage, queue;
var manifest = [{
    src: "scripts/game_states.js"
},{
    src: "scripts/game_engine.js"
},{
    src: "scripts/game_start.js"
},{
    src: "scripts/loop.js"
},{
    src: "scripts/game_screen_menu.js"
},{
    src: "scripts/game_screen_instructions.js"
},{
    src: "scripts/game_screen_level_one.js"
},{
    src: "scripts/game_buttons.js"
},{
    src: "images/titleScreen.png",
    id: "title"
},{
    src: "images/instructionScreen.png",
    id: "instruction"
},{
    src: "images/levelOneScreen.png",
    id: "levelOne"
},{
    src: "images/playGameButton.png",
    id: "playGameButton"
},{
    src: "images/playButton.png",
    id: "playButton"
},{
    src: "images/continueButton.png",
    id: "continueButton"
},{
    src: "images/instructionButton.png",
    id: "instructionButton"
},{
    src: "images/menuButton.png",
    id: "menuButton"
}];

function setupCanvas(){
    var canvas = document.getElementById("game");
    canvas.width = 800;
    canvas.height = 600;
    stage = new createjs.Stage(canvas);
}

function loadComplete(evt){
    GAME_STATES.STATE = GAME_STATES.INIT;
    startLoop();
}

function loadFiles(){
    queue = new createjs.LoadQueue(true, "assets/");
    queue.on("complete", loadComplete, this);
    queue.installPlugin(createjs.Sound);
    queue.loadManifest(manifest);
}

(function main() { //Main
    setupCanvas();
    loadFiles();
})();


