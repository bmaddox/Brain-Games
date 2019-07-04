var gameTime;
var tiles = [];
var flippedTiles = [];
var row = 3;
var col = 3;
var gameActive = 0;
var flipCount = 3;

var score = 0;
var round = 1;
var correct = 0;

$(document).ready(function(){
	$.preload('images/bg_ms_round.png',
	  'images/bg_ms_3x3.png',
	  'images/bg_ms_white.png',
	  'images/bg_ms_pink.png',
	  'images/bg_ms_x.png',
	  'images/bg_ms_4x3.png',
	  'images/bg_ms_4x4.png',
	  'images/bg_ms_5x4.png',
	  'images/bg_ms_5x5.png',
	  'images/bg_ms_6x5.png',
	  'images/bg_ms_6x6.png'
	);
	$('#game-box').html('<div id="pre-game-box"><div class="box-spacer"></div><span id="pre-game-header">CORRECTLY FLIP THE TILES<br>TO TEST YOUR MEMORY</span><br><div class="box-spacer"></div><span id="pre-game-text">Use Memory Squares to test just how well your memory performs under pressure.<br>Don’t forget to keep playing and sharing these mind-blowing games!</span><div id="game-start">START</div></div><div id="game-overlay"></div>');
	$("#game-start").click(start);
});

function clickTile() {
	if (gameActive != 1) {
		return;
	}
	
	var t = $(this);
	
	var flippedIdx = $.inArray(t.attr("id"), flippedTiles);
	
	if (flippedIdx != -1) {
		return;
	} else {
		flippedTiles.push(t.attr("id"));
	}
	
	var tileIdx = $.inArray(t.attr("id"), tiles);
	var wrong = true;
	if (tileIdx != -1){
		wrong = false;
	}
	
	if (wrong == true) {
		gameActive = 0;
		t.stop().animate({width:'0px',marginLeft:'26.5px',opacity:'0.5'},{duration:300});
		setTimeout(function() {
			t.addClass("ms-tile-x");
			t.stop().animate({width:'53px',marginLeft:'0px',opacity:'1'},{duration:500});
			
			setTimeout(function(){
				resetTiles(false);
			},1500);
		},300);
	} else {
		var cf = flippedTiles.length;
		t.stop().animate({width:'0px',marginLeft:'26.5px',opacity:'0.5'},{duration:300});
		setTimeout(function() {
			t.addClass("ms-tile-p");
			t.stop().animate({width:'53px',marginLeft:'0px',opacity:'1'},{duration:300});
			
			if (cf == flipCount) {
				gameActive = 0;
				addScore();
				
				setTimeout(function(){
					resetTiles(true);
				},1500);
			}
		},300);
	}
	
};

function resetTiles(w) {
	
	$('.ms-tile-p').stop().animate({width:'0px',marginLeft:'26.5px',opacity:'0.5'},{duration:300});
	setTimeout(function(){
		var p = $('.ms-tile-p');
		p.removeClass("ms-tile-p");
		p.stop().animate({width:'53px',marginLeft:'0px',opacity:'1'},{duration:500});
	},300);
	$('.ms-tile-x').stop().animate({width:'0px',marginLeft:'26.5px',opacity:'0.5'},{duration:300});
	setTimeout(function(){
		var x = $('.ms-tile-x');
		x.removeClass("ms-tile-x");
		x.stop().animate({width:'53px',marginLeft:'0px',opacity:'1'},{duration:500});
	},300);
	
	setTimeout(function(){
		if (w == false) {
			end();
		} else {
			correct++;
			if (correct >= 3) {
				round++;
				if (round > 20) {
					round = 1;
				}
				prepareRound();
			} else {
				pickTiles();
				showTiles();
			}
		}
		
	},1500);
};

function addScore() {
	score += 10;
	var pointName = 'game-points-'+score;

	$('#game-box').append('<div id="'+pointName+'" class="game-points">10 PTS</div>');
	$('#'+pointName).animate({top:'-=30',opacity:'0.1'},1000, function() {
		$('#'+pointName).remove();
	});
	
	$('#score').html(score);
}

function showTile(id) {
	var t = $('#'+id);
	t.stop().animate({width:'0px',marginLeft:'26.5px',opacity:'0.5'},{duration:300});
	setTimeout(function() {
		t.addClass("ms-tile-p");
		t.stop().animate({width:'53px',marginLeft:'0px',opacity:'1'},{duration:300});
		setTimeout(function(){
			t.stop().animate({width:'0px',marginLeft:'26.5px',opacity:'0.5'},{duration:300});
			setTimeout(function(){
				t.removeClass("ms-tile-p");
				t.stop().animate({width:'53px',marginLeft:'0px',opacity:'1'},{duration:300});
			},300);
		},1500);
	},300);
};

function showTiles() {
	$('.ms-tiles').addClass('ms-hide');
	for (var i = 0; i < tiles.length; i++) {
		showTile(tiles[i]);
	}
	
	setTimeout(function(){
		$('.ms-tiles').removeClass('ms-hide');
		gameActive = 1;
	},1600);
};

function pickTiles() {
	flippedTiles = [];
	tiles = [];
	
	if (round == 1) {
		flipCount = 3;
	} else if (round == 2) {
		flipCount = 4;
	} else if (round == 3) {
		flipCount = 5;
	} else if (round == 4) {
		flipCount = 5;
	} else if (round == 5) {
		flipCount = 6;
	} else if (round == 6) {
		flipCount = 7;
	} else if (round == 7) {
		flipCount = 8;
	} else if (round == 8) {
		flipCount = 9;
	} else if (round == 9) {
		flipCount = 10;
	} else if (round == 10) {
		flipCount = 11;
	} else if (round == 11) {
		flipCount = 12;
	} else if (round == 12) {
		flipCount = 13;
	} else if (round == 13) {
		flipCount = 14;
	} else if (round == 14) {
		flipCount = 15;
	} else if (round == 15) {
		flipCount = 16;
	}
	
	while (tiles.length < flipCount) {
		var rX = Math.floor(Math.random() * row);
		var rY = Math.floor(Math.random() * col);
		
		var idx = $.inArray(rX+"_"+rY, tiles);
		if (idx == -1) {
			tiles.push(rX+"_"+rY);
		}
	}
};

function setupRound() {
	correct = 0;
	$('#ms-board').remove();

	if (round <= 1) {
		row = 3;
		col = 3;
	} else if (round <= 3) {
		row = 4;
		col = 3;
	} else if (round <= 5) {
 		row = 4;
 		col = 4;
	} else if (round <= 7) {
 		row = 5;
 		col = 4;
 	} else if (round <= 9) {
 		row = 5;
 		col = 5;
 	} else if (round <= 11) {
 		row = 6;
 		col = 5;
 	} else if (round <= 15) {
 		row = 6;
 		col = 6;
 	}
 	
 	$('#game-box').append('<div id="ms-board" class="ms-'+row+'x'+col+'"></div>')
	
	for (var c = 0; c < col; c++) {
		for (var r = 0; r < row; r++) {
			$('#ms-board').append('<div class="ms-tiles"><div id="'+r+'_'+c+'" class="ms-tile"></div></div>');
		}	
	}
	
	$('#round').html(round);
	$(".ms-tile").click(clickTile);
}

function prepareRound() {
	setupRound();
	pickTiles();
	
	$('#game-box').append('<div id="ms-round-box">GET '+flipCount+' TILES CORRECT</div>');
	
	setTimeout(function(){
		$('#ms-round-box').remove();
		setTimeout(function(){
			showTiles();
		},750);
	},1850);
}

function start() {
	if (score == 0) {
		$('#ms-score').html('SCORE: <span id="score">00</span>');
	} else {
		$('#ms-score').html('SCORE: <span id="score">' + score + '</span>');
	}
	
	$('#ms-round').html('ROUND <span id="round">' + round + '</span>');
	
	$('#pre-game-box').remove();
	$('#game-overlay').remove();
	
	prepareRound();
};

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