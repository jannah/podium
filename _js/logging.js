/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var currentUser = 0;
var USERS_FILE = "users.txt";
var EVENTS_FILE = "events.txt";
var DB_FILE = 'db-operations.php';
$(document).ready(function() {

//    createUser();
//    console.log(currentUser);
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
    this.temp_id = 0;
}

function setCurrentUserId(id)
{
    currentUser = id;
}
function getCurrentUserId()
{
    return currentUser;
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
            + "'," + event.action + ")";

    $.ajax({'type': 'GET',
        'url': DB_FILE,
        'data': {'q': sql},
        'asycn': false
    }).done(function(data)
    {
//        console.log(data);
    });
}