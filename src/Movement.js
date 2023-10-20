class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    preload() {
        this.load.spritesheet("char","./assets/spritesheets/Character_002.png",{
            frameWidth: 48,
            frameHeight: 48 //technically unnecessary since the width = height
        });
    }

    create() {
        //console.log('now in movement scene 👍')
        this.cameras.main.setBackgroundColor(0xc5b4d1)
        
        this.player = this.physics.add.sprite(width / 2, height / 2, "char", 1); //frames start from 0
        this.player.body.setCollideWorldBounds(true); //viewport edges are now walls
        //this.player.body.setSize(x,y).setOffset(x,y) //change the collision box of the object, offset the collision box

        this.PLAYER_VELOCITY = 350;

        cursors = this.input.keyboard.createCursorKeys(); //populates object with up, down, left, right, etc... and stores it in cursors


        this.anims.create({
            key:"idle-down",
            frames: this.anims.generateFrameNumbers("char",{
                start: 1,
                end: 1
            }),
            frameRate: 0,
            repeat: -1
        });

        this.anims.create({
            key:"walk-down",
            frames: this.anims.generateFrameNumbers("char",{
                start: 0,
                end: 2
            }),
            frameRate: 15,
            repeat: -1
        });
        
        this.anims.create({
            key:"idle-left",
            frames: this.anims.generateFrameNumbers("char",{
                start: 4,
                end: 4
            }),
            frameRate: 0,
            repeat: -1
        });

        this.anims.create({
            key:"walk-left",
            frames: this.anims.generateFrameNumbers("char",{
                start: 3,
                end: 5
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key:"idle-right",
            frames: this.anims.generateFrameNumbers("char",{
                start: 7,
                end: 7
            }),
            frameRate: 0,
            repeat: -1
        });

        this.anims.create({
            key:"walk-right",
            frames: this.anims.generateFrameNumbers("char",{
                start: 6,
                end: 8
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key:"idle-up",
            frames: this.anims.generateFrameNumbers("char",{
                start: 10,
                end: 10
            }),
            frameRate: 0,
            repeat: -1
        });

        this.anims.create({
            key:"walk-up",
            frames: this.anims.generateFrameNumbers("char",{
                start: 9,
                end: 11
            }),
            frameRate: 15,
            repeat: -1
        });

        this.playerDirection = "down";
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0);
        // let playerDirection = "down";

        if(cursors.left.isDown){
            //this.player.x -= this.PLAYER_VELOCITY;
            playerVector.x = -1
            this.playerDirection = "left";
        } else if(cursors.right.isDown){
            //this.player.x += this.PLAYER_VELOCITY;
            playerVector.x = 1
            this.playerDirection = "right";
        };

        if(cursors.up.isDown){
            //this.player.y -= this.PLAYER_VELOCITY;
            playerVector.y = -1;
            this.playerDirection = "up";
        } else if(cursors.down.isDown){
            //this.player.y += this.PLAYER_VELOCITY;
            playerVector.y = 1;
            this.playerDirection = "down";
        };

        playerVector.normalize(); //normalizes unit vector
        
        // this.player.x += playerVector.x * this.PLAYER_VELOCITY; //actual movement based on player vector
        // this.player.y += playerVector.y * this.PLAYER_VELOCITY;
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y); //move but better

        let playerMovement;
        playerVector.length() ? playerMovement = "walk" : playerMovement = "idle";
        this.player.play(playerMovement + "-" + this.playerDirection, true);
    }
}