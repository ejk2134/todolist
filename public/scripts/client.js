$(document).ready(onReady);

function onReady(){
    console.log('js sourced');
    //listeners
    $('#newTask').on('click', newTask);
    $('#taskDisplay').on('click', '.completeButton', markComplete);
    // display tasks on DOM
    getTasks();
}

function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function(taskList){
            $('#taskDisplay').empty();
            for (var i = 0; i < taskList.length; i++){
                var $newRow = $('<tr>').data('id', taskList[i].id);
                $newRow.append('<td>' + taskList[i].task + '</td>');
                $newRow.append('<td>' + taskList[i].description + '</td>');
                $newRow.append('<td>' + taskList[i].date_added + '</td>');
                $newRow.append('<td>' + taskList[i].deadlinedate + taskList[i].deadlinetime + '</td>');
                if (taskList[i].complete === false){
                    $button = $('<button>', {class: 'completeButton', text: 'Mark as complete'});
                    $newRow.append(($('<td>').append($button)));
                }else{
                    $newRow.append('<td>'+'Task complete'+'</td>');
                }
                $('#taskDisplay').append($newRow);
            }
        }
    })
}

function newTask(){
    var dueDate = $('#dueYear').val() + '-' + $('#dueMonth').val() + '-' + $('#dueDay').val()
    var newTask = {
        task: $('#taskName').val(),
        description: $('#desc').val(),
        deadlinedate: dueDate,
        deadlinetime: $('#dueTime').val()
    }

    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask,
        success: function(res){
            console.log('server sent response:', res);
            getTasks();
        }
    });
}

function markComplete(){
    var taskID = $(this).parent().parent().data('id');
    $.ajax({
        type: 'PUT',
        url: '/tasks/' + taskID,
        success: function(res){
            console.log('Server response:', res);
            getTasks();
        }
    })
}