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
var fontSize = 1;
var cntTime;
var cntTotalTime;

var speedSlider;
var speed = 0;
var minSpeed = 50;
var maxSpeed = 250;

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
    
    inpOpenFile.css('opacity', 0);
    inpOpenFile.css('filter', 'alpha(opacity = 0');
    inpOpenFile.hide();
    
    speedSlider = $('#speedSlider');
    cntTime = $('#currentTime');
    cntTotalTime = $('#totalTime');
    
    addBaseEvents();
    addMenuEvents();
    hideMenuItems();
    setCanvasHeight();
    updateProgressBar();
    updateSlider();
}

function setCanvasHeight()
{
    var elem = (document.compatMode === "CSS1Compat") ?
            document.documentElement :
            document.body;
    var height = elem.clientHeight - 78;
    var width = elem.clientWidth;
    canvas.css('height', (height - 50));
    body.css('height', height);
    primaryContent.css('height', height);
    navpanel.css('height', height);
}

function addBaseEvents() 
{
	primaryContent.click(function() {
    	if($('#slide-panel').is(":visible")) {
    		$('#slide-panel').hide();
    	}
    	else {
    		$('#slide-panel').show();
    	}
    });
    
    btnNewFile.click(function() {
    	newFile();
    });
    
    btnOpenFile.click(function() {
        inpOpenFile.trigger('click');
        return false;
    });
}

function addMenuEvents()
{	

	$('#back').click(function() {
		showMenuItems();
		hideMenuItems();
		
		saveAction("back");
	});
	
	$('#fonts').click(function() {
		var hideItems = [ "fonts", "bigger-text", "smaller-text", "line-height", "themes", "theme-bw", "theme-wb", "theme-by", "compact", "normal", "stretch",
			"text-mode", "mode-full", "mode-first", "mode-outline" ];
		var showItems = [ "back", "serif", "sans-serif" ];
		
		changeVisibility(hideItems, showItems);
	});
	
    $('#serif').click(function() {
        canvas.css('font-family', 'serif');
        pageScroll();
    });
    
    $('#sans-serif').click(function() {
        canvas.css('font-family', 'sans-serif');
        pageScroll();
    });
    
    $('#bigger-text').click(function() {
        fontSize += 0.25;
        canvas.css('font-size', fontSize + 'em');
        pageScroll();
    });
    
    $('#smaller-text').click(function() {
        fontSize -= 0.25;
        canvas.css('font-size', fontSize + 'em');
        pageScroll();
    });
    
    $('#themes').click(function() {
    	var hideItems = [ "fonts", "bigger-text", "smaller-text", "serif", "sans-serif", "line-height", "themes", "compact", "normal", "stretch",
			"text-mode", "mode-full", "mode-first", "mode-outline" ];
		var showItems = [ "back", "theme-bw", "theme-wb", "theme-by"];
		
		changeVisibility(hideItems, showItems);
    });
    
    $('#theme-bw').click(function() {
        canvas.css('background-color', 'black');
        canvas.css('color', 'white');
        body.css('background-color', 'black');
        body.css('color', 'white');
    });
    
    $('#theme-wb').click(function() {
        canvas.css('background-color', 'white');
        canvas.css('color', 'black');
        body.css('background-color', 'white');
        body.css('color', 'black');
    });
    
    $('#theme-by').click(function() {
        canvas.css('background-color', 'rgb(255,245,220)');
        canvas.css('color', 'black');
        body.css('background-color', 'rgb(255,245,220)');
        body.css('color', 'black');
    });
    
    $('#line-height').click(function() {
    	var hideItems = [ "fonts", "bigger-text", "smaller-text", "serif", "sans-serif", "line-height", "themes", "theme-bw", "theme-wb", "theme-by",
			"text-mode", "mode-full", "mode-first", "mode-outline" ];
		var showItems = [ "back", "compact", "normal", "stretch" ];
		
		changeVisibility(hideItems, showItems);
    });
    
    $('#compact').click(function() {
        $('.paragraph').css('line-height', '1');
        pageScroll();
    });
    
    $('#normal').click(function() {
        $('.paragraph').css('line-height', '1.5');
        pageScroll();
    });
    
    $('#stretch').click(function() {
        $('.paragraph').css('line-height', '2');
        pageScroll();
    });
    
    $('#text-mode').click(function() {
    	var hideItems = [ "fonts", "bigger-text", "smaller-text", "serif", "sans-serif", "line-height", "compact", "normal", "stretch", "themes", 
    	"theme-bw", "theme-wb", "theme-by", "text-mode" ];
		var showItems = [ "back", "mode-full", "mode-first", "mode-outline" ];
		
		changeVisibility(hideItems, showItems);
    });
    
    $('#mode-full').click(function() {
        $('.sentence').css('display', 'inline');
        $('.word').css('display', 'inline');
        pageScroll();
    });
    
    $('#mode-first').click(function() {
        $('.sentence').css('display', 'none');
        $('.sentence-1').css('display', 'inline');
        pageScroll();
    });
    
    $('#mode-outline').click(function() {
        $('.sentence').css('display', 'inline');
        $('.word').css('display', 'none');
        $('.highlighted-word').css('display', 'inline');
        pageScroll();
    });

    canvas.scroll(function()
    {
        var progress = updateProgressBar();
        /*  console.log("Scroll Top=" + canvas.scrollTop()
         + "\tScroll Height=" + canvas.get(0).scrollHeight
         + "\tRemaining Scroll =" + (canvas.get(0).scrollHeight - canvas.scrollTop())
         + "\tProgress=" + progress);
         */
        if (progress >= 100)
        {
            canvas.stop();
        }
    });
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

function updateSlider() {
    // Default speed value
    var val = speedSlider.val();
    speed = (val === 0) ? 0 : minSpeed + val * 10;
    
    console.log(speed);
    
    speedSlider.change(function()
    { 
        var value = $(this).val();
        speed = (value === 0) ? 0 : minSpeed + value * 10;
        
        pageScroll();
    });
}

function pageScroll() {

    if (speed === 1)
        canvas.stop();
    else {
        updateSpeed();
        
        console.log(speed + "wpm\t" + remainingDuration + "ms");
        
        if(playing == true) {
        
			canvas.stop().animate({
				scrollTop: canvas.get(0).scrollHeight + 'px'
			}, remainingDuration, "linear");
		}
		else {
			canvas.stop();
		}
    }
}

function updateSpeed() {
	var text = grabText();
	var wordCount = getWordCount(text);
	var duration = wordCount / speed;
	
	remainingDuration = duration * 60 * 100 * (1 - getProgress());
	
	var elapsed = (duration * 6) - (remainingDuration / 1000);
	
	if(wordCount != 1) {
		cntTotalTime.text(calculateTime(duration * 6));
		cntTime.text(calculateTime(elapsed));
	}
}

function calculateTime(time) {
	time = Math.round(time);
	
	var minutes = Math.floor(time / 60);
	
	if(minutes < 10) {
		minutes = "0" + minutes;
	}
	
	var seconds = time % 60;
	
	if(seconds < 10) {
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
//    console.log(words);
    console.log('Words=' + words.length);
    return words.length;
}

function getProgress()
{
    var canvasH = parseInt(canvas.css('height'));
    var currentScroll = parseInt(canvas.scrollTop());
    var scrollH = canvas.get(0).scrollHeight;
    var progress = 0;
    
    if(currentScroll != 0) {
    	var progress = currentScroll / (scrollH - canvasH);	
    }
    
    return progress;
}

function getRemainingScroll()
{
    var currentScroll = parseInt(canvas.scrollTop());
    var remainingScroll = canvas.get(0).scrollHeight - currentScroll;
    console.log('remainingScroll=' + remainingScroll);
    return remainingScroll;
}

function grabText()
{
    var text = canvas.text();
//    console.log(text);
    return text;
}


function addWordEvents()
{
    $('.word').unbind('click');
    $('.word').on('click', function()
    {
        var self = $(this);
        console.log(self.text() + ' clicked');
        if (self.hasClass('highlighted-word'))
            self.removeClass('highlighted-word');
        else
            self.addClass('highlighted-word');
    })
}

function updateProgressBar()
{
    var progress = Math.ceil(getProgress() * 100) + '%';
    var bar = $('#progress-bar');
    bar.css('width', progress);
    bar.text(progress);
    
    updateSpeed();
    
    return progress;
}

