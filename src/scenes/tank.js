/*global Phaser*/
export default class Tank extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    //tank turret
    this.turret = config.scene.add.sprite(config.x, config.y - 40, 'tankTurret');
    this.turret.setFlipX(true);

    //tank body
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.body.setSize(192, 64);

    //tank shells
    this.shells = this.scene.physics.add.group({
      defaultKey: "shell"
    });

    //variables
    this.moveCounter = 0;
    this.maxCount = 500;
    this.addToMaxCount = 250; //

    this.turretAngleRAD;
    this.turretAngleDEG;

    this.health = 100;
    this.speed = 1.0;
    this.shellSpeed = 1000;
    this.isActive = true;

  }

  //TANK HELPER FUNCTIONS
  reset() {
    console.log('[resetTank]');
    this.tank.isActive = true;
  }

  updateHealth(damage) {
    /*
    function called when player beam hits tank.
    will subtract damage from tank health and if tank health = 0,
    it will update level levelCompleted status
    */
    console.log('[tank.updateHealth]');
    this.health = this.health - damage;
  }

  move() {
    /*
    function to create tank behavior loop:
    back and forth movement, calling shoot function periodically.
    only runs if this.activeTank = true
    */

    if (this.isActive) {
      this.moveCounter += 1

      this.adjustTurretPosition()

      //TANK MOVEMENT
      if (this.moveCounter < (3 * this.maxCount / 4)) {
        //tank moves during first 3/4 of behavior loop
        this.x += this.speed;
        this.turret.x += this.speed;
      } else {
        if (this.moveCounter == Math.floor(7 * this.maxCount / 8)) {
            this.stationaryAttack(this.scene.player);
        }
      }

      //TANK SHOOTING (5 times per count cycle)
      if (this.moveCounter % 100 == 0) {
        this.shoot(this.scene.player);
      }
      if (this.moveCounter % 100 == 25) {
        this.turret.setFrame(0);
      }

      //REPEAT (and expand) BEHAVIOR LOOP
      if (this.moveCounter == this.maxCount) {
        this.maxCount += this.addToMaxCount;
        this.moveCounter = 0;

        //stop tank after third behavior loop
        if (this.maxCount > 1000) {
          this.isActive = false;
          //this.finalFight();
        }
      }
    }
  }

  finalFight() {
    //run fight
    this.isActive = true;
  }

  adjustTurretPosition() {
    /*
    function to adjust turret position based on position
    of the player and the tank body
    */

    //affix turret to top of tank
    if (this.turret.y != this.y) {
      this.turret.y = this.y - 40;
    }

    //TURRET ANGLE
    var betweenPoints = Phaser.Math.Angle.BetweenPoints;
    var angleRAD = betweenPoints(this.turret, this.scene.player);
    var angleDEG = Phaser.Math.RAD_TO_DEG * angleRAD;

    if ((-180 < angleDEG) && (angleDEG < 10) || (angleDEG > 170)) {
      //update turret angle values for use in shoot function
      this.turretAngleRAD = angleRAD;
      this.turretAngleDEG = angleDEG;
      this.turret.setAngle(this.turretAngleDEG);

    } else {
      //reset angle values outside of the range the turret can shoot in
      this.turretAngleRAD = 10;
      this.turretAngleDEG = 10;
    }

  }

  shoot(player) {
    /*
    function to define behavior of tank shooting at the player
    */
    console.log('[tank.shoot]');

    if ((-180 < this.turretAngleDEG) && (this.turretAngleDEG < 10) || (this.turretAngleDEG > 170)) {
      console.log('[tank.shoot]');
      this.turret.play('tankAttack');

      var velocityFromRotation = this.scene.physics.velocityFromRotation;

      //create a variable called velocity from a vector2
      var velocity = new Phaser.Math.Vector2();
      velocityFromRotation(this.turretAngleRAD, this.shellSpeed, velocity);

      //get the shells group and generate shell
      var shell = this.shells.get();
      shell.setAngle(this.turretAngleDEG);
      shell
        .enableBody(true, this.turret.x, this.turret.y, true, true)
        .setVelocity(velocity.x, velocity.y)
    }
  }

  stationaryAttack(player) {
    /*
    function to define the behavior of the tank when it is stationary
    (in the last 1/4 of each behavior loop)
    */
    console.log('[tank.stationaryAttack]');

  }


  //TANK SHELLS HELPER FUNCTIONS
  shellHitWall(shell, worldLayer) {
    /*
    function to check each worldLayer tile the tank shell overlaps with for
    its collides property. destroys the shell if it encounters a tile with
    collides = true (i.e. the shell hit a wall tile)
    */
    if (worldLayer.collides) {
      console.log('[tank.shellHitWall]');
      shell.disableBody(true, true);
      this.bomb.play();
    }
  }

  shellHitPlayer(shell, player) {
    /*
    function to handle overlap between player and tank shell
    (i.e. tank shell hit player)
    */
    console.log('[tank.shellHitPlayer]');
    this.bomb.play();

    //disable shell
    shell.disableBody(true, true);

    //update player stats
    this.player.updateHealth(50);
  }

}
