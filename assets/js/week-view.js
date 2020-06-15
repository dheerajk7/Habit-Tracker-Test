let lastSevenDates = [];
let currDate = new Date();
//getting last seven dates including curernt dates
for(var i=6;i>=0;i--)
{
    lastSevenDates.push(new Date(currDate.getTime() - (i * 24 * 60 * 60 * 1000)));
}

//getting all the habit for week page
let habitsItem = document.querySelectorAll('.week-item-container');
let habitId = [];

//getting all the id's of habit from week view page
for(item of habitsItem)
{
    habitId.push(item.id.slice(6));
}

//iterating over all the habit id's and getting the status of all the seven date and updating it
for(id of habitId)
{
    for(date of lastSevenDates)
    {
        let result = [];
        //getting status of particular date
        $.ajax(
            {
                type:'get',
                url:'day-status',
                data:{id:id,date:date},
                success:function(data)
                {
                    let getStatusHtml = getStatusHTML(data.data.habitStatus);
                    let newDate = new Date(data.data.date).getDate();
                    let itemDom = $(
                        `<div class="item-container" id="item-${data.data.habit_id}">
                        <div class="date-container">
                            ${newDate}
                        </div>
                        <div class="status-container" id="${new Date(data.data.date).getDate()}-${data.data.habit_id}" >
                            <div id="status-${new Date(data.data.date).getDate()}-${data.data.habit_id}" class="status-value">${getStatusHtml}</div>
                            <ul class="option-list" id="list-${new Date(data.data.date).getDate()}-${data.data.habit_id}">
                                <li><button id="done-${new Date(data.data.date).getDate()}-${data.data.habit_id}" data-habit="${data.data.habit_id}" data-date="${data.data.date}" class="done"><i class="fa fa-check" aria-hidden="true"></i></button></li>
                                <li><button id="not-done-${new Date(data.data.date).getDate()}-${data.data.habit_id}" data-habit="${data.data.habit_id}" data-date="${data.data.date}" class="not-done"><i class="fa fa-times" aria-hidden="true"></i></button></li>
                                <li><button id="null-${new Date(data.data.date).getDate()}-${data.data.habit_id}" data-habit="${data.data.habit_id}" data-date="${data.data.date}" class="null-status"><i class="fa fa-trash" aria-hidden="true"></i></button></li>
                            </ul>
                        </div>
                    </div>`
                    );
                    $(`#day-${data.data.habit_id}`).append(itemDom);
                    //adding listener to update the status
                    $(`#done-${new Date(data.data.date).getDate()}-${data.data.habit_id}`).click(function()
                    {
                        let date = $(this).attr('data-date');
                        let id = $(this).attr('data-habit');
                        changeStatusCall(id,'done',date);
                        let newDate = new Date(date).getDate();
                        let statusId = `status-${newDate}-${id}`;
                        $(`#${statusId}`).html('<i class="fa fa-check" aria-hidden="true"></i>');
                    });
                    $(`#not-done-${new Date(data.data.date).getDate()}-${data.data.habit_id}`).click(function()
                    {
                        let date = $(this).attr('data-date');
                        let id = $(this).attr('data-habit');
                        changeStatusCall(id,'not-done',date);
                        let newDate = new Date(date).getDate();
                        let statusId = `status-${newDate}-${id}`;
                        $(`#${statusId}`).html('<i class="fa fa-times" aria-hidden="true"></i>');
                    });
                    $(`#null-${new Date(data.data.date).getDate()}-${data.data.habit_id}`).click(function()
                    {
                        let date = $(this).attr('data-date');
                        let id = $(this).attr('data-habit');
                        changeStatusCall(id,'null',date);
                        let newDate = new Date(date).getDate();
                        let statusId = `status-${newDate}-${id}`;
                        $(`#${statusId}`).html('');
                    });

                    //for showing the list and hidding again of button to update status
                    $(`#${new Date(data.data.date).getDate()}-${data.data.habit_id}`).click(function()
                    {
                        let id = `#list-${this.id}`
                        let listItem = $(id);
                        listItem.css('display','block');
                        setTimeout(function()
                        {
                            listItem.css('display','none');
                        },2000);
                    });
                },
                error:function(err)
                {
                    console.log(`Error in ajax Call ${status}`);
                }
            }
        );
    }    
}

//function to changes status for the particular habit Id and date in status table
function changeStatusCall(id,status,date)
{
    $.ajax(
        {
            type:'get',
            url:'changeStatus',
            data:{id:id,status:status,date:date},
            error:function(err)
            {
                console.log(`Error in ajax Call ${status}`);
            }
        }
    );
}

//getting icons for status and updating them in view
function getStatusHTML(status)
{
    let rightHtml = '<i class="fa fa-check" aria-hidden="true"></i>';
    let crossHtml = '<i class="fa fa-times" aria-hidden="true"></i>';
    if(status === 'done')
    {
        return rightHtml;
    }
    else if(status === 'not-done')
    {
        return crossHtml;
    }
    else
    {
        return "";
    }
}