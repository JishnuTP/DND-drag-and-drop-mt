cd backend

expressjs, node js, mongodb


task 
router.post("/tasks",addtask);




router.get("/tasks".gettask);





router.put("/tasks/:id".updateTask);




router.delete("/tasks/:id".deleteTask);



router.put("/taskedit/:id".edit);

feeds route/

router.post("/feeds",authMiddleware,TaskController.addfeed);




router.get("/feeds",TaskController.getfeed);
