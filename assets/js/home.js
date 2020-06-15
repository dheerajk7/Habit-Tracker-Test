var doneButtons = document.querySelectorAll('.done');
var notDoneButtons = document.querySelectorAll('.not-done');
var nullButtons = document.querySelectorAll('.null-status');

//function to change staus and create status if not present 
function changeStatusCall(id,status)
{
    let date = new Date().toLocaleDateString();
    $.ajax(
        {
            type:'get',
            url:'changeStatus',
            data:{id:id,status:status,date:date},
            success:function(data)
            {
                let element = $('#status-update');
                element.css('display','block');
                setTimeout(function()
                {
                    element.css('display','none');
                },1000);
            },
            error:function(err)
            {
                console.log(`Error in ajax Call ${status}`);
            }
        }
    );
}

//adding event listener to done buttons
for(button of doneButtons)
{
    button.addEventListener('click',function()
    {
        let idDone = this.id.slice(5);
        changeStatusCall(idDone,'done');
    }
    );
}

//adding event listener to not done buttons
for(button of notDoneButtons)
{
    button.addEventListener('click',function()
    {
        let idNotDone = this.id.slice(9);
        changeStatusCall(idNotDone,'not-done');
    }
    );
}

for(button of nullButtons)
{
    button.addEventListener('click',function()
    {
        let idNull = this.id.slice(5);
        changeStatusCall(idNull,'null');
    }
    );
}

$('#delete-button').click(function()
{
    //fethcing all the checkbox
    let allCheckbox = document.querySelectorAll('.checkbox-container input');
    let checkedItem = [];
    //collecting id of all the checked checkbox
    for(item of allCheckbox)
    {
        if(item.checked)
        {
            checkedItem.push(item.id);
        }
    }
    console.log(checkedItem);
    //deleting all the habit with checked id 
    $.ajax(
        {
            type:'get',
            url:'/delete',
            data:{info:checkedItem},
            error:function(error)
            {
            }
        }
    );

    //removing DOM of all checked Id
    for(id of checkedItem)
    {
        $(`#item-${id}`).remove();
    }
});