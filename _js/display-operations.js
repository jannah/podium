/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var canvas;
var primaryContent;
var body;
var slider;
var navpanel;
var playpanel;
var btnOpenFile;
var inpOpenFile;
var btnNewFile;
var btnSpeech1, btnSpeech2, btnFeedback, btnSubmitFeedback;
var fontSize = 1;
var cntTime;
var cntTotalTime;

var slidePanel;

var speedSlider;
var speed = 0;
var minSpeed = 50;
var maxSpeed = 300;
//var speedFactor = 10;
var increment = 5;
var speedSteps;

var timeEstimate = 0;
var remainingDuration = 0;

$(document).ready(function() {

    initDisplay();
});
function initDisplay()
{
    resizeDiv();

    // Get all the divs! :D
    canvas = $('#text-canvas');
    primaryContent = $('#primaryContent');

    body = $('#page');
    navpanel = $('#nav-panel');
    playpanel = $('#play-panel');
    btnNewFile = $('#newfile');
    btnOpenFile = $('#openfile');
    inpOpenFile = $('#open-file');
    btnSpeech1 = $('#speech-1');
    btnSpeech2 = $('#speech-2');
    btnFeedback = $('#feedback-button');
    btnSubmitFeedback = $('#submit-feedback');
    inpOpenFile.css('opacity', 0);
    inpOpenFile.css('filter', 'alpha(opacity = 0');
    inpOpenFile.hide();

    speedSlider = $('#speedSlider');
    cntTime = $('#currentTime');
    cntTotalTime = $('#totalTime');

    slidePanel = $('#slide-panel');
    rightMenu = $('#right-menu');

    addBaseEvents();
    addMenuEvents();
    hideMenuItems();
    setCanvasHeight();
    updateProgressBar();
    initSlider();
    updateSlider();
}

function setCanvasHeight()
{
    var elem = (document.compatMode === "CSS1Compat") ?
            document.documentElement :
            document.body;

    var headHeight = 77;
    var footHeight = 60;

    var height = elem.clientHeight - headHeight - footHeight;
    var width = elem.clientWidth;
    canvas.css('height', (height - 50));
    body.css('height', height);

    primaryContent.css('height', height);
    pauseOverlay.css('height', height);
    // set pauseOverlay's position equal to primaryContent
    var topPos = primaryContent.top;
    var leftPos = primaryContent.left;
    pauseOverlay.css('top', topPos);
    pauseOverlay.css('left', leftPos);

    navpanel.css('height', height);

    // Make slide panel shorter and set the top position right underneath the header
    slidePanel.css('height', height);

    rightMenu.css('height', height);
    rightMenu.css('top', headHeight - 2);
}

function addBaseEvents()
{
    btnNewFile.click(function() {
        var event = new Event();
        event.action = 0;
        event.target = 'New File';
        event.value = '';
        event.user = getCurrentUserId();
        logEventToDb(event);
        newFile();
    });

    btnOpenFile.click(function() {
        var event = new Event();
        event.action = 0;
        event.target = 'Open File';
        event.value = file.name;
        event.user = getCurrentUserId();
        logEventToDb(event);
        logEventToDb(event);
        inpOpenFile.trigger('click');
        return false;
    });

    btnSpeech1.click(function() {
        var event = new Event();
        event.action = 0;
        event.target = 'Test File';
        event.value = 'Speech 1';
        event.user = getCurrentUserId();
        logEventToDb(event);
        loadRemoteFile('./resources/speech1.txt');

        fileOpened = true;
    });
    btnSpeech2.click(function() {
        var event = new Event();
        event.action = 0;
        event.target = 'Test File';
        event.value = 'Speech 2';
        event.user = getCurrentUserId();
        logEventToDb(event);
        loadRemoteFile('./resources/speech2.txt');

        fileOpened = true;
    });

    btnFeedback.click(function()
    {
        var event = new Event();
        event.action = 0;
        event.target = 'Feedback';
        event.value = '';
        event.user = getCurrentUserId();
        logEventToDb(event);
        //console.log('feedback');
//           $("#feedback-popup", $('#page')).popup("open");
//       $('#feedback-popup').show();
    });

    btnSubmitFeedback.click(function()
    {
        var event = new Event();
        event.action = 0;
        event.target = 'Submit Feedback';
        event.value = '';
        event.user = getCurrentUserId();
        logEventToDb(event);
        //console.log('submit feedback');
        storeFeedback();
//           $("#feedback-popup", $('#page')).popup("open");
//       $('#feedback-popup').show();
    });
}


function addMenuEvents()
{

    $('#back').click(function() {
        showMenuItems();
        hideMenuItems();

        var event = new Event();
        event.action = 0;
        event.target = 'Back';
        event.value = "";
        event.user = getCurrentUserId();
        logEventToDb(event);
//        saveAction("back");
    });

    $('#fonts').click(function() {
        var hideItems = ["fonts", "bigger-text", "smaller-text", "line-height", "themes", "theme-bw", "theme-wb", "theme-by", "compact", "normal", "stretch",
            "text-mode", "mode-full", "mode-first", "mode-outline"];
        var showItems = ["back", "serif", "sans-serif"];
        changeVisibility(hideItems, showItems);

        var event = new Event();
        event.action = 0;
        event.target = 'Fonts';
        event.value = "";
        event.user = getCurrentUserId();
        logEventToDb(event);
    });

    $('#serif').click(function() {
        canvas.css('font-family', 'serif');
        pageScroll();

        var event = new Event();
        event.action = 0;
        event.target = 'Change Font';
        event.value = "Serif";
        event.user = getCurrentUserId();
        logEventToDb(event);
    });

    $('#sans-serif').click(function() {
        canvas.css('font-family', 'sans-serif');
        pageScroll();
        var event = new Event();
        event.action = 0;
        event.target = 'Change Font';
        event.value = "Sans-serif";
        event.user = getCurrentUserId();
        logEventToDb(event);
    });

    $('#bigger-text').click(function() {
        fontSize += 0.25;
        $('.paragraph').css('font-size', fontSize + 'em');
        if (fontSize > 2)
            $('.paragraph-label, .paragraph-time').css('font-size', '2em');
        else
            $('.paragraph-label, .paragraph-time').css('font-size', fontSize + 'em');
        var event = new Event();
        event.target = 'Bigger Font';
        event.value = fontSize + '';
        event.action = 0;
        logEventToDb(event);
        pageScroll();
    });

    $('#smaller-text').click(function() {
        fontSize -= 0.25;
        $('.paragraph').css('font-size', fontSize + 'em');

        if (fontSize > 2)
            $('.paragraph-label, .paragraph-time').css('font-size', '2em');
        else
            $('.paragraph-label, .paragraph-time').css('font-size', fontSize + 'em');
//        //console.log('line H=' + canvas.css('line-height'));
        var event = new Event();
        event.target = 'Smaller Font';
        event.value = fontSize + '';
        event.action = 0;
        logEventToDb(event);
        pageScroll();
    });

    $('#themes').click(function() {
        var hideItems = ["fonts", "bigger-text", "smaller-text", "serif", "sans-serif", "line-height", "themes", "compact", "normal", "stretch",
            "text-mode", "mode-full", "mode-first", "mode-outline"];
        var showItems = ["back", "theme-bw", "theme-wb", "theme-by"];
        var event = new Event();
        event.action = 0;
        event.target = 'Themes';
        event.value = "";
        event.user = getCurrentUserId();
        logEventToDb(event);

        changeVisibility(hideItems, showItems);
    });

    $('#theme-bw').click(function() {
        canvas.css('background-color', 'black');
        canvas.css('color', 'white');
        body.css('background-color', 'black');
        body.css('color', 'white');

        var event = new Event();
        event.action = 0;
        event.target = 'Change Theme';
        event.value = "BW";
        event.user = getCurrentUserId();
        logEventToDb(event);
    });

    $('#theme-wb').click(function() {
        canvas.css('background-color', 'white');
        canvas.css('color', 'black');
        body.css('background-color', 'white');
        body.css('color', 'black');
        var event = new Event();
        event.action = 0;
        event.target = 'Change Theme';
        event.value = "WB";
        event.user = getCurrentUserId();
        logEventToDb(event);
    });

    $('#theme-by').click(function() {
        canvas.css('background-color', 'rgb(255,245,220)');
        canvas.css('color', 'black');
        body.css('background-color', 'rgb(255,245,220)');
        body.css('color', 'black');
        var event = new Event();
        event.action = 0;
        event.target = 'Change Theme';
        event.value = "BY";
        event.user = getCurrentUserId();
        logEventToDb(event);
    });

    $('#line-height').click(function() {
        var hideItems = ["fonts", "bigger-text", "smaller-text", "serif", "sans-serif", "line-height", "themes", "theme-bw", "theme-wb", "theme-by",
            "text-mode", "mode-full", "mode-first", "mode-outline"];
        var showItems = ["back", "compact", "normal", "stretch"];
        var event = new Event();
        event.action = 0;
        event.target = 'Line Height';
        event.value = "";
        event.user = getCurrentUserId();
        logEventToDb(event);
        changeVisibility(hideItems, showItems);
    });

    $('#compact').click(function() {
        $('.paragraph').css('line-height', '1');
        pageScroll();
        var event = new Event();
        event.action = 0;
        event.target = 'Change Line Height';
        event.value = "Compact";
        event.user = getCurrentUserId();
        logEventToDb(event);
    });

    $('#normal').click(function() {
        $('.paragraph').css('line-height', '1.5');
        pageScroll();
        var event = new Event();
        event.action = 0;
        event.target = 'Change Line Height';
        event.value = "Normal";
        event.user = getCurrentUserId();
        logEventToDb(event);
    });

    $('#stretch').click(function() {
        $('.paragraph').css('line-height', '2');
        pageScroll();
        var event = new Event();
        event.action = 0;
        event.target = 'Change Line Height';
        event.value = "Stretch";
        event.user = getCurrentUserId();
        logEventToDb(event);
    });

    $('#text-mode').click(function() {
        var hideItems = ["fonts", "bigger-text", "smaller-text", "serif", "sans-serif", "line-height", "compact", "normal", "stretch", "themes",
            "theme-bw", "theme-wb", "theme-by", "text-mode"];
        var showItems = ["back", "mode-full", "mode-first", "mode-outline"];
        var event = new Event();
        event.action = 0;
        event.target = 'Text Mode';
        event.value = "";
        event.user = getCurrentUserId();
        logEventToDb(event);
        changeVisibility(hideItems, showItems);
    });

    $('#mode-full').click(function() {
        $('.sentence').css('display', 'inline');
        $('.word').css('display', 'inline');
        var event = new Event();
        event.action = 0;
        event.target = 'Change Text Mode';
        event.value = "Full";
        event.user = getCurrentUserId();
        logEventToDb(event);
        pageScroll();
    });

    $('#mode-first').click(function() {
        $('.sentence').css('display', 'none');
        $('.sentence-1').css('display', 'inline');
        var event = new Event();
        event.action = 0;
        event.target = 'Change Text Mode';
        event.value = "First Sentence";
        event.user = getCurrentUserId();
        logEventToDb(event);
        pageScroll();
    });

    $('#mode-outline').click(function() {
        $('.sentence').css('display', 'inline');
        $('.word').css('display', 'none');
        $('.highlighted-word').css('display', 'inline');
        var event = new Event();
        event.action = 0;
        event.target = 'Change Text Mode';
        event.value = "Outline";
        event.user = getCurrentUserId();
        logEventToDb(event);
        pageScroll();
    });

    canvas.scroll(function()
    {
        var progress = updateProgressBar();

        updateHighlightedWords();

        if (progress >= 100)
        {
            canvas.stop();
            pausePresentation();
        }
    });
}

function updateHighlightedWords()
{
    var progress = getProgress();
    var wordCount = wordIds.length;
    var lastWord = Math.ceil(progress * wordCount);
//    //console.log('last word=' + lastWord + "\t" + wordIds[lastWord]);

    for (var i = 0; i < wordCount; i++)
    {
        var id = '#' + wordIds[i];
        if (i <= lastWord)
        {
            $(id).addClass('done-word');
            if (playing)
                $(id).addClass('last-done-word');
        }
        else
            $(id).removeClass('done-word');
    }



}
function changeVisibility(hideItems, showItems) {
    $.each(hideItems, function(i, id) {
        $("#" + id).hide();
    });

    $.each(showItems, function(i, id) {
        $("#" + id).show();
    });
}

function showMenuItems() {
    $('#fonts').show();
    $('#bigger-text').show();
    $('#smaller-text').show();
    $('#line-height').show();
    $('#themes').show();
    $('#text-mode').show();
}

function hideMenuItems() {
    $('#back').hide();
    $('#serif').hide();
    $('#sans-serif').hide();
    $('#theme-bw').hide();
    $('#theme-wb').hide();
    $('#theme-by').hide();
    $('#compact').hide();
    $('#normal').hide();
    $('#stretch').hide();
    $('#mode-full').hide();
    $('#mode-first').hide();
    $('#mode-outline').hide();
}
function initSlider()
{
    speedSteps = Math.ceil((maxSpeed - minSpeed) / increment);


    speedSlider.prop('min', 0)
            .prop('max', speedSteps)
            .prop('step', 1)
            .prop('value', 0);
}

function updateSlider() {
    // Default speed value
//    var val = speedSlider.val();
//    speed = (val === 0) ? 0 : minSpeed + val * increment;

//    //console.log(speed);

    speedSlider.change(function()
    {
        console.log('changing speed');
        var value = $(this).val();
        speed = (value === 0) ? 0 : minSpeed + value * increment;
        var event = new Event();
        event.action = 0;
        event.target = 'Change Speed';
        event.value = speed + " (" + value + ")";
        event.user = getCurrentUserId();
        logEventToDb(event);
        pageScroll();
    });
}

function pageScroll()
{
    if (speed <= 1)
        canvas.stop();
    else
    {
        updateSpeed();

        if (playing) {
            canvas.stop().animate({
                scrollTop: canvas.get(0).scrollHeight + 'px'
            }, remainingDuration, "linear");
        }
        else {
            canvas.stop();
        }
    }
}
function updateParagraphTime()
{
    var paras = $('.paragraph-div')
    var cumCount = 0;
    var cumDuration = -2 / 60;
    var totalCount = getWordCount(grabText());
    var totalDuration = (totalCount / speed);
    var totalTime = calculateTime(totalDuration * 60);
    var edgeWord = Math.floor(getProgress() * totalCount);
    var edgeDuration = edgeWord / speed;

    for (var i = 0, j = paras.length; i < j; i++)
    {
        var para = paras[i]
        var paraText = $(para).children('.paragraph').text();
        var pwc = getWordCount(paraText);

        var duration = pwc / speed;
        cumDuration += duration;
        cumCount += pwc;
        var remDuration = (cumDuration <= edgeDuration) ? 0 : cumDuration - edgeDuration;
        var remTime = calculateTime(remDuration * 60);
        var durationTime = calculateTime(duration * 60);
        var txt = (playing) ? "<span class='rem-time'>" + ((remDuration > duration) ? durationTime : remTime) + "</span>"
                : "<span id='para-time'>" + durationTime + "</span>";
        $(para).children('.paragraph-time').empty()
                .attr('data-count', cumCount)
                .append(txt);




//        //console.log(remDuration+"\t"+remTime+"\t"+duration+"\t"+durationTime);
    }
}
function updateSpeed() {
    var text = grabText();
    var wordCount = getWordCount(text);
    var duration = wordCount / speed;

    remainingDuration = duration * 60 * 1000 * (1 - getProgress());

    var elapsed = (duration * 60) - (remainingDuration / 1000);

    if (wordCount !== 1 && speed > 0)
    {
        cntTotalTime.text(calculateTime(duration * 60));
        cntTime.text(calculateTime(elapsed));
        updateParagraphTime();
    }
}

function calculateTime(time) {
    time = Math.round(time);

    var minutes = Math.floor(time / 60);

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var seconds = time % 60;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    var timeString = minutes + ":" + seconds;

    return timeString;
}

window.onresize = function(event) {
    resizeDiv();
    setCanvasHeight();
};

function resizeDiv()
{
    var vpw = $(window).width();
    var vph = $(window).height();
    $('#content').css({'height': vph + 'px'});
}

function getWordCount(text)
{
    var text = text + "";
    var words = text.split(" ");

    return words.length;
}

function getProgress()
{
    var canvasH = parseInt(canvas.css('height'));
    var currentScroll = parseInt(canvas.scrollTop());
    var scrollH = canvas.get(0).scrollHeight;
    var progress = 0;

    if (currentScroll !== 0)
    {
        var progress = currentScroll / (scrollH - canvasH);
    }

    return progress;
}

function getRemainingScroll()
{
    var currentScroll = parseInt(canvas.scrollTop());
    var remainingScroll = canvas.get(0).scrollHeight - currentScroll;
    //console.log('remainingScroll=' + remainingScroll);
    return remainingScroll;
}

function grabText()
{
    var text = canvas.text();
//    //console.log(text);
    return text;
}


function addWordEvents()
{
    $('.word').unbind('click');
    $('.word').on('click', function()
    {
        var self = $(this);
        //console.log(self.text() + ' clicked');
        var val = ""
        if (self.hasClass('highlighted-word'))
        {
            self.removeClass('highlighted-word');
            val = "Remove";
        } else
        {
            self.addClass('highlighted-word');
            val = "Add";

        }
        var event = new Event();
        event.action = 0;
        event.target = 'Highlighted Word';
        event.value = val;
        event.user = getCurrentUserId();
        logEventToDb(event);
    })
}

function updateProgressBar()
{
    var progress = Math.ceil(getProgress() * 100);
    var bar = $('#progress-bar');
    bar.css('width', progress + '%');
    bar.text(progress + '%');

    updateSpeed();

    return progress;
}

