/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function newFile() {
	var out = "<div id='paragraph-div-0' class='paragraph-div first-paragraph"
                + "'>"
                + "<div class='paragraph-label'>0</div>"
                + "<div id='paragraph-0' class='paragraph' contenteditable='true'>"
                + "</div>"
                + "<div id='paragraph-time-0' class='paragraph-time'></div></div>";
    
    $('#text-canvas').empty().append(out);
}

function openFile()
{
    console.log('openning-file');
    var fileSelector = $('#open-file');
//    console.log(fileSelector);
    var file = fileSelector.get(0).files[0];

//    console.log(file);
    processFile(file);
}

function importFile()
{


}

