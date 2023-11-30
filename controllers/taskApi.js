const Task = require('../models/taskModel');
const asynWrapper = require('../middleware/asyncWrapper');
const { createCustomError } = require('../errors/customErrorHandler');

// Get All tasks using find() method
const getAllTasks = async (req,res) => {
    try{
        const tasks = await Task.find({});
        res.status(200).json({tasks, count:tasks.length});
        // res.status(200).json({success:true, data:{tasks, count:tasks.length}});
        console.log('Fetched all tasks!!');
    }catch(error){
        res.status(400).json({msg:error});
    }
}

// Create new task using create() method
const createTask = async (req,res) => {
    try{
        //res.json(req.body);
        const task = await Task.create(req.body)
        res.status(201).json({task})
        console.log('task created!!!');
    }catch(error){
        res.status(400).json({msg:error});
        console.log('Error creating task!!');
    } 
}

// get single task by Id using findOne() method
const getTask = async (req,res) => {
    try{
        const { id: taskId } = req.params
        const task = await Task.findOne({ _id: taskId })
        
        if(!task){
            return res.status(404).json({ msg: `No task with id : ${taskId} found` })
        }
        res.status(200).json({ task });
        console.log('Get Task By Id');
    }catch(error){
        res.status(400).json({ msg:error })
        console.log('Error getting a task');
    }  
}

// update a task by Id using findOneAndUpdate() method
const updateTask = async (req,res) => {
    try{
        const { id: taskID } = req.params
        const upTask = await Task.findOneAndUpdate({ _id:taskID }, req.body, {
            new: true,
            runValidators: true,
        })
        
        if(!upTask){
            return res.status(404).json({ msg: `No task with id : ${taskID} found` })
        }
        res.status(200).json({upTask})
        console.log('Task updated successfully!!');
    }catch(error){
        res.status(400).json({ msg:error })
        console.log('Error updating a task');
    }
}

// delete a task by Id using findOneAndDelete() method
const deleteTask = async(req,res) => {
    try{
        const { id:taskID } = req.params
        const delTask = await Task.findOneAndDelete({_id:taskID});
        
        if(!delTask){
            return res.status(404).json({ msg: `No task with id : ${taskID} found` })
        }

        // res.status(200).json({task:null, status: 'success'});
        // res.status(200).send('Task deleted successfully')
        res.status(200).json({delTask})
        console.log('Task deleted successfully!!');
    }catch(error){
        res.status(400).json({ msg:error })
        console.log('Error deleting a task');
    }
}

/*
// replace task using put()
const editTask = async (req,res) => {
    try{
        const { id: taskID } = req.params
        const upTask = await Task.findOneAndUpdate({ _id:taskID }, req.body, {
            new: true,
            runValidators: true,
            overwrite: true,
        })
        
        if(!upTask){
            return res.status(404).json({ msg: `No task with id : ${taskID} found` })
        }
        res.status(200).json({upTask})
        console.log('Task updated successfully!!');
    }catch(error){
        res.status(400).json({ msg:error })
        console.log('Error updating a task');
    }
}
*/

// exports all APIs
module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}