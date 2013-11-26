/* 
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/

var btnPlay;
var btnPause;

var playing = false;
 
$(document).ready(function() {
	initPresentOps();
	addPresentEvents();
});

function initPresentOps() {
	btnPlay = $('#btnPlay');
	btnPause = $('#btnPause');
	
	btnPause.hide();
}

function addPresentEvents() {
	btnPlay.click(function() {
		// Start scrolling based on the speed
		startPresentation();
	});
	
	btnPause.click(function() {
		pausePresentation();
	});
}

function startPresentation() {
	// Can only start if there is a file
	if(fileOpened == true) {
		console.log("Presentation started...");
	
		playing = true;
		pageScroll();
		
		btnPlay.hide();
		btnPause.show();
	}
}

function pausePresentation() {
	console.log("Paused...");
	
	playing = false;
	pageScroll();
	
	btnPlay.show();
	btnPause.hide();
}