class SnakeAi extends Snake {
    constructor(ctx, name, id, color) {

        super(ctx, name, id, color, 95);

        this.force = 4;
        this.pos = new Point(ut.random(0, WORLD_SIZE.x), ut.random(0, WORLD_SIZE.y));
        this.angle = ut.random(0, Math.PI);

        document.onmousemove = (event) => {
            this.position.x = event.clientX;
            this.position.y = event.clientY;
            this.move();

            console.log(this.position.x, this.position.y)
        };

        this.initAiMovement();
    }

    initAiMovement() {
        var self = this;
        var count = 0;
        var units = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
        var unit = 0.5;
        setInterval(function () {

            if (count > 20) {
                self.angle += 0;
                unit = units[ut.random(0, units.length - 1)];
            } else if (count > 10) self.angle += unit;
            else if (count > 0) self.angle -= unit;

            count++;
            count %= 30;

        }, 100);
    }

    checkBoundary() {

        //left
        if (this.position.x < 0) {
            this.velocity.x *= -1;
            this.angle = Math.PI - this.angle;
        }

        //right
        else if (this.position.x > game.WORLD_SIZE.x) {
            this.velocity.x *= -1;
            this.angle = Math.PI - this.angle;
        }

        //up
        else if (this.position.y < 0) {
            this.velocity.y *= -1;
            this.angle = Math.PI - this.angle;
        }

        //down
        else if (this.position.y > game.WORLD_SIZE.y) {
            this.velocity.y *= -1;
            this.angle = Math.PI - this.angle;
        }
    }

    move() {
        this.velocity.x = this.force * Math.cos(this.angle);
        this.velocity.y = this.force * Math.sin(this.angle);
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        super.move()
        this.checkBoundary();

        this.drawHeadOneEye();
        super.checkCollissionFood()
    }

    drawHeadOneEye() {
        var x = this.pos.x;
        var y = this.pos.y;

        this.ctx.drawImage(
            this.enemyImage,
            0,
            0,
            IMAGE_ENEMY_WIDTH,
            IMAGE_ENEMY_HEIGHT,
            x,
            y,
            IMAGE_ENEMY_WIDTH,
            IMAGE_ENEMY_HEIGHT
        );
    }
}
