const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = 5001;

//using middleware to parse json
app.use(express.json());

const cors = require("cors");
app.use(cors());


//Mongodb connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Mongodb connected"))
    .catch((error)=>console.error("Mongodb connectoion error : ",error));

//Database Schema and Model
const taskSchema = new mongoose.Schema({
    title:{type:String,required:true},
    completed:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now},
});

const Task = mongoose.model('Task',taskSchema)

//Adding routes 

//GET request - to get all tasks 
app.get('/tasks',async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
});

//POST request- add a new task
app.post('/tasks',async(req,res)=>{
    const task = new Task(req.body);
    try{
        const newTask = await task.save();
        res.status(201).json(newTask);
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
});

//PUT request - update a task
app.put('/tasks/:id', async(req, res) => {
    try{
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedTask){
            return res.status(404).json({message:'Task not found'});
        }
        res.json(updatedTask);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
});

//DELETE request - delete a task
app.delete('/tasks/:id',async(req,res)=>{
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask){
            res.status(404).json({message:'Task not found'});
        }
        res.json({message:'Task deleted successfully'})
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

//running the server
app.listen(PORT,()=>{
    console.log(`The server is running in the port ${PORT} - address is http://localhost:${PORT}`);
});

