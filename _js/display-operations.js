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
    });
    $('#sans-serif').click(function() {
        canvas.css('font-family', 'sans-serif');
    });
    $('#bigger-text').click(function() {
//        var size = parseFloat(canvas.css('font-size'));
//       console.log(size);
        fontSize += 0.25;
//        console.log(size);
        canvas.css('font-size', fontSize + 'em');
    });
    $('#smaller-text').click(function() {
//        var size = parseFloat(canvas.css('font-size'));
//        console.log(size);
        fontSize -= 0.25;
//        console.log(size);
        canvas.css('font-size', fontSize + 'em');
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
    });
    $('#normal').click(function() {
        $('.paragraph').css('line-height', '1.5');
    });
    $('#stretch').click(function() {
        $('.paragraph').css('line-height', '2');
    });

    $('#mode-full').click(function() {
        $('.sentence').css('display', 'inline');
    });

    $('#mode-first').click(function() {
        $('.sentence').css('display', 'none');
        $('.sentence-1').css('display', 'inline');

    });


    canvas.scroll(function()
    {
        var progress = Math.ceil(getProgress() * 100) + '%';

        var bar = $('#progress-bar');
        bar.css('width', progress);
        bar.text(progress);


    })


}

function updateSlider(value) {
    console.log(value);


    speed = (value === 0) ? 0 : minSpeed + value * 10;
    pageScroll();

}
function pageScroll() {


    var text = grabText();

    var wordCount = getWordCount(text);
    var duration = wordCount / speed;
    var remainingDuration = duration * 60 * 100 * getProgress();

    console.log(speed + "wpm\t" + remainingDuration + "ms");

    canvas.stop().animate({
        scrollTop: getRemainingScroll() + 'px'
    }, remainingDuration);


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
    console.log(words);
    console.log('Words=' + words.length);
    return words.length;
}

function getProgress()
{
    var remainingScroll = getRemainingScroll();
    var h = canvas.get(0).scrollHeight;
    var remainingScrollFactor = remainingScroll / h;
    return remainingScrollFactor;
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
    console.log(text);
    return text;
}