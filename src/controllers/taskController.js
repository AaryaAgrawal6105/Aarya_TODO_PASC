const prisma = require('../config/database');

const createTask = async (req,res) => {
    const {title,description}  = req.body;
    const userId = req.user.id;
    try {
        const task = await prisma.task.create({
            data : {
                title : title,
                userId : userId,
                description : description
            }
        })
        return res.status(201).json({ message: 'Task added',
            data : task,
            success :true,
            err : {}
        
        });
    } catch (error) {
        return res.status(500).json({
            message : "failed to add a task ! error from taskController",
            error : error,
            data : {},
            success : false
        })
    }
}

const deleteTask = async(req , res)=>{

    const {id} = req.params;
    const userId = req.user.id;
    try {

        const task = await prisma.task.findUnique({where : {
            id: id}
        })

        if(!task || task.userId !== userId){
            return res.status(404).json({
                message : 'task is not there in the database'
            })
        }

        await prisma.task.delete({
            where : {
                id : id
            }
        })
        return res.status(200).json({
            message :"Task deleted successfully",
            data : "Task gone ",
            err :{},
            success : true
        })
    } catch (error) {
        return res.status(400).json({
        message : "error occured during deleting the task",
        data : "not deleted",
        err : error,
        success:false
        })
    }
    
}


const getTasks = async(req,res)=>{


        try {
            const tasks = await prisma.task.findMany({where : {
                userId : req.user.id
            }})
            return res.status(200).json({
                message :"Task fetched successfully",
                data : tasks,
                err :{},
                success : true
            })

        } catch (error) {
            
            return res.status(400).json({
                message : "error occured during fetching the task",
                data : "not fetched",
                err : error,
                success:false
                })

        }
      

}

const updateTasks = async (req,res) => {
    

    try {
        const {id} = req.params;
        const userId = req.user.id;
        const {title , completed } = req.body
    
        const task = await prisma.task.findUnique({where : {
            id : id
        }})
        console.log(task);
        if(!task || task.userId !== userId){
            return res.status(400).json({
                message : "No task is present"
            })
        }
    
        const updateTask = await prisma.task.update({
            where  : {id},
            data:{
                title : title,
                completed : completed ?? false
            }
        })
        console.log(updateTask);
        return res.status(200).json({
            message :"Task updated successfully",
            data : updateTask,
            err :{},
            success : true
        })

    } 
    
 catch (error) {
    
    return res.status(400).json({
        message : "error occured during updating the task",
        data : "not updated",
        err : error,
        success:false
        })
}
}


module.exports = {

    createTask,
    deleteTask,
    getTasks,
    updateTasks

}