const mongoose = require('mongoose');

const habitStatusSchema = new mongoose.Schema(
    {
        habit:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Habit',
            required:true,  
        },
        habit_status:
        {
            type:String,
            required:true,
        },
        date_created:
        {
            type:String,
            require:true,
        }
    },
    {
        timestamps:true,
    }
);

const habitStatusModel = mongoose.model('HabitStatus',habitStatusSchema);
module.exports = habitStatusModel;