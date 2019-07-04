$(document).ready(function(){
	$('#select-frontal-visual').hover(toggleFrontal,toggleFrontal);
	$('#select-parietal-visual').hover(toggleParietal,toggleParietal);
	$('#select-temporal-visual').hover(toggleTemporal,toggleTemporal);
	$('#select-occipital-visual').hover(toggleOccipital,toggleOccipital);

	$('#select-play-frontal').hover(toggleFrontal,toggleFrontal);
	$('#select-play-parietal').hover(toggleParietal,toggleParietal);
	$('#select-play-temporal').hover(toggleTemporal,toggleTemporal);
	$('#select-play-occipital').hover(toggleOccipital,toggleOccipital);
});

function toggleFrontal() {
	$('#select-frontal-visual').toggleClass('select-visual-hover');
	$('#select-play-frontal').toggleClass('select-play-hover');
};

function toggleParietal() {
	$('#select-parietal-visual').toggleClass('select-visual-hover');
	$('#select-play-parietal').toggleClass('select-play-hover');
};

function toggleTemporal() {
	$('#select-temporal-visual').toggleClass('select-visual-hover');
	$('#select-play-temporal').toggleClass('select-play-hover');
};

function toggleOccipital() {
	$('#select-occipital-visual').toggleClass('select-visual-hover');
	$('#select-play-occipital').toggleClass('select-play-hover');
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