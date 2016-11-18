var FPS = 30;

function loop() {
    menu();
}

function startLoop() {
    createjs.Ticker.addEventListener("tick", loop);
    createjs.Ticker.setFPS(FPS);
}