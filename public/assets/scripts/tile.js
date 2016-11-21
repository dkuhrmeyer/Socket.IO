var clicked = [];
var matches = [];

function Tile(val, x, y, wid, hei) {
    this.val = val; /*int*/
    this.obj = new createjs.Container();
    this.front = new createjs.Bitmap(queue.getResult('img-' + val));
    this.back = new createjs.Shape();
    this.back.graphics.beginFill('#efde12').drawRect(0, 0, wid, hei);
    this.back.setBounds(0, 0, wid, hei);
    this.faceup = false;

    this.obj.setBounds(0, 0, wid, hei);

    var fb = this.front.getBounds();

    this.front.x = (this.obj.getBounds().width - fb.width) / 2;
    this.front.y = (this.obj.getBounds().height - fb.height) / 2;

    var bb = this.back.getBounds();

    this.obj.x = x - (.5 * wid);
    this.obj.y = y - (.5 * hei);
    //this.obj.visible = false;
    this.front.visible = this.faceup;
    //this.back.visible = !this.faceup;

    this.obj.addChild(this.back);
    this.obj.addChild(this.front);
    stage.addChild(this.obj);

    var that = this;

    this.showFace = function (showface) {
        that.faceup = showface;
        that.front.visible = that.faceup;
    }

    this.obj.on("click", function (evt) {
        //that.faceup = !that.faceup;
        if (clicked.length < 2) {
            that.showFace(true);
            clicked.push(that);
        }
    });
}