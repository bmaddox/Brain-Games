var gameActive = 0;
var level = 1;
var time = 40;
var timer;

var balls = [];
var divider;

$(document).ready(function(){
	$.preload('images/bg_cb_divider.png',
	  'images/bg_cb_ball_blue.png',
	  'images/bg_cb_ball_yellow.png',
	  'images/bg_wb_right.png',
	  'images/bg_wb_wrong.png'
	);
	$.extend($.easing, window.easing);
	$('#game-box').append('<div id="pre-game-box"><div class="box-spacer"></div><br><br><span id="pre-game-text">USE YOUR MOUSE TO SLIDE THE OPENING SO THAT<br>EACH SIDE CONTAINS BALLS OF A SINGLE COLOR.</span><div id="game-start">START</div></div><div id="game-overlay"></div>');
	$("#game-start").click(start);
});


function updateTimer() {
	if (gameActive == 0) {
		return false;
	}
	time--;
	
	var w = (time * 123) / 40;
	$('#cb-progress').css({width : w+'px'});

	if (time <= 0) {
		clearInterval(timer);
		gameActive = 0;
		$('#wb-action').addClass('wb-action-wrong');
		setTimeout(function(){
			$('#wb-action').removeClass();
			end();

		},1000);

	}
};

function start() {
	$('#pre-game-box').remove();
	$('#game-overlay').remove();

	divider = $("#cb-divider");

	$("#container").mousemove(function(event) {
		var y = Math.min(Math.max((event.pageY - $("#game-box").position().top), 38), 365);
		$("#cb-divider").css({ top: (y - 365)+'px'});
	});
	
	level = 1;
	load();
};

function load() {
	$('#cb-progress').css({width : '123px'});
	$('#cb-level-number').html(''+level);

	balls.forEach(function(ball) {
		ball.remove();
	});
	balls.splice(0, balls.length);


	var bc, bx, by, vx, vy;

	switch (level) {
		case 1: bc = 4; bx = 2; by = 1; vx = 0; vy = 0; break;
		case 2: bc = 6; bx = 2; by = 1; vx = 1; vy = 0; break;
		case 3: bc = 6; bx = 2; by = 1; vx = 1; vy = 1; break;
		case 4: bc = 8; bx = 2; by = 1; vx = 1; vy = 1; break;
		case 5: bc = 8; bx = 3; by = 2; vx = 1; vy = 1; break;
		case 6: bc = 10; bx = 3; by = 2; vx = 1; vy = 0; break;
		case 7: bc = 10; bx = 3; by = 2; vx = 1; vy = 1; break;
		case 8: bc = 12; bx = 3; by = 2; vx = 1; vy = 1; break;
		case 9: bc = 12; bx = 4; by = 3; vx = 1; vy = 1; break;
		case 10: bc = 14; bx = 4; by = 3; vx = 1; vy = 0; break;
		case 11: bc = 14; bx = 4; by = 3; vx = 1; vy = 1; break;
		case 12: bc = 16; bx = 4; by = 3; vx = 1; vy = 1; break;
		case 13: bc = 16; bx = 5; by = 4; vx = 1; vy = 1; break;
		case 14: bc = 18; bx = 5; by = 4; vx = 1; vy = 1; break;
		case 15: bc = 20; bx = 5; by = 4; vx = 1; vy = 1; break;

	}


	var h = (bc/2);
	var b = 0;
	var y = 0;
	for (var s = 0; s <= 1; s++) {
		var q = [];

		for (var i = 0; i < h; i++) {
			var qx = Math.floor(Math.random() * 3);
			var qy = Math.floor(Math.random() * 4);
			while ($.inArray(qx+','+qy, q) != -1) {
				qx = Math.floor(Math.random() * 3);
				qy = Math.floor(Math.random() * 4);
			}
			q.push(qx+','+qy);

			var c = (s == 0) ? ((b < h/2) ? 0 : 1) : ((b < h) ? 0 : 1);
			if (c == 0) {
				b++;
			} else {
				y++;
			}

			var fx = Math.floor(Math.random() * (vx+1)) + bx;
			var fy = Math.floor(Math.random() * (vy+1)) + by;

			balls.push(new Ball((s == 0) ? (qx*80) + 5 : (669-(qx*80)) - 5, (qy*80) + 5, (Math.floor(Math.random() * 2) == 0) ? fx : -fx, (Math.floor(Math.random() * 2) == 0) ? fy : -fy, c));

		}

	}
	
	gameActive = 1;
	time = 40;
	timer = setInterval(updateTimer,1000);

	(function animloop(){
		if (gameActive == 0) return;

		var win = true;
	  
	  	balls.forEach(function(ball) {
			ball.move();
			if ((ball.c == 0) && (ball.position.x < 368)) {
				win = false;
			} else if ((ball.c == 1) && (ball.position.x > 300)) {
				win = false;
			}
	  	});

	  	balls.forEach(function(ball) {
			ball.draw();
	  	});

	  	if (win) {
	  		gameActive = 0;
			clearInterval(timer);
			$('#wb-action').addClass('wb-action-right');

			setTimeout(function(){
				$('#wb-action').removeClass();
				level++;
				if (level > 15) {
					end();
				} else {
					load(level);
				}
			
			},1000);
		}

	  	requestAnimFrame(animloop);
	})();
} 

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || 
		window.oRequestAnimationFrame || 
		window.msRequestAnimationFrame || 
		  function(callback){ window.setTimeout(callback, 1000 / 60); };
})();

function Ball(x, y, vx, vy, c) {
	this.position = new Point(x, y);
	this.c = c; //0=blue, 1=yellow
	this.output = $('<div class="cb-ball"><img src="images/bg_cb_ball_'+((c == 0) ? 'blue' : 'yellow' )+'.png" /></div>').appendTo('#cb-balls');
	this.velocity = new Point(vx, vy);
	if (this.position.x > 325) { //316-352 ban
		this.side = 1; //right
	} else {
		this.side = 0; //left
	}
	
}

Ball.prototype = {
	remove: function() {
		this.output.remove();
	},
	move: function() {

		if (this.position.y >= 369) {
			this.velocity.y = -this.velocity.y;
			this.position.y = 369;

		} else if (this.position.y <= 0) {
			this.velocity.y = -this.velocity.y;
			this.position.y = 0;
		}

		if (this.side == 0) { //left side

			if (this.position.x >= 316) {
				var dy = divider.position().top + 323;
				if ((this.position.y > dy) && (this.position.y < (dy+50))) { //pass
					this.side = 2;

				} else {
					this.velocity.x = -this.velocity.x;
					this.position.x = 316;
				}

			} else if (this.position.x <= 0) {
				this.velocity.x = -this.velocity.x;
				this.position.x = 0;

			}

		} else if (this.side == 1) { //right side
			if (this.position.x >= 669) {
				this.velocity.x = -this.velocity.x;
				this.position.x = 669;

			} else if (this.position.x <= 352) {
				var dy = $("#cb-divider").position().top + 323;
				if ((this.position.y > dy) && (this.position.y < (dy+50))) { //pass
					this.side = 3;

				} else {
					this.velocity.x = -this.velocity.x;
					this.position.x = 352;
				}
			}

		} else if (this.side == 2) { //left to right
			if (this.position.x > 352) {
				this.side = 1;
			}

		} else if (this.side == 3) { //right to left
			if (this.position.x < 316) {
				this.side = 0;
			}
		}

		// update position
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		
	},
	draw: function() {
		// render
		this.output.css({
			left: this.position.x,
			top: this.position.y
		});
	}
};

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function end() {
	window.location.href = 'congratulations.html';
};

function friendsPlaying(){
	friendsOverlay('friends-playing.html');
};
function inviteFriends(){
	friendsOverlay('invite-friends.html');
};
function friendsOverlay(p){
	if ($('#overlay-page').length > 0) {
		$('#overlay-page').remove();
	}
	var overlay = jQuery('<div id="overlay-page"><div id="overlay-container"><iframe src="'+p+'" width="767" height="737" scrolling="no" frameborder="0" id="overlay-frame"></iframe></div></div>');
	overlay.appendTo(document.body);
};