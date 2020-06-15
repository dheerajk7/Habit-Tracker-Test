const Habit = require('../models/Habit');
const HabitStatus = require('../models/HabitStatus');
const habitStatusModel = require('../models/HabitStatus');

module.exports.home = async function(request,response)
{
    try
    {
        let habits = await Habit.find({});
        console.log(habits);
        return response.render('home',
        {
            title:'Home',
            habits:habits,
        });
    }
    catch(err)
    {
        console.log('Error in getting habits');
        return;
    }
    
}

//rendering add habit view
module.exports.addHabit = function(request,response)
{
    return response.render('add-habit',
    {
        title: 'Add Habit',
    });
}

//saving a habit
module.exports.saveHabit = async function(request,response)
{
    try
    {
        console.log(request.body);
        let habit = await Habit.create(
            {
                title:request.body.title,
                time:request.body.time,
                target_date:request.body.target_date,
                target_days:request.body.target_days,
                completed_count:0,
            }
        );
    
        return response.redirect('/');
    }
    catch(err)
    {
        console.log('Error in creating Habit',err);
        return;
    }
    
}

//to change the status if already present otherwise create status for the particular date and day
module.exports.changeStatus = async function(request,response)
{
    try
    {
        let status = null;
        if(request.query.status != 'null')
        {
            status = request.query.status;
        }
        let dateToFind = request.query.date;
        let statusToken = await HabitStatus.findOne({habit:request.query.id,date_created:dateToFind});
        if(statusToken)
        {
            //updating status if status is already there
            await statusToken.updateOne({habit_status:status});
            statusToken.save();
        }
        else
        {
            let habit = await Habit.findById(request.query.id);
            if(habit)
            {
                //creating status if status is not there
                await HabitStatus.create({
                    habit:habit.id,
                    habit_status:status,
                    date_created:dateToFind,
                });
            }
        }
        if(request.xhr)
        {
            return response.status(200).json(
                {
                    message:'Habit Status Created',
                }
            );
        }
        return response.redirect('back');
    }
    catch(err)
    {
        console.log('Error in updating done Status',err);
        return;
    }
}

//sending habit to week views 
module.exports.weekView = async function(request,response)
{
    let habits = await Habit.find({});
    return response.render('week-view',
    {
        habits:habits,
    }
    );
}

//getting stautus of particular date
module.exports.dayStatus = async function(request,response)
{
    queryDate = new Date(request.query.date);
    let date = queryDate.toLocaleDateString();
    let habitStatus = await habitStatusModel.findOne({habit:request.query.id,date_created:date});
    if(request.xhr)
    {
        if(habitStatus)
        {
            return response.status(200).json({
                data:
                {
                    habitStatus:habitStatus.habit_status,
                    date:date,
                    habit_id:request.query.id,
                },
                message:"entry found",
            });
        }
        else
        {
            return response.status(200).json(
                {
                    data:
                    {
                        habitStatus:"null",
                        date:date,
                        habit_id:request.query.id,
                    },
                    message:'entry not found',
                }
            );
        }
        
    }
}


//to delete selected the habit
module.exports.delete = async function(request,response)
{
    try
    {
        for(item of request.query.info)
        {
            await Habit.findByIdAndDelete(item);
            await habitStatusModel.deleteMany({habit:item});
        }
        if(request.xhr)
        {
            return response.status(200).json(
                {
                    message:'Deleted Successfully'
                }
            );
        }
        return response.redirect('/');
    }
    catch(err)
    {
        console.log(err);
        return response.status(500).json(
            {
                message:'Internal Server Error',
            }
        );
    }
}