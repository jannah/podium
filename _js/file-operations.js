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
<<<<<<< HEAD
            para = cleanParagraph(para, i);
            var out = "<div id='paragraph-" + i + "' class='paragraph"
                    + ((i === 0) ? " first-paragraph" : "")
                    + ((i === (j - 1)) ? " last-paragraph" : "")
                    + "'>"
                    + "<table><tr><td class='paragraph-label'>" + i
=======
            para = cleanParagraph(para);
            var out = "<div id='paragraph-" + i + "' class='paragraph'>"
                    + "<table><tr><td class='paragraph-label'>" + i 
>>>>>>> be42b4e753389a0d7f13b4149d2eb98ee99a7052
                    + "</td><td><p>" + para + "<p></td><td>"
                    + "<div id='paragraph-time-" + i + "' class='paragraph-time'>" + "</div>"
                    + "</td></tr></table></div>";
            output += out;
        }

        console.log(output);

        $('#text-canvas').empty().append(output);

    };
    reader.readAsText(file);
}

function cleanParagraph(para)
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

            outCount++;
            sout = "<span class='sentence sentence-" + outCount + "' class='sentence'>"
                    + sentence.trim() + " </span>";
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
