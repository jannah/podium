/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var canvas;
var fontSize = 1;
var speed = 0;
$(document).ready(function() {

    init();
});


function init()
{
    canvas = $('#text-canvas');
    addMenuEvents();
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

    });
    $('#theme-wb').click(function() {
        canvas.css('background-color', 'white');
        canvas.css('color', 'black');

    });

    $('#theme-by').click(function() {
        canvas.css('background-color', 'rgb(255,245,220)');
        canvas.css('color', 'black');

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


}

function updateSlider(value) {
    console.log(value);
    speed = value;
    pageScroll();

}
function pageScroll() {
  /*  while (speed > 0)
    {
        window.scrollBy(0, speed);
        scrolldelay = setTimeout('pageScroll()', 10);
    }
    */
}