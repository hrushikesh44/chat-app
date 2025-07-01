import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'], // adjust if needed for production
    methods: ['GET', 'POST'],
  },
});

// Map to track connected users: userId -> socket.id
const userSocketMap: Record<string, string> = {};

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId];
}

io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId as string;

  console.log(' A user connected:', socket.id);
  console.log(' userId from socket.auth:', userId);
  console.log('userId from socket.query (fallback):', socket.handshake.query.userId);

  if (userId) {
    userSocketMap[userId] = socket.id;

    // Notify all clients about current online users
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // Optional: send welcome message to user who just connected
    socket.emit('private message', {
      fromUserId: 'server',
      text: `Welcome, user ${userId}`,
    });
  }

  // Handle private message
  socket.on('privateMessage', ({ userId: receiverId, text }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log(' Sending private message to:', receiverSocketId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('private message', {
        fromUserId: userId, // Sender
        text,
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(' A user disconnected:', socket.id);

    for (const [uid, sid] of Object.entries(userSocketMap)) {
      if (sid === socket.id) {
        delete userSocketMap[uid];
        break;
      }
    }

    // Update all clients with new online user list
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { io, app, server };
