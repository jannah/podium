/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function newFile()
{

}

function openFile()
{
    console.log('openning-file');
    var fileSelector = $('#open-file');
    console.log(fileSelector);
    var file = fileSelector.get(0).files[0];
  
    console.log(file);
  processFile(file);


}

function importFile()
{


}

