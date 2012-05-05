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

	Crafty.sprite(96, "images/portraits.png", {
		keldorn: [0, 0],
		valygar: [1, 0],
		edwin: [2, 0],
		imoen: [3, 0],
	});

	//[Name, HP, maxHP, MP, maxMP, ATK, DEF, MOV, AGI]
	var character = [
		['Keldorn Firecam',		'keldorn', '100', '100', '10', '10', '3', '3', '4', '5'],
		['Valygar Corlatha',	'valygar', '75', '80', '15', '15', '2', '3', '3', '3'],
		['Edwin Odessieron',	'edwin', '50', '50', '30', '30', '1', '3', '2', '4'],
		['Imoen',				'imoen', '200', '200', '0', '0', '3', '5', '2', '2'],
	];

	var LandMap = function() {
		this.spriteMap = [
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
		this.map = [
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
	};

	landMap = new LandMap();

	var Locator = {
		getFieldX: function(px) {
			return Math.round(px / 32);
		},

		getFieldY: function(px) {
			return Math.round(px / 32);
		},
	}

	var HUD = function(prop) {
		this.init = function(prop) {
			this.prop = prop;
			for (var k in this.prop) {
				this.prop[k].__HUD__ = this;
			}
		},

		this.dismiss = function() {
			for (var k in this.prop) {
				if (this.prop[k].destroy)
					this.prop[k].destroy();
			}
		}

		this.init(prop);
	}

	var HUDBuilder = {
		X: 180,
		Y: 20,

		describeLand: function(land) {
			var x = HUDBuilder.X;
			var y = HUDBuilder.Y;
			base = Crafty.e("2D, DOM, Image")
				.attr({x: x, y: y})
				.image("images/hudbox.png")

			title = Crafty.e("2D, DOM, Text, HUD_Land")
				.attr({x: x + 128, y: y + 12})
				.text(land)
				.css({"text-align": "left", "font-family": "'Economica', sans-serif"});

			return new HUD({base:base, title:title, _type:'land'});
		},

		describeCharacter: function(name) {
			var x = HUDBuilder.X;
			var y = HUDBuilder.Y;
			base = Crafty.e("2D, DOM, Image")
				.attr({x: x, y: y})
				.image("images/hudbox.png")

			var record = character.filter(
				function (e, idx, ar) {
					return e[1] == name;
				})[0];

			portlait = Crafty.e("2D, DOM, " + record[1])
				.attr({x: x + 16, y: y + 12});

			title = Crafty.e("2D, DOM, Text, HUD_Character")
				.attr({x: x + 128, y: y + 12, w: 400})
				.text(record[0])
				.css({"text-align": "left", "font-family": "'Economica', sans-serif", "font-size": "30px"});

			hp = Crafty.e("2D, DOM, Text")
				.attr({x: x + 128, y: y + 56, w: 200})
				.text("HP: " + record[2] + "/" + record[3])
				.css({"text-align": "left", "font-family": "'Economica', sans-serif", "font-size": "18px"});

			mp = Crafty.e("2D, DOM, Text")
				.attr({x: x + 128, y: y + 56 + 24, w: 200})
				.text("MP: " + record[4] + "/" + record[5])
				.css({"text-align": "left", "font-family": "'Economica', sans-serif", "font-size": "18px"});

			atk = Crafty.e("2D, DOM, Text")
				.attr({x: x + 128 + 128, y: y + 56, w: 200})
				.text("ATK: " + record[6])
				.css({"text-align": "left", "font-family": "'Economica', sans-serif", "font-size": "18px"});

			def = Crafty.e("2D, DOM, Text")
				.attr({x: x + 128 + 128, y: y + 56 + 24, w: 200})
				.text("DEF: " + record[7])
				.css({"text-align": "left", "font-family": "'Economica', sans-serif", "font-size": "18px"});

			mov = Crafty.e("2D, DOM, Text")
				.attr({x: x + 128 + 128 + 80, y: y + 56, w: 200})
				.text("MOV: " + record[8])
				.css({"text-align": "left", "font-family": "'Economica', sans-serif", "font-size": "18px"});

			agi = Crafty.e("2D, DOM, Text")
				.attr({x: x + 128 + 128 + 80, y: y + 56 + 24, w: 200})
				.text("AGI: " + record[9])
				.css({"text-align": "left", "font-family": "'Economica', sans-serif", "font-size": "18px"});

			return new HUD({base:base, portlait:portlait, title:title, hp:hp, mp:mp, atk:atk, def:def, mov:mov, agi:agi, _type:'character', _name:name});
		}
	}

	//method to randomy generate the map
	function generateWorld() {

		//generate the grass along the x-axis
		for(var i = 0; i < 20; i++) {
			//generate the grass along the y-axis
			for(var j = 0; j < 20; j++) {
				var entity = landMap.map[j][i];
				Crafty.e("2D, Canvas, "+ landMap.spriteMap[entity])
					.attr({x: i * 32, y: j * 32});
			}
		}

		//create the bushes along the x-axis which will form the boundaries
		for(var i = 0; i < 20; i++) {
			Crafty.e("2D, Canvas, wall_top, solid, bush"+Crafty.math.randomInt(1,2))
				.attr({x: i * 32, y: 0, z: 2});
			Crafty.e("2D, DOM, wall_bottom, solid, bush"+Crafty.math.randomInt(1,2))
				.attr({x: i * 32, y: 608, z: 2});
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

		LocationMap = function () {
			this.map = {};

			this.lookup = function (x, y) {
				for (var k in this.map) {
					if (this.map[k].x == x && this.map[k].y == y)
						return k;
				}
				return '_undefined_';
			}

			this.mark = function (name, x, y) {
				if (!this.map[name])
					this.map[name] = {};
				this.map[name].x = x;
				this.map[name].y = y;
 			}
		}

		locationMap = new LocationMap();

		Crafty.c('HUD_Land', {
			init: function() {

				this.bind("Cursor_Moved_Land", function(field) {
					if (this.__HUD__._type != field.type) {
						this.__HUD__.dismiss();
						HUDBuilder.describeLand(field.type);
					}
				});
				this.bind("Cursor_Moved_Character", function(field) {
					this.__HUD__.dismiss();
					HUDBuilder.describeCharacter(field.name);
				});
				return this;
			}
		});

		Crafty.c('HUD_Character', {
			init: function() {

				this.bind("Cursor_Moved_Land", function(field) {
					this.__HUD__.dismiss();
					HUDBuilder.describeLand(field.type);
				});
				this.bind("Cursor_Moved_Character", function(field) {
					if (this.__HUD__._name != field.name) {
						this.__HUD__.dismiss();
						HUDBuilder.describeCharacter(field.name);
					}
				});
				return this;
			}
		});

		Crafty.c('Locatable', {
			getFieldX: function() {
				return Locator.getFieldX(this.x);
			},

			getFieldY: function() {
				return Locator.getFieldY(this.y);
			}
		})


		Crafty.c('Hero', {
			init: function() {
					//setup animations
					this.requires("SpriteAnimation, Collision, Locatable")
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
						this.markLocation();
					});
				return this;
			},

			movePosition: function() {
				this.requires('Keyboard');

				var move = 4;

				for(i= -move; i <= move; i++) {
					for (j= -move; j <= move; j++) {
						Crafty.e("2D, Canvas, Color")
						.color('#FF0000')
						.attr({x:player._x+(32*j), y:player._y+(32*i), w:32, h:32, alpha:0.5, z:0});
					}
				}

				this.bind('KeyDown', function() {
					if(this.isDown('ENTER')) {

						cursor.enableControl();
						this.disableControl();
					}
				});
			},

			markLocation: function() {
				if (this.name)
					locationMap.mark(this.name, this.getFieldX(this.x), this.getFieldY(this.y));
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

		Crafty.c("Cursor", {
			init: function() {
				this.requires('RightControls');
				this.requires('Keyboard');
				this.requires('Locatable');

				var target = this;
				this.currentFieldX = this.getFieldX();
				this.currentFieldY = this.getFieldY();

				this.bind('Moved', function(from) {
					var fieldX = target.getFieldX();
					var fieldY = target.getFieldY();
					if (fieldX != target.currentFieldX || fieldY != target.currentFieldY) {
						target.currentFieldX = fieldX;
						target.currentFieldY = fieldY;

						name = locationMap.lookup(fieldX, fieldY)
						if (name != '_undefined_')
							Crafty.trigger('Cursor_Moved_Character', {x:fieldX, y:fieldY, name:name});
						else
							Crafty.trigger('Cursor_Moved_Land', {x:fieldX, y:fieldY, type:landMap.spriteMap[landMap.map[fieldY][fieldX]]});
					}
				});

				this.bind('KeyDown', function() {
					if(this.isDown('SPACE')){
						target.pushSpace();
					}
					if(this.isDown('ENTER')) {
						if(this._x == player._x && this._y == player._y) {
							player.movePosition();
							player.enableControl();
							this.disableControl();
						}
					}
				});
			},

			pushSpace: function() {
				this.attr({x:player._x, y:player._y, z:1});
			},
		});

		//create our player entity with some premade components

		player = Crafty.e("2D, Canvas, player, Hero, RightControls, Animate, Collision")
			.attr({x: 320, y: 576, z: 1, name:'keldorn'})
			.markLocation()
			.rightControls(1);
		crew1 = Crafty.e("2D, Canvas, player, Hero, RightControls, Animate, Collision")
			.attr({x: 288, y: 576, z: 1, name:'valygar'})
			.markLocation()
			.rightControls(1);
		crew2 = Crafty.e("2D, Canvas, player, Hero, RightControls, Animate, Collision")
			.attr({x: 352, y: 576, z: 1, name:'edwin'})
			.markLocation()
			.rightControls(1);
		crew3 = Crafty.e("2D, Canvas, player, Hero, RightControls, Animate, Collision")
			.attr({x: 320, y: 544, z: 1, name:'imoen'})
			.markLocation()
			.rightControls(1);
		cursor = Crafty.e("2D, Canvas, cursor, Cursor")
			.attr({x: 320, y: 576, z: 1})
			.rightControls(4);

		player.disableControl();
		crew1.disableControl();
		crew2.disableControl();
		crew3.disableControl();
		cursor.disableControl();

		cursor.enableControl();

		//hud = HUDBuilder.describeLand("Grassland");
		hud = HUDBuilder.describeCharacter("keldorn");
	});
};