/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var btnPlay;
var btnPause;
var pauseOverlay;

var playing = false;

$(document).ready(function() {
    initPresentOps();
    addPresentEvents();
});

function initPresentOps() {
    btnPlay = $('#btnPlay');
    btnPause = $('#btnPause');
    pauseOverlay = $('#pauseOverlay');

    btnPause.hide();
    pauseOverlay.hide();
}

function addPresentEvents() {

    btnPlay.click(function() {
        startPresentation();
        var event = new Event();
        event.action = 0;
        event.target = 'Play Button';
        event.value = parseInt(getProgress()*100);
        event.user = getCurrentUserId();
        logEventToDb(event);
    });

    btnPause.click(function() {
        pausePresentation();
        var event = new Event();
        event.action = 0;
        event.target = 'Pause Button';
        event.value = parseInt(getProgress()*100);
        event.user = getCurrentUserId();
        logEventToDb(event);
    });

    pauseOverlay.click(function() {
        pausePresentation();
                var event = new Event();
        event.action = 0;
        event.target = 'Pause Overlay';
        event.value = parseInt(getProgress()*100);
        event.user = getCurrentUserId();
        logEventToDb(event);
    });
}

function startPresentation() {
    // Can only start if there is a file

    if (fileOpened == true) {
        console.log("Presentation started...");

        playing = true;
        pageScroll();

        btnPlay.hide();
        btnPause.show();
        pauseOverlay.show();
    }
}

function pausePresentation() {
    console.log("Paused...");

    playing = false;
    pageScroll();

    btnPlay.show();
    btnPause.hide();
    pauseOverlay.hide();
}