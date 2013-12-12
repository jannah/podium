/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

fileOpened = false;

function newFile() {
    var out = "<div id='paragraph-div-0' class='paragraph-div first-paragraph"
            + "'>"
            + "<div class='paragraph-label'>0</div>"
            + "<div id='paragraph-0' class='paragraph' contenteditable='true'>"
            + "</div>"
            + "<div id='paragraph-time-0' class='paragraph-time'></div></div>";

    $('#text-canvas').empty().append(out);


    fileOpened = true;
}

function openFile()
{


    var fileSelector = $('#open-file');
//    console.log(fileSelector);
    var file = fileSelector.get(0).files[0];
    var event = new Event();
    event.action = 0;
    event.target = 'File Opened';
    event.value = file.name;
    event.user = getCurrentUserId();
        console.log('openning-file '+file.name);
    logEventToDb(event);
//    console.log(file);
    processFile(file);

    // Set opened file to true
    fileOpened = true;
}

function importFile()
{


}

