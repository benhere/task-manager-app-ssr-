const express = require('express');
const taskRoutes = require('./routes/tasks');
const dbConnect = require('./db/connectDB');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const ErrorHandlerMiddleware = require('./middleware/customErrorHandler');

const server = express();

// middleware setup
server.use(express.static('./public'));
server.use(express.json());

// home route setup
server.get('/hello', (req,res) => {
    res.send('Task Manager App');
})

// API route setup in middleware
server.use('/api/v1/tasks', taskRoutes);

server.use(notFound);
server.use(ErrorHandlerMiddleware);

// API routes setup example

// server.get('/api/v1/tasks')  - get all the tasks
// server.post('/api/v1/tasks') - create a new task
// server.get('/api/v1/tasks/:id') - get single task
// server.patch('/api/v1/tasks/:id') - update task
// server.delete('/api/v1/tasks/:id') - delete task

// const portNo = 5151;
const portNo = process.env.PORT || 5151

const start = async () => {
    try{
        await dbConnect(process.env.MONGO_URI)
        .then(() => console.log('DB Connected'))
        server.listen(portNo, () => {
            console.log(`Server running on port: ${portNo}...`);
        })        
    }catch(error){
        console.log(error);
    }
}

start();


