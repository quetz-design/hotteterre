// -*- js-indent-level: 8 -*-
window.onload = function() {
	//start crafty
	Crafty.init(800, 640);
	Crafty.canvas.init();

	//turn the sprite map into usable components
	Crafty.sprite(32, "images/Woodland_ground.png", {
		grass1: [0,0],
		grass2: [0,1],
		grass3: [0,2],
		grass4: [0,3],
		grass5: [0,4],
		lakeLT: [5,4],
		lakeLM: [5,5],
		lakeLB: [5,6],
		lakeMT: [6,4],
		lakeMM: [6,5],
		lakeMB: [6,6],
		lakeRT: [7,4],
		lakeRM: [7,5],
		lakeRB: [7,6],
		bushLT: [2,4],
		bushLM: [2,5],
		bushLB: [2,6],
		bushMT: [3,4],
		bushMM: [3,5],
		bushMB: [3,6],
		bushRT: [4,4],
		bushRM: [4,5],
		bushRB: [4,6],
		rootL:  [8,2],
		rootR:  [9,2],
		cursor: [15,12],
	});
	Crafty.sprite(32, "images/sprite.png", {
		player: [0,3]
	});

	//method to randomy generate the map
	function generateWorld() {
		var spriteMap = [
			'grass1',
			'grass2',
			'grass3',
			'grass4',
			'grass5',
			'lakeLT',
			'lakeLM',
			'lakeLB',
			'lakeMT',
			'lakeMM',
			'lakeMB',
			'lakeRT',
			'lakeRM',
			'lakeRB',
			'bushLT',
			'bushLM',
			'bushLB',
			'bushMT',
			'bushMM',
			'bushMB',
			'bushRT',
			'bushRM',
			'bushRB',
			'rootL',
			'rootR',
		];
		var map = [
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,],
			[ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,],
			[ 4, 4,23,24, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14,17,17,17,20, 0,],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,15,18,18,18,21, 1,],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,15,18,18,18,21, 2,],
			[ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,15,18,18,18,21, 3,],
			[ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,16,19,19,19,22, 4,],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,],
			[ 8, 8, 8, 8,11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,],
			[ 9, 9, 9, 9,12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
			[ 9, 9, 9, 9,12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[ 9, 9, 9, 9,12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
			[ 9, 9, 9, 9,12, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,],
			[ 9, 9, 9, 9,12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,],
			[ 9, 9, 9, 9,12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
		];

		//generate the grass along the x-axis
		for(var i = 0; i < 20; i++) {
			//generate the grass along the y-axis
			for(var j = 0; j < 20; j++) {
				var entity = map[j][i];
				Crafty.e("2D, Canvas, "+ spriteMap[entity])
					.attr({x: i * 32, y: j * 32});

/*
				//1/50 chance of drawing a flower and only within the bushes
				if(i > 0 && i < 19 && j > 0 && j < 19 && Crafty.math.randomInt(0, 50) > 49) {
					Crafty.e("2D, DOM, flower, solid, SpriteAnimation")
						.attr({x: i * 32, y: j * 32})
						.animate("wind", 0, 1, 3)
						.bind("EnterFrame", function() {
							if(!this.isPlaying())
								this.animate("wind", 80);
						});
				}
*/
			}
		}

		//create the bushes along the x-axis which will form the boundaries
		for(var i = 0; i < 20; i++) {
			Crafty.e("2D, Canvas, wall_top, solid, bush"+Crafty.math.randomInt(1,2))
				.attr({x: i * 32, y: 0, z: 2});
			Crafty.e("2D, DOM, wall_bottom, solid, bush"+Crafty.math.randomInt(1,2))
				.attr({x: i * 32, y: 608, z: 2});
		}

		//create the bushes along the y-axis
		//we need to start one more and one less to not overlap the previous bushes
		for(var i = 1; i < 19; i++) {
			Crafty.e("2D, DOM, wall_left, solid, bush"+Crafty.math.randomInt(1,2))
				.attr({x: 0, y: i * 32, z: 2});
			Crafty.e("2D, Canvas, wall_right, solid, bush"+Crafty.math.randomInt(1,2))
				.attr({x: 608, y: i * 32, z: 2});
		}
	}

	//the loading screen that will display while our assets load
	Crafty.scene("loading", function() {
		//load takes an array of assets and a callback when complete
		Crafty.load(["images/sprite.png"], function () {
			Crafty.scene("main"); //when everything is loaded, run the main scene
		});

		//black background with some loading text
		Crafty.background("#000");
		Crafty.e("2D, DOM, Text").attr({w: 100, h: 20, x: 150, y: 120})
			.text("Loading")
			.css({"text-align": "center"});
	});

	//automatically play the loading scene
	Crafty.scene("loading");

	Crafty.scene("main", function() {
		generateWorld();

		Crafty.c('Hero', {
			init: function() {
					//setup animations
					this.requires("SpriteAnimation, Collision")
					.animate("walk_left", 6, 3, 8)
					.animate("walk_right", 9, 3, 11)
					.animate("walk_up", 3, 3, 5)
					.animate("walk_down", 0, 3, 2)
					//change direction when a direction change event is received
					.bind("NewDirection",
						function (direction) {
							if (direction.x < 0) {
								if (!this.isPlaying("walk_left"))
									this.stop().animate("walk_left", 20, -1);
							}
							if (direction.x > 0) {
								if (!this.isPlaying("walk_right"))
									this.stop().animate("walk_right", 20, -1);
							}
							if (direction.y < 0) {
								if (!this.isPlaying("walk_up"))
									this.stop().animate("walk_up", 20, -1);
							}
							if (direction.y > 0) {
								if (!this.isPlaying("walk_down"))
									this.stop().animate("walk_down", 20, -1);
							}
							if(!direction.x && !direction.y) {
								this.stop();
							}
					})
					// A rudimentary way to prevent the user from passing solid areas
					.bind('Moved', function(from) {
						if(this.hit('solid')){
							this.attr({x: from.x, y:from.y});
						}
					});
				return this;
			}

		});

		Crafty.c("RightControls", {
			init: function() {
				this.requires('Multiway');
			},

			rightControls: function(speed) {
				this.multiway(speed, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})
				return this;
			}

		});

		//create our player entity with some premade components

		player = Crafty.e("2D, Canvas, player, Hero, Animate, Collision")
			.attr({x: 320, y: 576, z: 1});
		crew1 = Crafty.e("2D, Canvas, player, Hero, Animate, Collision")
			.attr({x: 288, y: 576, z: 1});
		crew2 = Crafty.e("2D, Canvas, player, Hero, Animate, Collision")
			.attr({x: 352, y: 576, z: 1});
		crew3 = Crafty.e("2D, Canvas, player, Hero, Animate, Collision")
			.attr({x: 320, y: 544, z: 1});

		cursor = Crafty.e("2D, Canvas, cursor, RightControls")
			.attr({x: 320, y: 576, z: 1})
			.rightControls(4);
	});
};