const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../config/dev.env')});

const userRouter = require('./routers/user');
const roomRouter = require('./routers/room');


const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(roomRouter);

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

const chats = require('./sockets/chats')(io);
const port = process.env.PORT || 3001;

app.use('/', express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
  console.log('Now listening on port 3001');
});
