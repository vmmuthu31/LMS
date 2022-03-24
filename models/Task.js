const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  task:{
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('tasks', taskSchema);
