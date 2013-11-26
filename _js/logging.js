/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var currentUser = "";
var USERS_FILE = "users.txt";
var EVENTS_FILE = "events.txt";

$(document).ready(function() {

   createUser();
   console.log(currentUser);
});
function Event()
{
    this.id = 0;
    this.user;
    this.target = "";
    this.value = "";
    this.action = "";
    this.timestamp = new Date();
}

function User()
{
    this.id = 0;
    this.age = 0;
    this.gender = "";
    this.education = "";
    this.occupation = "";
}
function createUser()
{
//    var lines = readFileLines(USERS_FILE);
//    currentUser = "user-" + lines.length;
    currentUser = Math.ceil(Math.random() * 1000000);
    return currentUser;
}
/**
 * 
 * @param {User} user
 * @returns {undefined}
 */
function logUser(user)
{
    var str = ((event.user) ? event.user : currentUser)
            + "\t" + user.id
            + "\t" + user.age
            + "\t" + user.gender
            + "\t" + user.education
            + "\t" + user.occupation;

    writeToFile(USERS_FILE, str);

}
/**
 * 
 * @param {Event} event
 * @returns {undefined}
 */
function logEvent(event)
{
    var str = "";
    str += event.id
            + "\t" + event.user
            + "\t" + event.target
            + "\t" + event.value
            + "\t" + event.action
            + "\t" + event.timestamp;
    writeToFile(EVENTS_FILE, str);
}
/**
 * 
 * @param {Event} event
 * @returns {undefined}
 */
function logEventToDb(event)
{
    event.user = (event.user) ? event.user : currentUser;
    var sql = "INSERT INTO podium_logs (user_id, target, value, action) "
            + "VALUES (" + currentUser + ",'" + event.target + "','" + event.value
            + "'," + event.action +  ")";

    $.ajax({'type': 'GET',
        'url': 'db-insert.php',
        'data': {'q': sql}
    }).done(function(data)
    {
        console.log(data);
    });
}
function writeToFile(filename, str)
{
    var fw = new FileWriter()

}

function readFileLines(filename)
{
    var lines = [];

    return lines;
}