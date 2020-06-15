const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true,
            unique:true,
        },
        time:
        {
            type:String,
            required:true,
        },
        target_date:
        {
            type:Date,
        },
        target_days:
        {
            type:Number,
        },
        completed_count:
        {
            type:Number,
            required:true,
        }
    },
    {
        timestamps:true,
    }
);

const habitModel = mongoose.model('Habit',habitSchema);
module.exports = habitModel;