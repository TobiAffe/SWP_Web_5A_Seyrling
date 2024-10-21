let xMovement = 0;
let yMovement = 0;
let highScore = 0;

let game = {
    canvas: document.getElementById("field"),
    start() {
        this.speed = 2;
        this.score = 0;
        this.time = 0;
        console.log(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.context.font = "20px Arial";
        this.clear();
        this.interval = setInterval(game_loop, 20);
        this.intervalNewBonus = setInterval(newBonus, 5000);
        this.intervalNewEnemy = setInterval(newEnemy, 600);
        this.intertvalTime = setInterval(time, 1000);
        this.player = new sprite(30, 30, "", 10, 120, true, './img/face-monkey.png');
        this.enemies = [];
        this.bonus = [];
        window.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 65: // A (left)
                    xMovement = -this.speed;
                    break;
                case 87: // W (up)
                    yMovement = -this.speed;
                    break;
                case 68: // D (right)
                    xMovement = this.speed;
                    break;
                case 83: // S (down)
                    yMovement = this.speed;
                    break;
            }
        });
        
        window.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 65: // A (left)
                case 68: // D (right)
                    xMovement = 0;
                    break;
                case 87: // W (up)
                case 83: // S (down)
                    yMovement = 0;
                    break;
            }
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
    game.player.x += xMovement;
    game.player.y += yMovement;
    game.player.redraw();

    game.enemies.forEach((e) => {
        console.log(e)
        let yDelta = Math.floor(Math.random() * 11) - 5;
        e.x -= 1;
        e.y += yDelta;
        e.redraw();
    });

    game.bonus.forEach((e) => {
        e.redraw();
    });

    game.bonus.some((e) => {
        if (game.player.x < e.x + e.width &&
            game.player.x + game.player.width > e.x &&
            game.player.y < e.y + e.height &&
            game.player.y + game.player.height > e.y) {
            game.score += 1; 
            game.speed += 0.5;
            game.bonus.splice(game.bonus.indexOf(e), 1);
            return true;    
        }
    });

    game.enemies.some((e) => {
        if (game.player.x < e.x + e.width &&
            game.player.x + game.player.width > e.x &&
            game.player.y < e.y + e.height &&
            game.player.y + game.player.height > e.y) {
            if(game.score > highScore) {
                highScore = game.score;
            }
            alert("Game over");
            clearInterval(game.interval);
            clearInterval(game.intervalNewEnemy);
            return true;
        }
    });

    let str = "Score: " + game.score;
    game.context.fillText(str, 10, 30);

    str = "Highscore: " + highScore;
    game.context.fillText(str, 10, 50);

    str = "Time: " + game.time;
    game.context.fillText(str, 10, 70);
}

function newEnemy() {
    let y = Math.floor(Math.random() * 1024);
    e = new sprite(30, 30, "", 1000, y, true , './img/face-devilish.png');
    game.enemies.push(e);
}

function newBonus() {
    let y = Math.floor(Math.random() * 1024);
    let x = Math.floor(Math.random() * 1024);
    e = new sprite(30, 30, "", x, y, true , './img/face-cool.png');
    game.bonus.push(e);
}

function time() {
    game.time += 1;
}