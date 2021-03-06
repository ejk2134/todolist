$(document).ready(onReady);

function onReady(){
    console.log('js sourced');
    //listeners
    $('#newTask').on('click', newTask);
    $('#taskDisplay').on('click', '.completeButton', markComplete);
    $('#taskDisplay').on('click', '.deleteButton', deleteTask);
    // display tasks on DOM
    getTasks();
}

function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function(taskList){
            $('#taskDisplay').empty();
            // incomplete tasks first
            for (var i = 0; i < taskList.length; i++){
                // add incomplete tasks first
                if (taskList[i].complete === false){
                    // create a new row
                    var $newRow = $('<tr>').data('id', taskList[i].id);
                    // add task attributes to new row
                    $newRow.append('<td>' + taskList[i].task + '</td>');
                    $newRow.append('<td>' + taskList[i].description + '</td>');
                    $newRow.append('<td>' + displayDate(taskList[i].date_added) + '</td>');
                    $newRow.append('<td>' + displayDate(taskList[i].deadlinedate) + ' at <span class="table-time">' + displayTime(taskList[i].deadlinetime) + '</span></td>');
                    // give incomplete task rows css class and complete button
                    $newRow.attr('class', 'incomplete-task');
                    var $button = $('<button>', {class: 'completeButton btn btn-success btn-sm', text: 'Complete?'});
                    $newRow.append($('<td>').append($button));
                    // add delete button
                    var $deleteButton = $('<button>', {type: "button", class: 'btn btn-danger btn-sm deleteButton', text: 'Forget?'});
                    $newRow.append(($('<td>').append($deleteButton)));
                    $('#taskDisplay').append($newRow);
                }
            }
            for (var i = 0; i < taskList.length; i++){
                // then complete tasks
                if (taskList[i].complete === true){
                    // add new row
                    var $newRow = $('<tr>').data('id', taskList[i].id);
                    // add task attributes
                    $newRow.append('<td>' + taskList[i].task + '</td>');
                    $newRow.append('<td>' + taskList[i].description + '</td>');
                    $newRow.append('<td>' + displayDate(taskList[i].date_added) + '</td>');
                    $newRow.append('<td>' + displayDate(taskList[i].deadlinedate) + ' at <span class="table-time">' + displayTime(taskList[i].deadlinetime) + '</span></td>');
                    // give completed task css class
                    $newRow.attr('class', 'complete-task');
                    $newRow.append('<td>'+'Task complete'+'</td>');
                    //delete button
                    var $deleteButton = $('<button>', {type: "button", class: 'btn btn-danger btn-sm deleteButton', text: 'Forget?'});
                    $newRow.append(($('<td>').append($deleteButton)));
                    $('#taskDisplay').append($newRow);
                }
            }
        }
    })
}

function newTask(){
    // make sure user has entered a valid date
    if (($('#dueMonth').val() === '02' || $('#dueMonth').val() === '04' || $('#dueMonth').val() === '06' ||
    $('#dueMonth').val() === '09' || $('#dueMonth').val() === '11') && $('#dueDay').val() === '31'){
        alert('That\'s not a real date!');
        return 0;
    }else if(($('#dueMonth').val() === '02' && $('#dueDay').val() === '30')){
        alert('That\'s not a real date!');
        return 0;
    }else if(($('#dueYear').val() % 4 != 0 || $('#dueYear').val() % 100 === 0) && $('#dueMonth').val() === '02'
            && $('#dueDay').val() === '29'){
        alert('That\'s not a real date!');
        return 0;
    }
    // get today's date automatically for date_added attribute
    var timeZoneOffset = (new Date()).getTimezoneOffset() *60000;
    var today = (new Date(Date.now() - timeZoneOffset)).toISOString().slice(0, 10);
    var dueDate = $('#dueYear').val() + '-' + $('#dueMonth').val() + '-' + $('#dueDay').val()
    // create task object to be sent to server
    var newTask = {
        task: $('#taskName').val(),
        description: $('#desc').val(),
        date_added: today,
        deadlinedate: dueDate,
        deadlinetime: $('#dueTime').val()
    }
    // send new task to database
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask,
        success: function(res){
            console.log('server sent response:', res);
            getTasks();
            // reset inputs
            $('#taskName').val('');
            $('#desc').val('');
            $('#dueMonth').val('01');
            $('#dueDay').val('01');
            $('#dueYear').val('2017');
            $('#dueTime').val('00:00:00');
        }
    });
}

function markComplete(){
    var taskID = $(this).parent().parent().data('id');
    // change completed to true
    $.ajax({
        type: 'PUT',
        url: '/tasks/' + taskID,
        success: function(res){
            console.log('Server response:', res);
            getTasks();
        }
    })
}

function deleteTask(){
    var confirm = window.confirm('Click Ok to remove this task from the list');
    if (!confirm){
        return 0;
    }
    var taskID = $(this).parent().parent().data('id');
    // remove row from database
    $.ajax({
        type: 'DELETE',
        url: '/tasks/' + taskID,
        success: function(res){
            console.log('Server response', res);
            getTasks();
        }
    })
}

function displayDate(dateString){
    // make date look good for DOM
    switch (dateString.slice(5, 7)){
        case '01':
        var month = 'January';
        break;
        case '02':
        var month = 'February';
        break;
        case '03':
        var month = 'March';
        break;
        case '04':
        var month = 'April';
        break;
        case '05':
        var month = 'May';
        break;
        case '06':
        var month = 'June';
        break;
        case '07':
        var month = 'July';
        break;
        case '08':
        var month = 'August';
        break;
        case '09':
        var month = 'September';
        break;
        case '10':
        var month = 'October';
        break;
        case '11':
        var month = 'November';
        break;
        case '12':
        var month = 'December';
        break;
    };
    var day = parseInt(dateString.slice(8, 10));
    var year = dateString.slice(0, 4);
    return month + ' ' + day + ', ' + year;
}

function displayTime(timeString){
    // make time look good for DOM
    var hour = parseInt(timeString.slice(0, 2));
    var ampm = 'am';
    if (hour > 12){
        hour -= 12;
        ampm = 'pm';
    }
    var minute = timeString.slice(2, 5);
    if (minute = ':00'){
        minute = '';
    }

    if (timeString === '00:00:00'){
        return 'midnight';
    }else if (timeString === '12:00:00'){
        return 'noon';
    }

    return hour + minute + ampm;
}