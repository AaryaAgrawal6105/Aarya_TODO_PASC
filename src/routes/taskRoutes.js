const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const tasksController = require('../controllers/taskcontroller');


router.use(authMiddleware.validator);
router.post('/'  ,  tasksController.createTask);
router.get('/' ,tasksController.getTasks)
router.put('/:id' ,tasksController.updateTasks)
router.delete('/:id' ,tasksController.deleteTask)

module.exports = router