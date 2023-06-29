const express = require('express');
const app = express();
const socket = require('socket.io');

const tasks = [];

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id - ' + socket.id);

  socket.on('addTask', (taskData) => {
    tasks.push(taskData);
    console.log('new task added by user');
    socket.broadcast.emit('addTask', 'New task added');
  });
  socket.on('removeTask', (taskId) => {
    console.log('Task ID to remove:', taskId);
    tasks.filter((task) => task.id !== taskId);
    socket.broadcast.emit('removeTask', taskId);
  });
});

app.use((req, res) => {
  res.status(404).send({message: 'Not found...'});
});