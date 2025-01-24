cd backend

expressjs, node js, mongodb


task 


router.post("/tasks",addtask);     ------------------     to add  task ( contain name, description)




router.get("/tasks".gettask);    ------------------     to get  task ( contain name, description)





router.put("/tasks/:id".updateTask);    ------------------     to update  task ( task id and status,)




router.delete("/tasks/:id".deleteTask);      ------------------     to delete  task ( contain task id)



router.put("/taskedit/:id".edit);      ------------------     to add  task ( contain name, description)



feeds route/

router.post("/feeds",authMiddleware,TaskController.addfeed);




router.get("/feeds",TaskController.getfeed);
