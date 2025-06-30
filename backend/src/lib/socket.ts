import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

const userSocketMap: Record<string, string> = {};

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId];
}

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  }

  socket.on('privateMessage', ({ userId, text }) => {
    const receiverSocketId = getReceiverSocketId(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('private message', {
        fromUserId: socket.handshake.query.userId,
        text,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);

    for (const [key, value] of Object.entries(userSocketMap)) {
      if (value == socket.id) {
        delete userSocketMap[key];
        break;
      }
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { io, app, server };
