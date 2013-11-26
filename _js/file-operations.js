/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    initFileOps();
});
//var file;
function initFileOps()
{
//    addTextEditEvent();
}
/**
 * 
 * @param {file} file
 * @returns {undefined}
 */
function processFile(file)
{
//    console.log(file.type);
    switch (file.type)
    {
        case 'text/plain':
            readFileAsText(file);
            break;
            /*   case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
             readFileAsDocx(file);
             break;
             */
    }

}

function readFileAsText(file)
{

    var reader = new FileReader();
    reader.onload = function(e) {
        var text = reader.result;
//        console.log(text);
        processText(text);
    };
    reader.readAsText(file);
}

function readFileAsDocx(file)
{
    console.log(file);


    var reader = new FileReader();
    reader.onload = function(e) {
        var text = reader.result;
        console.log(text);
        var doc = new docx(text);
        console.log(doc);
        /*   var output = "";
         var paragraphs = text.split("\n");
         
         //        console.log(paragraphs);
         
         for (var i = 0, j = paragraphs.length; i < j; i++)
         {
         var para = paragraphs[i];
         
         para = cleanParagraph(para, i);
         var out = "<div id='paragraph-" + i + "' class='paragraph"
         + ((i === 0) ? " first-paragraph" : "")
         + ((i === (j - 1)) ? " last-paragraph" : "")
         + "'>"
         + "<table><tr><td class='paragraph-label'>" + i
         + "</td><td><p>" + para + "<p></td><td>"
         + "<div id='paragraph-time-" + i + "' class='paragraph-time'>" + "</div>"
         + "</td></tr></table></div>";
         output += out;
         }
         
         console.log(output);
         
         $('#text-canvas').empty().append(output);
         */
    };
    reader.readAsText(file);
//    var doc = new docx(file);
//    console.log(doc);
//    var output = convertContent(doc);
//    console.log(output);
}

function cleanParagraph(para, paraIndex)
{
    para = para.trim();
    para = para.replace('  ', ' ');

    var sentences = para.split('.');
    var output = "";
    var outCount = 0;
    var ignoreArray = ['\n', '\t', '.', '...', ' '];
    for (var i = 0, j = sentences.length; i < j; i++)
    {
        var sout = "";
        var sentence = sentences[i] + '.';
//        console.log(sentence);
        if ($.inArray(sentence, ignoreArray) !== -1)
        {
            continue;
        }
        else {
            var words = sentence.split(' ');
            var wout = "";
            for (var k = 0, l = words.length; k < l; k++)
            {

                var word = words[k];
                if (word && word.length > 0)
                    wout += "<span id='word-" + paraIndex + "-" + i + "-" + k
                            + "' class='word-" + k + " word'>"
                            + word + " </span>";
            }
            outCount++;
            sout = "<span id='sentence-" + paraIndex + "-" + i + "' class='sentence sentence-" + outCount + "' class='sentence'>"
                    + wout.trim() + " </span>";
//            console.log(sout);
            output += sout;
        }

    }

//    console.log(output);
    output = output.replace('\n', '');
    return output;
}




function saveCurrentFile()
{
    return 0;
}
function processText(text)
{
    var output = "";
    var paragraphs = text.split("\n");

//        console.log(paragraphs);

    for (var i = 0, j = paragraphs.length; i < j; i++)
    {
        var para = paragraphs[i];

        para = cleanParagraph(para, i);
        var out = "<div id='paragraph-div-" + i + "' class='paragraph-div"
//                + ((i === 0) ? " first-paragraph" : "")
//                + ((i === (j - 1)) ? " last-paragraph" : "")
                + "'>"
                + "<div class='paragraph-label'>" + i + "</div>"
                + "<div id='paragraph-" + i + "' class='paragraph' contenteditable='true'>"
                + "<p>" + para + "</p></div>"
                + "<div id='paragraph-time-" + i + "' class='paragraph-time'></div></div>";
        output += out;
    }

//    console.log(output);

    $('#text-canvas').empty().append(output);
    $('.paragraph-div').first().addClass('first-paragraph');
    $('.paragraph-div').last().addClass('last-paragraph');
    addWordEvents();
    addTextEditEvent();

}
function reloadText()
{
    var paragraphs = $('.paragraph');

    console.log(paragraphs);
    var out = "";
    for (var i = 0, j = paragraphs.length; i < j; i++)
    {
        var para = $(paragraphs[i]);
        console.log(para.html());
        out += para.text() + "\n";
    }
//        var text = );
    console.log(out);
    processText(out);
}
function addTextEditEvent()
{
    var paras = $('.paragraph');
    console.log('Adding edit event');
    console.log(paras);
    for (var i = 0, j = paras.length; i < j; i++)
    {
        var para = $(paras[i]);
        var id = para.attr('id');
        console.log(para);
        para.attr('contenteditable', true);
//        para.unbind('input');
        para.on('click', function() {
            console.log('para clicked=' + para.attr('id'));
        });

        $('#' + id).bind('input', function()
        {

            var self = $(this);
            console.log('text changed: ' + self.attr('id'));
            console.log(self.text());
            console.log(self.html());
            /*var paragraphs = $('.paragraph');
             
             console.log(paragraphs);
             var out = "";
             for (var i = 0, j = paragraphs.length; i < j; i++)
             {
             var para = $(paragraphs[i]);
             console.log(para.text());
             out += para.text() + "\n";
             }
             //        var text = );
             console.log(out);
             //            processText(out);
             */
        });
    }
    /*
     $('#text-canvas').unbind('input');
     $('#text-canvas').on('input', function()
     {
     console.log('text changed');
     var self = $(this);
     var paragraphs = $('.paragraph');
     
     console.log(paragraphs);
     var out = "";
     for (var i = 0, j = paragraphs.length; i < j; i++)
     {
     var para = $(paragraphs[i]);
     console.log(para.text());
     out += para.text() + "\n";
     }
     //        var text = );
     console.log(out);
     processText(out);
     
     });
     */
}