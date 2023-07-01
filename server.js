const express = require('express');
const cors = require('cors');
const app = express();
const socket = require('socket.io');

app.use(cors());

let tasks = [];

app.use((req, res) => {
  res.status(404).send({message: 'Not found...'});
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id - ' + socket.id);

  socket.on('addTask', (taskData) => {
    tasks.push(taskData);
    console.log('new task added by user ' + socket.id);
    socket.broadcast.emit('updateData', tasks);
  });
  socket.on('removeTask', (taskId) => {
    console.log('Task ID to remove:', taskId);
    tasks = tasks.filter((task) => task.id !== taskId);
    socket.broadcast.emit('updateData', tasks);
  });
});