var score = 0;
var time = 120;
var length = 3;
var letter = '';
var slot = 1;
var gameActive = 0;
var timer;
var letters = [['A','B','C','D','E','F','G','H','L','M','N','O','P','R','S','T','W'],['A','B','C','D','E','F','G','H','L','M','P','S','T'],['A','B','C','D','F','G','H','L','M','P','R','S','T'],['A','B','C','D','F','G','H','L','M','P','R','S','T','W'],['A','B','C','D','E','F','G','H','L','M','N','S']];
var guessedWords = [];

var ptrieLib = namespace.lookup('org.startpad.trie.packed');
var ptrie;

$(document).ready(function(){
	$.ajax('js/dictionary.txt', {success: function (result) {
		ptrie = new ptrieLib.PackedTrie(result);
		$('#game-box').append('<div id="pre-game-box"><div class="box-spacer"></div><span id="pre-game-header">SEE HOW QUICKLY WORDS COME<br>TO YOU WITH WORD BUILDER</span><br><div class="box-spacer"></div><span id="pre-game-text">Use your words to develop your temporal lobe. </span><div id="game-start">START</div></div><div id="game-overlay"></div>');
		$("#game-start").click(start);
	}});
	$.preload('images/bg_wb_slot.png',
	  'images/bg_wb_keyA.png',
	  'images/bg_wb_deleteA.png',
	  'images/bg_wb_letters.png',
	  'images/bg_wb_keyB.png',
	  'images/bg_wb_deleteB.png',
	  'images/bg_wb_right.png',
	  'images/bg_wb_wrong.png',
	  'images/bg_wb_alreadygussed.png'
	);
});

function setTime() {
	if (time >= 60) {
		if ((time % 60) == 0) {
			$('#wb-time').html(Math.floor(time/60)+':00');
		} else {
			$('#wb-time').html(Math.floor(time/60)+':' + time % 60);	
		}
	} else {
		if (time == 0) {
			$('#wb-time').html(':00');
		} else {
			$('#wb-time').html(':' + time);
		}
	}
	
}

function updateTimer() {
	time--;
	setTime();
	if (time == 100) {
		length = 4;
		prepareSlots();
	} else if (time == 80) {
		length = 5;
		prepareSlots();
	} else if (time == 60) {
		length = 6;
		prepareSlots();
	} else if (time == 40) {
		length = 7;
		prepareSlots();
	} else if (time <= 0) {
		end();
	}
};

function prepareSlots() {
	gameActive = 0;
	$('#wb-prev-word').html('');
	guessedWords = [];
	slot = 1;
	$('#wb-word').html('<div id="wb-slot-0" class="wb-slot yellow"></div>');
		
	for (var i = 1; i < length; i++) {
		$('#wb-word').append('<div id="wb-slot-'+i+'" class="wb-slot"></div>');
	}
	
	letter = letters[length-3][Math.floor(Math.random() * (letters[length-3].length))];
	$('#wb-slot-0').html(letter);
	
	gameActive = 1;
};

function addScore() {
	score += 10;
	var pointName = 'game-points-'+score;
	
	$('#game-box').append('<div id="'+pointName+'" class="game-points">10 PTS</div>');
	$('#'+pointName).animate({top:'-=30',opacity:'0.1'},1000, function() {
		$('#'+pointName).remove();
	});
	
	$('#score').html(score);
};


function clickLetter() {
	if (gameActive != 1) {
		return;
	}
	var letter = $(this).attr('id').toUpperCase();
	
	$('#wb-slot-'+slot).html(letter);
	slot++;
	
	if (slot == length) {
		gameActive = 0;
		var action = 0; //0-already guessed //1-wrong //2-right
		var word = '';
		for (var i = 0; i < length; i++) {
			word = word + $('#wb-slot-'+i).html().toLowerCase();
		}
		
		var idx = $.inArray(word, guessedWords);
		if (idx == -1) {
			if (ptrie.isWord(word)) {
				action = 2;
				addScore();
				$('#wb-prev-word').html(word.toUpperCase());
				guessedWords.push(word);
			} else {
				action = 1;
			}
		}
		
		if (action == 0) {
			$('#wb-action').addClass('wb-action-alreadyguessed');
		} else if (action == 1) {
			$('#wb-action').addClass('wb-action-wrong');
		} else if (action == 2) {
			$('#wb-action').addClass('wb-action-right');
		}
		
		setTimeout(function(){
			for (var i = 1; i < length; i++) {
				$('#wb-slot-'+i).html('');
			}
			$('#wb-action').removeClass();
			slot = 1;
			gameActive = 1;
		},400);
	}
	
};

function deleteLetter() {
	if (gameActive != 1) {
		return;
	}
	if (slot == 1) {
		return;
	}
	slot--;
	$('#wb-slot-'+slot).html('');

};

function start() {
	$('#pre-game-box').remove();
	$('#game-overlay').remove();
	
	if (score == 0) {
		$('#wb-score').html('SCORE: <span id="score">00</span>');
	} else {
		$('#wb-score').html('SCORE: <span id="score">' + score + '</span>');
	}
	
	setTime();
	
	$('.wb-letter').click(clickLetter);
	$('.wb-delete').click(deleteLetter);
	
	$('.wb-delete').mouseup(function(){
		$(this).removeClass('wb-delete-press');
	}).mousedown(function(){
		$(this).addClass('wb-delete-press');
	});
	
	$('.wb-key').mouseup(function(){
		wbKeyUp($(this));
	}).mouseout(function(){
		wbKeyUp($(this));
	}).mousedown(function(){
		wbKeyDown($(this));
	});
	
	$(document).keydown(function(e){
		if ((e.keyCode == 8) || (e.keyCode == 46)) { 
			$('.wb-delete').addClass('wb-delete-press');
		 	return false;
	 	} else if (e.which <= 90 && e.which >= 65) {
		 	var l = $('#'+String.fromCharCode(e.which).toLowerCase());
		 	var k = l.parent();
		 	wbKeyDown(k);
		}
	});
	
	$(document).keyup(function(e){
		if ((e.keyCode == 8) || (e.keyCode == 46)) { 
		  $('.wb-delete').click();
		  $('.wb-delete').removeClass('wb-delete-press');
		  return false;
		} else if (e.which <= 90 && e.which >= 65) {
			var l = $('#'+String.fromCharCode(e.which).toLowerCase());
			var k = l.parent();
			l.click();
			wbKeyUp(k);
		}
	});
	
	$('#game-box').append('<div id="pause"></div>');
	$('#pause').click(pause);
	
	prepareSlots();
	$('#wb-keys').removeClass('hide');
	timer = setInterval(updateTimer,1000);
};

function pause() {
	$('#game-box').append('<div id="pre-game-box"><br><br><span id="pre-game-header" style="font-size:47.75px !important;">GAME PAUSED</span><div id="game-start">START</div></div><div id="game-overlay"></div>');
	$("#game-start").click(unpause);
	clearInterval(timer);
	gameActive = 0;
}

function unpause() {
	gameActive = 1;
	$('#pre-game-box').remove();
	$('#game-overlay').remove();
	timer = setInterval(updateTimer,1000);
}

function wbKeyUp(p) {
	var n = p.children('.wb-letter');
	n.addClass('wb-'+n.attr('id')+'1');
	n.removeClass('wb-'+n.attr('id')+'2');
	p.removeClass('wb-key-press');
}

function wbKeyDown(p) {
	p.addClass('wb-key-press');
	var n = p.children('.wb-letter');
	n.addClass('wb-'+n.attr('id')+'2');
	n.removeClass('wb-'+n.attr('id')+'1');
}

function end() {
	clearInterval(timer);
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