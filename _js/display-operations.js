/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var canvas;
var body;
var slider;
var navpanel;

var btnOpenFile;
var inpOpenFile;

var fontSize = 1;
var speed = 0;
var minSpeed = 50;
var maxSpeed = 250;
$(document).ready(function() {

    init();
});


function init()
{
    resizeDiv();
    
    canvas = $('#text-canvas');
    body = $('#page');
    slider = $('#right-menu');
    navpanel = $('#nav-panel');
    
    btnOpenFile = $('#openfile');
    inpOpenFile = $('#open-file');
    
    inpOpenFile.css('opacity', 0);
    inpOpenFile.css('filter','alpha(opacity = 0');
    inpOpenFile.hide();
    
    btnOpenFile.click(function() {
    	inpOpenFile.trigger('click');
    	return false;
    });
    
    addMenuEvents();
    setCanvasHeight();
    updateProgressBar();
    
}

function setCanvasHeight()
{
	var elem = (document.compatMode === "CSS1Compat") ? 
    document.documentElement :
    document.body;

	var height = elem.clientHeight - 53;
	var width = elem.clientWidth;
	
	canvas.css('height', (height - 50));
	slider.css('height', (height));
	body.css('height', height);
	navpanel.css('height', height);
}

function addMenuEvents()
{
    $('#serif').click(function() {
        canvas.css('font-family', 'serif');
        pageScroll();
    });
    $('#sans-serif').click(function() {
        canvas.css('font-family', 'sans-serif');
        pageScroll();
    });
    $('#bigger-text').click(function() {
//        var size = parseFloat(canvas.css('font-size'));
//       console.log(size);
        fontSize += 0.25;
//        console.log(size);
        canvas.css('font-size', fontSize + 'em');
        pageScroll();
    });
    $('#smaller-text').click(function() {
//        var size = parseFloat(canvas.css('font-size'));
//        console.log(size);
        fontSize -= 0.25;
//        console.log(size);
        canvas.css('font-size', fontSize + 'em');
        pageScroll();
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
    $('#mode-keyword').click(function() {
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

function updateSlider(value) {
    console.log(value);

    value = parseInt(value);
    speed = (value === 0) ? 0 : minSpeed + value * 10;
    pageScroll();

}
function pageScroll() {

    if (speed === 1)
        canvas.stop();
    else {
        var text = grabText();

        var wordCount = getWordCount(text);
        var duration = wordCount / speed;
        var remainingDuration = duration * 60 * 100 * (1 - getProgress());

        console.log(speed + "wpm\t" + remainingDuration + "ms");

        canvas.stop().animate({
            scrollTop: canvas.get(0).scrollHeight + 'px'
        }, remainingDuration);

    }
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
    var progress = currentScroll / (scrollH - canvasH);
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

    return progress;

}
