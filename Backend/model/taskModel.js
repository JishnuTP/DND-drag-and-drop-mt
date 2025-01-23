const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: { type: String, enum: ['Pending', 'Completed', 'Done'], default: 'Pending' },
  });
  
  const Task = mongoose.model('Task', taskSchema);

  module.exports = Task;