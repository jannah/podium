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

function storeFeedback()
{
    var feedback = {
        user_id: currentUser,
        good: $("#fb-good").val(),
        bad: $('#fb-bad').val(),
        limitation: $('#fb-limit').val(),
        suggest: $('#fb-suggest').val(),
        rehearse: $('input[name*=fb-rehearse-choice]:checked').val(),
        present: $('input[name*=fb-present-choice]:checked').val(),
        use_again: $('input[name*=fb-again-choice]:checked').val(),
        overall_rating: $('input[name*=fb-rate-choice]:checked').val()
    };
    console.log(feedback);
    var sql = 'insert into podium_feedback (';
    var first = true;
    for (var key in feedback)
    {
        sql += (!first) ? ',' : '';
        first = false;
        sql += key;
    }
    sql += ') values (';
    first = true;
    for (var key in feedback)
    {
        sql += (!first) ? ',' : '';
        first = false;
        sql += '"' + feedback[key] + '"';
    }
    sql += ')';

    console.log(sql);
    $.ajax({'type': 'GET',
        'url': DB_FILE,
        'data': {'q': sql},
        'asycn': false
    }).done(function(data)
    {
//        console.log(data);
    });
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