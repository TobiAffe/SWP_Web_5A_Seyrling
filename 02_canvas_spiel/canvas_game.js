

let game = {
    canvas: document.getElementById("field"),
    start() {
        console.log(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.clear();
        this.interval = setInterval(game_loop, 20);
        this.intervalNewEnemy = setInterval(newEnemy, 600);
        this.player = new sprite(30, 30, "", 10, 120, true, './img/face-monkey.png');
        this.enemies = [];
        this.keyCode = -1; //when there is no key pressed
        window.addEventListener('keydown', (e) => {
            this.keyCode = e.keyCode;
        });

        window.addEventListener('keyup', (e) => {
            this.keyCode = -1;
        });
    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function start() {
    console.log("Game started");
    game.start();
}

function sprite(width, height, color, x, y, img, src) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
    this.img = img;
    this.src = src;
    this.ctx = game.context;

    if (this.img) {
        this.image = new Image();
        this.image.src = this.src;
    }

    this.draw = function () {
        if (this.img) {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    this.draw();

    this.redraw = function () {
        this.draw();
    };
}

function game_loop() {
    game.clear();
    switch (game.keyCode) {
        case 37: //left
            game.player.x -= 2;
            break;
        case 38: //up
            game.player.y -= 2;
            break;
        case 39: //right
            game.player.x += 2;
            break;
        case 40: //down
            game.player.y += 2;
            break;
    }

    game.player.redraw();

    game.enemies.forEach((e) => {
        console.log(e)
        let yDelta = Math.floor(Math.random() * 11) - 5;
        e.x -= 1;
        e.y += yDelta;
        e.redraw();
    })

    game.enemies.some((e) => {
        if (game.player.x < e.x + e.width &&
            game.player.x + game.player.width > e.x &&
            game.player.y < e.y + e.height &&
            game.player.y + game.player.height > e.y) {
            alert("Game over");
            clearInterval(game.interval);
            clearInterval(game.intervalNewEnemy);
            return true;
        }
    });
}

function newEnemy() {
    let y = Math.floor(Math.random() * 1024);
    e = new sprite(30, 30, "blue", 1000, y, false);
    game.enemies.push(e);

}