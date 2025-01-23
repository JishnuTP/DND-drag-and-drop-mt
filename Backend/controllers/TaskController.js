const Feed = require("../model/Feedmodel");
const Task = require("../model/taskModel");
const User = require("../model/UserModel");

const addtask = async (req, res) => {
    const { name, description } = req.body;
    const newTask = new Task({ name, description });
    await newTask.save();
    res.status(201).json(newTask);
  }
  

const gettask =async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  }
  

  const updateTask =  async (req, res) => {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json(task);
  }



  const deleteTask =  async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  }
  


const edit= async (req, res) => {
  const taskId = req.params.id;
  const { name, description, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { name, description, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }

}



const addfeed = async (req, res) => {
  const { imageUrl, caption } = req.body;
  const userId = req.user._id;
  console.log(req.user._id);

  try {
    if (!imageUrl || !caption || !userId) {
      return res.status(400).json({ message: 'Missing required fields: imageUrl, caption, and userId' });
    }

 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

 
    const userName = user.name;

    // Create a new feed with user name
    const newFeed = new Feed({ imageUrl, caption, userId, userName });
    await newFeed.save();
    res.status(200).json(newFeed);
  } catch (error) {
    console.error('Error saving feed:', error);
    res.status(500).json({ message: 'Error saving feed' });
  }
};

const getfeed = async (req, res) => {
  try {
    const feeds = await Feed.find()
      .populate({
        path: 'userId',
        select: 'name', 
      })
      .sort({ createdAt: -1 }); 


    res.status(200).json(feeds);
  } catch (error) {
    console.error('Error fetching feeds:', error);
    res.status(500).json({ message: 'Error fetching feeds' });
  }
};

module.exports={
    addtask,gettask,
    edit,
    updateTask,deleteTask,
    addfeed,
    getfeed

}