const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Store active sessions
const sessions = new Map();
// Store users in each session
const sessionUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join or create session
  socket.on('join-session', ({ sessionId, username }) => {
    const id = sessionId || uuidv4();
    
    socket.join(id);
    socket.sessionId = id;
    socket.username = username || `User-${socket.id.slice(0, 4)}`;

    // Initialize session if new
    if (!sessions.has(id)) {
      sessions.set(id, {
        code: '// Start coding...',
        language: 'javascript',
        createdAt: new Date()
      });
      sessionUsers.set(id, new Set());
    }

    // Add user to session
    sessionUsers.get(id).add({
      id: socket.id,
      username: socket.username
    });

    // Send current state to new user
    socket.emit('session-joined', {
      sessionId: id,
      code: sessions.get(id).code,
      language: sessions.get(id).language,
      users: Array.from(sessionUsers.get(id))
    });

    // Notify others
    socket.to(id).emit('user-joined', {
      userId: socket.id,
      username: socket.username,
      users: Array.from(sessionUsers.get(id))
    });
  });

  // Handle code changes
  socket.on('code-change', ({ sessionId, code }) => {
    if (sessions.has(sessionId)) {
      sessions.get(sessionId).code = code;
      socket.to(sessionId).emit('code-update', { code, userId: socket.id });
    }
  });

  // Handle cursor position
  socket.on('cursor-move', ({ sessionId, position }) => {
    socket.to(sessionId).emit('cursor-update', {
      userId: socket.id,
      username: socket.username,
      position
    });
  });

  // Handle language change
  socket.on('language-change', ({ sessionId, language }) => {
    if (sessions.has(sessionId)) {
      sessions.get(sessionId).language = language;
      socket.to(sessionId).emit('language-update', { language });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    if (socket.sessionId && sessionUsers.has(socket.sessionId)) {
      const users = sessionUsers.get(socket.sessionId);
      users.forEach(user => {
        if (user.id === socket.id) {
          users.delete(user);
        }
      });

      // Notify others
      socket.to(socket.sessionId).emit('user-left', {
        userId: socket.id,
        username: socket.username,
        users: Array.from(users)
      });

      // Clean up empty sessions
      if (users.size === 0) {
        sessions.delete(socket.sessionId);
        sessionUsers.delete(socket.sessionId);
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
