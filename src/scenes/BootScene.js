/*global Phaser*/
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    console.log('\n[BOOTSCENE]');
    console.log('[preload]');
    //this.load.image('title', './assets/images/gametitle.png');


    //LOAD LEVEL ASSETS
    //tile maps
    this.load.image("incaBackTiles", "../assets/tilesets/inca_back.png");
    this.load.image("incaFrontTiles", "../assets/tilesets/inca_front.png");
    this.load.image("incaBack2Tiles", "../assets/tilesets/inca_back2.png");

    this.load.tilemapTiledJSON("level1map", "../assets/tilemaps/level1map.json");
    this.load.tilemapTiledJSON("level2map", "../assets/tilemaps/level2map.json");
    this.load.tilemapTiledJSON("level3map", "../assets/tilemaps/level3map.json");
    this.load.tilemapTiledJSON("level4map", "../assets/tilemaps/level4map.json");
    this.load.tilemapTiledJSON("level5map", "../assets/tilemaps/level5map.json");
    this.load.tilemapTiledJSON("level6map", "../assets/tilemaps/level6map.json");
    this.load.tilemapTiledJSON("level7map", "../assets/tilemaps/level7map.json");
    this.load.tilemapTiledJSON("finalBossMap", "../assets/tilemaps/finalBossMap.json");

    //items
    this.load.image("gem", "../assets/sprites/gem.png");
    this.load.image("cane", "../assets/sprites/mummyCane.png");

    this.load.image("bullet", "../assets/sprites/Sprite_Bullet.png");
    this.load.image("shell", "../assets/sprites/bomb.png");

    this.load.image("healthBarFrame","../assets/images/healthbarframe.png");
    this.load.image("healthBarFill","../assets/images/healthbarfill.png");
    this.load.image("heart","../assets/images/lifeHeart.png");

    //this.load.image('title', './assets/images/gametitle.png');
    this.load.image('bossbackground', './assets/images/bossbackground.jpg');
    this.load.image('background1', './assets/images/egyptianbackground.jpg');

    console.log('loaded level assets');

    //LOAD SPRITESHEET ASSETS
    //levelPicker


    //player (mummy)
    this.load.spritesheet("mummyIdle", "../assets/spriteSheets/MummyIdle.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("mummyWalk", "../assets/spriteSheets/MummyWalk.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("mummyCaneIdle", "../assets/spriteSheets/Sprite_MummyCane_Idle.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("mummyCaneWalk", "../assets/spriteSheets/Sprite_MummyCane_Walk.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    //Pharaoh mask load
    this.load.spritesheet("pharoahCaneIdle", "../assets/spriteSheets/Sprite_PharoahCane_Idle.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("pharoahCaneWalk", "../assets/spriteSheets/Sprite_PharoahCane_Walk.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("mummyBeam", "../assets/spriteSheets/mummyBeam.png", {
      frameWidth: 44,
      frameHeight: 48
    });
    this.load.spritesheet("mummyCane", "../assets/spriteSheets/mummyCaneAttack.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("pharoahCane", "../assets/spriteSheets/Sprite_PharoahCane_Attack.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("mummyRangeCane", "../assets/spriteSheets/Sprite_MummyCane_RangeAttack.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("pharoahRangeCane", "../assets/spriteSheets/Sprite_PharoahCane_RangeAttack.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    //enemies
    this.load.spritesheet("archeologist", "../assets/spriteSheets/Sprite_Archelogist_Walk.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("soldier", "../assets/spriteSheets/britishSoldierWalk.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("soldierShot", "../assets/spriteSheets/Sprite_British_Soldier_Shot.png", {
      frameWidth: 96,
      frameHeight: 64
    });

    //final boss (tank)
    this.load.spritesheet("tankBase", "../assets/spriteSheets/tankBase.png", {
      frameWidth: 192,
      frameHeight: 64
    });
    this.load.spritesheet("tankTurret", "../assets/spriteSheets/tankTurret.png", {
      frameWidth: 128,
      frameHeight: 30
    });

    console.log('loaded spritesheet assets');

    //LOAD AUDIO ASSETS
    this.load.audio('beam', './assets/sounds/beam.mp3');
    this.load.audio('pops', './assets/sounds/buttonPops.mp3');
    this.load.audio('creepy', './assets/sounds/creepy.mp3');
    this.load.audio('diedCry', './assets/sounds/dyingSound_1.mp3');
    this.load.audio('diedYell', './assets/sounds/dyingSound_2.mp3');
    this.load.audio('bomb', './assets/sounds/explosion.mp3');
    this.load.audio('HE', './assets/sounds/HappyEndingPlay.mp3');
    this.load.audio('pickupSound', './assets/sounds/pickup.mp3');
    this.load.audio('meleeAttack', './assets/sounds/MeleeAttack.mp3');
    this.load.audio('short', './assets/sounds/short.mp3');
    this.load.audio('platformerSound', './assets/sounds/typicalPlatformer.mp3');
    console.log('loaded audio assets');
  }

  create (data) {
    console.log('[create]');

    var titleImage = this.add.image(470,120, "title").setScale(.5,.5);

    this.loadingTxt = this.add.text(380, 400, "Loading game...",{
      fontFamily: 'Arial',
      fontSize: 52,
      color: '#FFFFFF'});
    //CREATE SPRITE ANIMATIONS
    //player (mummy)
    this.anims.create({
      key: "mummyIdleAnim",
      frames: this.anims.generateFrameNumbers("mummyIdle"),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "mummyWalkAnim",
      frames: this.anims.generateFrameNumbers("mummyWalk"),
      frameRate: 10,
      repeat: -1
    });
    //With cane
    this.anims.create({
      key: "mummyCaneIdleAnim",
      frames: this.anims.generateFrameNumbers("mummyCaneIdle"),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "mummyCaneWalkAnim",
      frames: this.anims.generateFrameNumbers("mummyCaneWalk"),
      frameRate: 10,
      repeat: -1
    });
    //With pharaoh mask
    this.anims.create({
      key: "pharoahCaneIdleAnim",
      frames: this.anims.generateFrameNumbers("pharoahCaneIdle"),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "pharoahCaneWalkAnim",
      frames: this.anims.generateFrameNumbers("pharoahCaneWalk"),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "mummyCaneAnim",
      frames: this.anims.generateFrameNumbers("mummyCane"),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "pharoahCaneAnim",
      frames: this.anims.generateFrameNumbers("pharoahCane"),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "mummyRangeCaneAnim",
      frames: this.anims.generateFrameNumbers("mummyRangeCane", {start: 0, end: 6}),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "pharoahRangeCaneAnim",
      frames: this.anims.generateFrameNumbers("pharoahRangeCane", {start: 0, end: 6}),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "mummyBeamAnim",
      frames: this.anims.generateFrameNumbers("mummyBeam"),
      frameRate: 10,
      repeat: 0
    });

    //enemies
    this.anims.create({
      key: "archeologistAnim",
      frames: this.anims.generateFrameNumbers("archeologist"),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "soldierAnim",
      frames: this.anims.generateFrameNumbers("soldier"),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "soldierShotAnim",
      frames: this.anims.generateFrameNumbers("soldierShot"),
      frameRate: 10,
      repeat: -1
    });

    //final boss (tank)
    this.anims.create({
      key: "tankMove",
      frames: this.anims.generateFrameNumbers("tankBase"),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "tankAttack",
      frames: this.anims.generateFrameNumbers("tankTurret"),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    console.log('created spritesheet animations');


    console.log('[BOOTSCENE COMPLETE]');
    this.scene.start("menu");
  }

  update (time, delta) {
    // Update the scene
    this.loadingTxt.text = "Loading game.." + ".";
  }
}
