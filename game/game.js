var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#4488aa',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var paddle;
var ball;
var bricks;
var cursors;

function preload() {
    this.load.image('brick', 'brick.png');
    this.load.image('ball', 'ball.png');
    this.load.image('paddle', 'paddle.png');
}

function create() {
    bricks = this.physics.add.staticGroup({
        key: 'brick',
        repeat: 9,
        setXY: { x: 60, y: 100, stepX: 100 }
    });

    ball = this.physics.add.sprite(400, 500, 'ball');
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);
    ball.setVelocity(Phaser.Math.Between(-200, 200), -300);

    paddle = this.physics.add.sprite(400, 580, 'paddle').setImmovable();
    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(ball, bricks, hitBrick, null, this);
    this.physics.add.collider(ball, paddle, hitPaddle, null, this);
}

function update() {
    if (cursors.left.isDown && paddle.x > 0) {
        paddle.setVelocityX(-350);
    } else if (cursors.right.isDown && paddle.x < config.width) {
        paddle.setVelocityX(350);
    } else {
        paddle.setVelocityX(0);
    }
}












function hitBrick(ball, brick) {
    brick.disableBody(true, true);
}

function hitPaddle(ball, paddle) {
    ball.setVelocity(Phaser.Math.Between(-200, 200), -300);
}
