$(document).ready(onReady);

function onReady(){
    console.log('js sourced');
    getTasks();
}

function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function(taskList){
            //console.log('server says', res);
            for (var i = 0; i < taskList.length; i++){
                var $newRow = $('<tr>');
                $newRow.append('<td>' + taskList[i].task + '</td>');
                $newRow.append('<td>' + taskList[i].description + '</td>');
                $newRow.append('<td>' + taskList[i].date_added + '</td>');
                $newRow.append('<td>' + taskList[i].deadlinedate + taskList[i].deadlinetime + '</td>');
                $newRow.append('<td>complete button</td>');
                $('#taskDisplay').append($newRow);
            }
        }
    })
}