/*globals Phaser*/
import * as ChangeScene from './ChangeScene.js';
import Player from "./player.js";
import EnemyBasic from "./enemyBasic.js";
export default class level9 extends Phaser.Scene {
  constructor () {
    super('level9');
  }

  preload() {
    const { Engine, Render, World, Bodies, Body, Events } = Phaser.Physics.Matter.Matter;
    this.load.spritesheet("dude", "./assets/sprites/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet('longRangeAttack', './assets/spritesheets/beam.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image('inca_front', '../assets/tilesets/inca_front.png');
    this.load.tilemapTiledJSON("finalBoss", "../assets/tilemaps/finalBoss.json");

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create() {
    //Add event listeners
    ChangeScene.addSceneEventListeners(this);

    this.levelNum = 9;
    this.killedCount = 0;
    this.completedLevel = false;

    //load level
    var map = this.make.tilemap({ key: 'finalBoss' });
    var tileset = map.addTilesetImage('inca_front');
    var layer = map.createDynamicLayer(0, tileset, 0, 0);

    // Set colliding tiles before converting the layer to Matter bodies!
    map.setCollisionByExclusion([ -1, 0, 27, 28]);

    // The exit tile id is 27, and 28;
    var setCompletedLevel = { emitBlock: function() { console.log("haha") } };
    layer = map.setTileIndexCallback([7],setCompletedLevel.emitBlock);

    this.matter.world.convertTilemapLayer(layer);
    this.cameras.main.setBounds(0, 0, 960, 480);
    this.matter.world.setBounds(0, 0, 960, 550);

    //place player
    this.player = new Player(this, 100, 280);

    // Smoothly follow the player
    this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);

    //place enemy
    this.enemy = new EnemyBasic(this, 500, 350);

    this.matterCollision.addOnCollideStart({
      objectA: [ this.player.sensors.left, this.player.sensors.right],
      objectB: this.enemy.sprite,
      callback: eventData => {
        console.log("Player hit an enemy");
      this.enemy.destroy();
      this.killedCount ++ ;
      // eventData.gameObjectB will be the specific enemy that was hit
      }
    });
  }

  update() {
    if (this.player.gameOver) {
      this.player.isStatic = true;

      this.scene.start('gameOverScene', { level: this.levelNum ,
      diamond: 0, killed : this.killedCount,
      done: this.completedLevel});
      return;
    }

    //console.log(this.completedLevel);
    if (this.completedLevel) {
        this.scene.start('gameOverScene', { level: this.levelNum ,
        diamond: 0, killed : this.killedCount,
        done: this.completedLevel});
    }
  }
}
