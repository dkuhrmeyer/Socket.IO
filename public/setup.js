var stage, queue;
var manifest = [{
    src: "scripts/game_states.js"
},{
    src: "scripts/game_engine.js"
},{
    src: "scripts/game_start.js"
}];

function setupCanvas(){
    var canvas = document.getElementById("game");
    canvas.width = 800;
    canvas.height = 600;
    stage = new createjs.Stage(canvas);
}

function loadComplete(evt){
    GAME_STATES.STATE = GAME_STATES.INIT;
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


$('document').ready(function () {
    $('#client_info').submit(function (evt) {
        evt.preventDefault();
        var temp = '';
        socket.emit('get clients', temp);
    });
});