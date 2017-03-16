$(function(){
    var log = console.log
    
    $('button').on('click', function(){
        log('button click')
        if(subscription){
            $.ajax('/webpush/push',{
                type: 'post',
                dataType: 'json',
                data: {
                    subscription: JSON.stringify(subscription),
                    message: 'hehehe'
                },
                success: function(data){

                }
            })
        }
    })
})