const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'must provide task name'],
        trim:true,
        maxlenght:[41, 'task name can not be more than 41 characters']
    },
    completed:{
        type:Boolean,
        default:false
    } 
})



module.exports = mongoose.model('Task', TaskSchema);