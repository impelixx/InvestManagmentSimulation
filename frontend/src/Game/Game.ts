import { Scene } from 'phaser'

export class Game extends Scene {
	camera: Phaser.Cameras.Scene2D.BaseCamera
	sky: Phaser.GameObjects.Image
	trees: Phaser.GameObjects.Image
	nearClouds: Phaser.GameObjects.Image
	farClouds: Phaser.GameObjects.Image
	mountains: Phaser.GameObjects.Image
	farMountain: Phaser.GameObjects.Image
	hero: Phaser.Physics.Arcade.Sprite
	keyA: Phaser.Input.Keyboard.Key
	keyD: Phaser.Input.Keyboard.Key
	keySpace: Phaser.Input.Keyboard.Key
	ground: Phaser.GameObjects.TileSprite
	groundPos: number

	isJumping: boolean = false // Track if the hero is jumping
	isAttacking: boolean = false // Track if the hero is currently attacking

	constructor() {
		super('Game')
	}

	preload() {
		this.load.image('sky', 'assets/background/sky.png')
		this.load.image('far-clouds', 'assets/background/far-clouds.png')
		this.load.image('near-clouds', 'assets/background/near-clouds.png')
		this.load.image('far-mountain', 'assets/background/far-mountains.png')
		this.load.image('mountains', 'assets/background/mountains.png')
		this.load.image('trees', 'assets/background/trees.png')

		this.groundPos = 0
		this.load.spritesheet('heroRun', 'assets/Run.png', {
			frameWidth: 128,
			frameHeight: 126,
		})
		this.load.spritesheet('heroIdle', 'assets/Idle.png', {
			frameWidth: 128,
			frameHeight: 128,
		})
		this.load.spritesheet('heroJump', 'assets/Jump.png', {
			frameWidth: 128,
			frameHeight: 128,
		})
		this.load.spritesheet('heroAttack1', 'assets/Attack_1.png', {
			frameWidth: 128,
			frameHeight: 128,
		})
		this.load.spritesheet('heroAttack2', 'assets/Attack_2.png', {
			frameWidth: 128,
			frameHeight: 128,
		})
		this.load.spritesheet('heroAttack3', 'assets/Attack_3.png', {
			frameWidth: 128,
			frameHeight: 128,
		})
		this.load.image('ground', 'assets/groundd.png')
	}

	create() {
		this.sky = this.add.image(512, 384, 'sky').setScale(4)
		this.farClouds = this.add.image(512, 384, 'far-clouds').setScale(8)
		this.nearClouds = this.add.image(512, 384, 'near-clouds').setScale(8)
		this.farMountain = this.add.image(512, 384, 'far-mountain').setScale(8)
		this.mountains = this.add.image(512, 384, 'mountains').setScale(4)
		this.trees = this.add.image(512, 384, 'trees').setScale(4)

		this.hero = this.physics.add.sprite(100, 500, 'heroIdle')
		this.hero.setOrigin(0.5)
		this.hero.setBounce(0.2)
		this.hero.setCollideWorldBounds(true)
		this.hero.setScale(2.5)

		this.createAnimations()

		this.ground = this.add.tileSprite(512, 700, 1024, 350, 'ground')
		this.physics.add.existing(this.ground, true)
		this.physics.add.collider(this.hero, this.ground)

		const groundBody = this.ground.body as Phaser.Physics.Arcade.StaticBody
		groundBody.setSize(1024, 0).setOffset(0, 180)

		if (this.input.keyboard != null) {
			this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
			this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
			this.keySpace = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.SPACE
			)
		}
	}

	createAnimations() {
		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNumbers('heroRun', { start: 0, end: 8 }),
			frameRate: 10,
			repeat: -1,
		})
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('heroIdle', { start: 0, end: 8 }),
			frameRate: 10,
			repeat: -1,
		})
		this.anims.create({
			key: 'jumpMid',
			frames: this.anims.generateFrameNumbers('heroJump', { start: 4, end: 7 }),
			frameRate: 5,
			repeat: 0,
		})
		this.anims.create({
			key: 'jumpStart',
			frames: this.anims.generateFrameNumbers('heroJump', { start: 0, end: 3 }),
			frameRate: 5,
			repeat: 0,
		})
		this.anims.create({
			key: 'jumpEnd',
			frames: this.anims.generateFrameNumbers('heroJump', {
				start: 8,
				end: 10,
			}),
			frameRate: 5,
			repeat: 0,
		})

		this.anims.create({
			key: 'attack1',
			frames: this.anims.generateFrameNumbers('heroAttack1', {
				start: 0,
				end: 3,
			}),
			frameRate: 5,
			repeat: 0,
		})
		this.anims.create({
			key: 'attack2',
			frames: this.anims.generateFrameNumbers('heroAttack2', {
				start: 0,
				end: 3,
			}),
			frameRate: 5,
			repeat: 0,
		})
		this.anims.create({
			key: 'attack3',
			frames: this.anims.generateFrameNumbers('heroAttack3', {
				start: 0,
				end: 3,
			}),
			frameRate: 5,
			repeat: 0,
		})
	}

	update() {
		const isOnGround = this.hero.body?.blocked.down

		if (this.keyD.isDown && !this.isAttacking) {
			this.hero.anims.play('run', true)
			this.hero.flipX = false
			this.ground.tilePositionX += 5
			this.groundPos += 5
			console.log(this.groundPos)
		} else if (this.keyA.isDown && !this.isAttacking) {
			this.hero.anims.play('run', true)
			this.hero.flipX = true
			this.ground.tilePositionX -= 5
			this.groundPos -= 5
			console.log(this.groundPos)
		} else {
			if (
				!this.isAttacking &&
				(!this.hero.anims.isPlaying ||
					this.hero.anims.currentAnim?.key !== 'idle')
			) {
				this.hero.anims.play('idle', true)
			}
		}

		if (
			this.keySpace.isDown &&
			isOnGround &&
			!this.isJumping &&
			!this.isAttacking
		) {
			this.isJumping = true
			this.hero.setVelocityY(-250)
			this.hero.anims.play('jumpStart', true)
			this.hero.anims.play('jumpMid', true)
			this.hero.anims.play('jumpEnd', true)
		} else if (isOnGround) {
			this.isJumping = false
		}

		if (this.input.activePointer.isDown && isOnGround && !this.isAttacking) {
			this.startAttack()
		}

		if (this.isAttacking && !this.hero.anims.isPlaying) {
			this.isAttacking = false
		}
	}

	startAttack() {
		const attackType = Phaser.Math.Between(1, 3)
		if (
			!this.hero.anims.isPlaying ||
			this.hero?.anims?.currentAnim?.key !== `attack${attackType}`
		) {
			this.hero.anims.play(`attack${attackType}`, true)
			this.isAttacking = true
		}
	}
}
