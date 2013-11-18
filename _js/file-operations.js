/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var file;


function processFile(file)
{
    switch (file.type)
    {
        case 'text/plain':
            readFileAsText(file);
            break;
    }
}
function readFileAsText(file)
{

    var reader = new FileReader();
    reader.onload = function(e) {
        var text = reader.result;
//        console.log(text);
        var output = "";
        var paragraphs = text.split("\n");

//        console.log(paragraphs);

        for (var i = 0, j = paragraphs.length; i < j; i++)
        {
            var para = paragraphs[i];
            para = cleanParagraph(para, i);
            var out = "<div id='paragraph-" + i + "' class='paragraph'>"
                    + "<table><tr><td class='paragraph-label'>" + i
                    + "</td><td><p>" + para + "<p></td><td>"
                    + "<div id='paragraph-time-" + i + "' class='paragraph-time'>" + "</div>"
                    + "</td></tr></table></div>";
            output += out;
        }

        console.log(output);

        $('#text-canvas').empty().append(output);
        addWordEvents();

    };
    reader.readAsText(file);
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
        console.log(sentence);
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
    output = output.replace('<p></p>', '');
    return output;


}



function saveCurrentFile()
{
    return 0;
}