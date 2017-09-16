$(document).ready(onReady);

function onReady(){
    console.log('js sourced');
    getTasks();
}

function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function(res){
            console.log('server says', res);
        }
    })
}