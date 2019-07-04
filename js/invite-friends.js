var selectedData = [];
var selectedPage = 0;
var allPage = 0;
var searchPage = 0;
var searchData = [];

var mode = 0; //0-all, 1-selected, 2-search
var lastMode = 0;

$(document).ready(function(){

	$('#invite-all').click(barClick);
	$('#invite-selected').click(barClick);
	populate();
	
	$('#invite-bar-search').keyup(function () {
		typewatch(function () {
			var typeString = $('#invite-bar-search').val();
			if (typeString.length > 0) {
				if (mode != 2) {
			  		lastMode = mode;
					mode = 2;
					$('#invite-all').removeClass('invite-bar-box');
					$('#invite-selected').removeClass('invite-bar-box');
					searchPage = 0;
		  		}
		  		searchData = $.grep(allFriends, function(value) {
		  		  	return (value['name'].toLowerCase().indexOf(typeString.toLowerCase()) >= 0);
		  		});
			} else {
			  	mode = lastMode;
			  	if (mode == 0) {
				  	$('#invite-all').toggleClass('invite-bar-box');
			  	} else if (mode == 1) {
				  	$('#invite-selected').toggleClass('invite-bar-box');
			  	}
		  	}
			
			populate();
	  	}, 500);
	});
	$('#friends-invite').click(inviteFriends);
});

var typewatch = (function(){
  var timer = 0;
  return function(callback, ms){
	clearTimeout (timer);
	timer = setTimeout(callback, ms);
  }  
})();

function populate() {
	if (mode == 0) { //all
		popFriends(allFriends,allPage);
	} else if (mode == 1) { //selected
		popFriends(selectedData,selectedPage);
	} else if (mode == 2) { //search
		popFriends(searchData,searchPage);
	}
}

function popFriends(arr,idx) {
	var friendOut = '';

	var limit = 15;
	if (limit > (arr.length-idx)) {
		limit = (arr.length-idx);
	}
	for (var i = idx; i < (idx+limit); i++) {
		var friend = arr[i];
		var t = i % 3;
		if (t == 0) {
			friendOut += '<tr>';
		}
		
		var found = $.grep(selectedData, function(value) {
		  	return (value['uid'] == friend['uid'])&&(value['pic'] == friend['pic'])&&(value['name'] == friend['name']);
		});
		
		var classOne = '';
		var classTwo = '';
		if (found.length > 0) {
			var classOne = ' invite-friends-cell-selected';
			var classTwo = ' invite-friend-checked';
		}
		
		friendOut += '<td><div class="invite-friends-cell'+classOne+'" data=\'{"uid":"'+friend['uid']+'","pic":"'+friend['pic']+'","name":"'+friend['name']+'"}\'><div class="invite-friend-check'+classTwo+'"></div><div class="invite-friend-picture"><img src="'+friend['pic']+'" class="friends-pic" /></div><div class="invite-friend-text">'+friend['name']+'</div></div></td>';
		if (t == 2) {
			friendOut += '</tr>';
		}
	}
	
	pageFriends(arr,idx);
	$('#invite-friends-table').html(friendOut);
	$('.invite-friends-cell').click(cellClick);
}

function pageFriends(arr,idx) {
	var limit = 15;
	if (limit > (arr.length-idx)) {
		limit = (arr.length-idx);
	}
	$('#friends-page').html((idx+1)+'-'+(idx+limit)+' OF '+arr.length);
}

function prev() {
	if (mode == 0) { //all
		allPage -= 15;
		if (allPage < 0) {
			allPage = 0;
		}
	} else if (mode == 1) { //selected
		selectedPage -= 15;
		if (selectedPage < 0) {
			selectedPage = 0;
		}
	} else if (mode == 2) { //search
		searchPage -= 15;
		if (searchPage < 0) {
			searchPage = 0;
		}
	}
	
	populate();
}

function next() {
	if (mode == 0) { //all
		if ((allPage+15) > allFriends.length) {
			allPage = allFriends.length-limit;
		} else {
			allPage += 15;
		}
	} else if (mode == 1) { //selected
		if ((selectedPage+15) > selectedData.length) {
			selectedPage = selectedData.length-selectedPage;
		} else {
			selectedPage += 15;
		}
	} else if (mode == 2) { //search
		if ((searchPage+15) > searchData.length) {
			searchPage = searchData.length-searchPage;
		} else {
			searchPage += 15;
		}
	}
		
	populate();
}


function cellClick() {
	if (!$(this).hasClass('invite-friends-cell-selected')) {
		if (selectedData.length >= 50) {
			return false;
		}
		
		selectedData.push($.parseJSON($(this).attr('data')));
	} else {
		var obj = $.parseJSON($(this).attr('data'));
		selectedData = $.grep(selectedData, function(value) {
		  	return (value['uid'] != obj['uid'])&&(value['pic'] != obj['pic'])&&(value['name'] != obj['name']);
		});
		
		if (mode == 1) {
			populate();		
		}
	}
	
	$('#invite-selected-num').html(selectedData.length);
	
	$(this).find('.invite-friend-check').toggleClass('invite-friend-checked');
	$(this).toggleClass('invite-friends-cell-selected');
};

function barClick() {
	if (!$(this).hasClass('invite-bar-box')) {
		$('#invite-all').toggleClass('invite-bar-box');
		$('#invite-selected').toggleClass('invite-bar-box');
		if ($('#invite-all').hasClass('invite-bar-box')) {
			mode = 0;
		} else {
			mode = 1;
			selectedPage = 0;
		}
		populate();
	}
};

function inviteFriends() {
	$('#overlay-page', window.parent.document).hide();
};