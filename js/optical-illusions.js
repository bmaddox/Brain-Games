var score = 0;
var question = 0;
var questions = ['1','2','3','4','5','6','7','8','9','10'];
var qs = [1,2,1,0,0,1,2,2,2,2];
var q5;
var q5q = 1;
var selected = -1;
var gameActive = 0;

$(document).ready(function(){
	$.preload('images/bg_oi_unchecked.png',
	  'images/bg_oi_checked.png',
	  'images/bg_oi_q1.png',
	  'images/bg_oi_q2.png',
	  'images/bg_oi_q3.png',
	  'images/bg_oi_q4.png',
	  'images/bg_oi_q6.png',
	  'images/bg_oi_q7.png',
	  'images/bg_oi_q8.png',
	  'images/bg_oi_q9.png',
	  'images/bg_oi_q10.png',
	  'images/bg_wb_right.png',
	  'images/bg_wb_wrong.png'
	);
	$('#game-box').append('<div id="pre-game-box"><div class="box-spacer"></div><span id="pre-game-header">TEST YOUR VISUAL SKILLS WITH<br>THIS OPTICAL ILLUSION CHALLENGE.</span><div class="box-spacer"></div><span id="pre-game-text">Keep your eyes on the prize as you answer the following<br>questions engineered to test your occipital lobe.</span><div id="game-start">START</div></div><div id="game-overlay"></div>');
	$("#game-start").click(start);
});


function addScore() {
	score += 10;
	var pointName = 'game-points-'+score;

	$('#game-box').append('<div id="'+pointName+'" class="game-points">10 PTS</div>');
	$('#'+pointName).animate({top:'-=30',opacity:'0.1'},1000, function() {
		$('#'+pointName).remove();
	});

	$('#score').html(score);
};

function loadQuestion() {
	selected = -1;
	var q = questions[question];
	
	var questionImage;
	var questionText;
	var questionAnswers;

	if (q == 1) {
		questionImage = 'bg_oi_q1.png';
		questionText = 'Are these circles really moving?';
		questionAnswers = ['Yes','No']; //no
	} else if (q == 2) {
		questionImage = 'bg_oi_q2.png';
		questionText = 'How many prongs do you see?';
		questionAnswers = ['2', '3', 'Both']; //both
	} else if (q == 3) {
		questionImage = 'bg_oi_q3.png';
		questionText = 'Are these snakes really moving?';
		questionAnswers = ['Yes','No']; //no
	} else if (q == 4) {
		questionImage = 'bg_oi_q4.png';
		questionText = 'Are the two boxes level?';
		questionAnswers = ['Yes','No']; //yes
	} else if (q == 5) {
		questionImage = 'bg_oi_q5.png';
		questionText = 'Cover your right eye and look at the white star. Then slowly back away from the screen. Did you see the pink star disappear?'; //back away
		questionAnswers = ['Yes','No']; //yes
	} else if (q == 6) {
		questionImage = 'bg_oi_q6.png';
		questionText = 'Are the pink lines straight or do they bend?';
		questionAnswers = ['Bend','Straight']; //straight
	} else if (q == 7) {
		questionImage = 'bg_oi_q7.png';
		questionText = 'Which yellow line is bigger?';
		questionAnswers = ['Top', 'Bottom', 'Same Size']; //same size
	} else if (q == 8) {
		questionImage = 'bg_oi_q8.png';
		questionText = 'Do you see the triangle connecting the circles?';
		questionAnswers = ['Yes', 'No', 'The triangle doesn\'t exist']; //the triangle doesnt exist
	} else if (q == 9) {
		questionImage = 'bg_oi_q9.png';
		questionText = 'Which line is longer?';
		questionAnswers = ['Top', 'Bottom', 'Same Length']; //same length
	} else if (q == 10) {
		questionImage = 'bg_oi_q10.png';
		questionText = "From arrow tip to arrow tip, which has the greater distance?";
		questionAnswers = ['A', 'B', 'Same Distance']; //same distance
	}
	
	$('#oi-question-image').html('<img src="images/'+questionImage+'" />');
	$('#oi-question-text').html(questionText);
	$('#oi-question-answers').html('');
	
	for (var a = 0; a < questionAnswers.length; a++) {
		$('#oi-question-answers').append('<div id="'+a+'" class="oi-question-answer">'+questionAnswers[a]+'</div>');
	}
	
	$('.oi-question-answer').click(selectAnswer);
	
	gameActive = 1;
};

function submitAnswer() {
	if (gameActive == 0) {
		return false;
	}
	if (selected == -1) {
		return false;
	}
	
	gameActive = 0;

	submitNext();

};

function submitNext() {
	var wrong = false;
	
	if (selected == qs[questions[question]-1]) {
		addScore();
		$('#wb-action').addClass('wb-action-right');
	} else {
		$('#wb-action').addClass('wb-action-wrong');
		wrong = true;
	}

	setTimeout(function(){
		$('#wb-action').removeClass();
		question++;
		if ((question >= 10) || (wrong == true)) {
			end();
		} else {
			loadQuestion();
		}
	},1000);	
};

function selectAnswer() {
	if (gameActive == 0) {
		return false;
	}
	$(this).addClass('oi-question-answer-selected');
	if (selected > -1) {
		$('#'+selected).removeClass('oi-question-answer-selected');
	}
	selected = $(this).attr('id');
};

function shuffle(o){ //v1.0
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function start() {
	$('#pre-game-box').remove();
	$('#game-overlay').remove();
	
	if (score == 0) {
		$('#oi-score').html('SCORE: <span id="score">00</span>');
	} else {
		$('#oi-score').html('SCORE: <span id="score">' + score + '</span>');
	}
	
	$('#game-box').html('<div id="wb-action"></div><div id="oi-question-image"></div><div id="oi-question-box"><div id="oi-question-text"></div><div id="oi-question-answers"></div><div id="oi-question-submit">SUBMIT</div></div>');

	$('#oi-question-submit').click(submitAnswer);
	
	questions = shuffle(questions);
	loadQuestion();
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