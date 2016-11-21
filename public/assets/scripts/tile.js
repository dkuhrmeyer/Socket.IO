var green = '#46b541';
var yellow = '#efde12';
var red = '#d83232';

function Tile(val, x, y, wid, hei) {
    this.val = val; /*int*/
    this.obj = new createjs.Container();
    this.front = new createjs.Bitmap(queue.getResult('img-' + val));
    this.back = new createjs.Shape();
    this.back.graphics.beginFill(yellow).drawRect(0, 0, wid, hei);
    this.back.setBounds(0, 0, wid, hei);
    this.faceup = false;
    this.locked = false;

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
    /* ALL FUNCTIONS BELOW THAT = THIS */
    this.showFace = function (showface) {
        that.faceup = showface;
        that.front.visible = that.faceup;
    }

    this.lock = function () {
        that.back.graphics.beginFill(red).drawRect(0, 0, wid, hei);
        that.locked = true;
    }

    this.unlock = function () {
        that.back.graphics.beginFill(yellow).drawRect(0, 0, wid, hei);
        that.locked = false;
    }

    this.success = function () {
        that.back.graphics.beginFill(green).drawRect(0, 0, wid, hei);
    }

    this.obj.on("click", function (evt) {
        //that.faceup = !that.faceup;
        if (!that.locked) {
            if (clicked.length < 2) {
                if (clicked.indexOf(that) === -1 && matches.indexOf(that) === -1) {
                    that.showFace(true);
                    clicked.push(that);
                    socket.emit('lock', tiles.indexOf(that));
                }
            }
        }
    });
}