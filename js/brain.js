var previousSelected;
var selected;

$(document).ready(function() {

	$.extend($.easing, window.easing);
	selected = $('#container-main');
	$('#map-frontal').hover(toggleFrontal,toggleFrontal);
	$('#map-parietal').hover(toggleParietal,toggleParietal);
	$('#map-temporal').hover(toggleTemporal,toggleTemporal);
	$('#map-occipital').hover(toggleOccipital,toggleOccipital);
	
	$('#frontal-lobe').hover(toggleFrontal,toggleFrontal);
	$('#parietal-lobe').hover(toggleParietal,toggleParietal);
	$('#temporal-lobe').hover(toggleTemporal,toggleTemporal);
	$('#occipital-lobe').hover(toggleOccipital,toggleOccipital);

	
	$('#frontal-lobe').click(frontal);
	$('#parietal-lobe').click(parietal);
	$('#temporal-lobe').click(temporal);
	$('#occipital-lobe').click(occipital);

	var hash = window.location.hash;
	if (hash == '#frontal') {
		$('#frontal-lobe').click();
	} else if (hash == '#parietal') {
		$('#parietal-lobe').click();
	} else if (hash == '#temporal') {
		$('#temporal-lobe').click();
	} else if (hash == '#occipital') {
		$('#occipital-lobe').click();
	}

});

function toggleFrontal() {
	$('#frontal-lobe').toggleClass('lobe-hovered');
	$('#brain-highlight').toggleClass('brain-highlight-frontal');
};

function toggleParietal() {
	$('#parietal-lobe').toggleClass('lobe-hovered');
	$('#brain-highlight').toggleClass('brain-highlight-parietal');
};

function toggleTemporal() {
	$('#temporal-lobe').toggleClass('lobe-hovered');
	$('#brain-highlight').toggleClass('brain-highlight-temporal');
};

function toggleOccipital() {
	$('#occipital-lobe').toggleClass('lobe-hovered');
	$('#brain-highlight').toggleClass('brain-highlight-occipital');
};

function slide() {
	previousSelected.animate({
		left: '-810px'
	}, 500, 'easeInOutSine', function() {
		previousSelected.css('left', '810px');
	});
	
	selected.animate({
		left: '0'
	}, 500, 'easeInOutSine');
};

function slideBack() {
	previousSelected.animate({
		left: '810px'
	}, 500, 'easeInOutSine', function() {
		previousSelected.css('left', '810px');
	});
	selected.css('left', '-810px')
	selected.animate({
		left: '0'
	}, 500, 'easeInOutSine');
};

function frontalBack() {
	previousSelected = selected;
	selected = $('#container-frontal');
	slideBack();
};

function parietalBack() {
	previousSelected = selected;
	selected = $('#container-parietal');
	slideBack();
};

function temporalBack() {
	previousSelected = selected;
	selected = $('#container-temporal');
	slideBack();
};

function occipitalBack() {
	previousSelected = selected;
	selected = $('#container-occipital');
	slideBack();
};

function main() {
	previousSelected = selected;
	selected = $('#container-main');
	slide();
};


function frontal() {
	previousSelected = selected;
	selected = $('#container-frontal');
	slide();
};

function parietal() {
	previousSelected = selected;
	selected = $('#container-parietal');
	slide();
};

function temporal() {
	previousSelected = selected;
	selected = $('#container-temporal');
	slide();
};

function occipital() {
	previousSelected = selected;
	selected = $('#container-occipital');
	slide();
};

function main() {
	previousSelected = selected;
	selected = $('#container-main');
	slide();
};

function officialRules(){
	if ($('#overlay-or').length > 0) {
		$('#overlay-or').remove();
	}
	var overlay = jQuery('<div id="overlay-or"><div id="overlay-container"><iframe src="official-rules.html" width="767" height="737" scrolling="no" frameborder="0" id="overlay-frame"></iframe></div></div>');
	overlay.appendTo(document.body);
	window.parent.scrollTo(0, 200);
};