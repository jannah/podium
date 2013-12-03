
$(document).on('ready', function() {
    saveAction();
});
var DB_FILE = 'db-operations.php';
function saveAction(action)
{
    $('#sendForm').on('click', function()
    {
        console.log('sending user info');
        var age = parseInt($('#ag').val());
        var gender = $('#gen').val();
        var location = $('#loc').val();
        var education = $('#edu').val();
        var temp_id = Math.ceil(Math.random() * 1000000);

        var sql = "insert into podium_users (gender, age,education,location, temp_id)"
                + " values ('" + gender + "'," + ((age)?age:"''") + ",'" + education + "','" + location + "'," + temp_id + ")";

        console.log(sql);
        var jqXHR = $.ajax({
            'type': 'GET',
            'url': DB_FILE,
            'data': {
                'q': sql
            },
            'async': false
        });

        var sql2 = "select * from podium_users where temp_id=" + temp_id;


        console.log(sql2);
        var jqXHR2 = $.ajax({
            'type': 'GET',
            'url': DB_FILE,
            'data': {
                'q': sql2
            },
            'async': false
        });


        var data = $.parseJSON(jqXHR2.responseText);
        console.log(data);
        setCurrentUserId(parseInt(data[0]['user_id']));
//        console.log(data);

    });
}