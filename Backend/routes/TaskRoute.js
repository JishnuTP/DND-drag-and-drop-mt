const express= require("express")
const router= express.Router();
const TaskController=require("../controllers/TaskController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/tasks",TaskController.addtask);
router.get("/tasks",TaskController.gettask);
router.put("/tasks/:id",TaskController.updateTask);
router.delete("/tasks/:id",TaskController.deleteTask);
router.put("/taskedit/:id",TaskController.edit);

router.post("/feeds",authMiddleware,TaskController.addfeed);
router.get("/feeds",TaskController.getfeed);

module.exports= router; 