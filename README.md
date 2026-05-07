# Real-Time Collaborative Code Editor 💻⚡

> Google Docs for code - Real-time collaborative editing with WebSockets, Monaco Editor, multi-language support, and AI-powered suggestions

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://react.dev/)
[![Java 17 + Spring Boot](https://img.shields.io/badge/Java 17 + Spring Boot-18+-green.svg)](https://nodejs.org/)
[![Java 17 + SprSpring WebSocket + STOMPing Boot](https://img.shields.io/badge/Java 17 + SprSpring WebSocket + STOMPing Boot-4.6.1-black.svg)](https://Java 17 + SprSpring WebSocket + STOMPing Boot/)
[![Monaco Editor](https://img.shields.io/badge/Monaco%20Editor-Latest-blue.svg)](https://microsoft.github.io/monaco-editor/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue.svg)](https://www.docker.com/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)

## ✨ Features

### Core Features
- ⚡ **Real-Time Collaboration**: Multiple users can edit code simultaneously
- 🎨 **Monaco Editor**: VS Code-powered editor with IntelliSense
- 🌐 **Multi-Language Support**: JavaScript, Python, Java, C++, HTML, CSS
- 🔗 **Session Sharing**: Generate unique session links to share with team
- 👥 **Active Users Display**: See who's coding with you in real-time
- 🎯 **Cursor Tracking**: Watch collaborators' cursors move in real-time
- 🔄 **Auto-Sync**: Changes sync instantly across all connected clients

### Technical Features
- 🚀 **WebSocket Communication**: Low-latency real-time updates via Java 17 + SprSpring WebSocket + STOMPing Boot
- 📦 **Session Management**: In-memory session storage with automatic cleanup
- 🎭 **Syntax Highlighting**: Language-specific highlighting and formatting
- 🔒 **Isolated Sessions**: Each session maintains independent state
- 🐳 **Docker Support**: One-command deployment with Docker Compose

## 🛠 Tech Stack

### Frontend
- **React 18.2** - UI framework
- **Monaco Editor** - Code editor component (powers VS Code)
- **Java 17 + SprSpring WebSocket + STOMPing Boot Client** - WebSocket client
- **React Router** - Navigation and routing
- **CSS3** - Styling

### Backend
- **Java 17 + Spring Boot 18+** - JavaScript runtime
- **Express.js** - Web application framework
- **Java 17 + SprSpring WebSocket + STOMPing Boot** - Real-time bidirectional communication
- **UUID** - Session ID generation
- **CORS** - Cross-origin resource sharing

### DevOps
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy (production)

## 🏗 Architecture

\`\`\`
┌─────────────┐
│  Client 1   │───┐
└─────────────┘   │
                  │     WebSocket
┌─────────────┐   │    (Java 17 + SprSpring WebSocket + STOMPing Boot)
│  Client 2   │───┼──────────────┐
└─────────────┘   │              │
                  │         ┌────▼────┐
┌─────────────┐   │         │         │
│  Client N   │───┘         │  Server │
└─────────────┘             │ (Java 17 + Spring Boot│
                            │ Express)│
                            └────┬────┘
                                 │
                          ┌──────▼──────┐
                          │   Session   │
                          │   Storage   │
                          │  (In-Memory)│
                          └─────────────┘
\`\`\`

### WebSocket Events

**Client → Server:**
- \`join-session\` - Join/create a coding session
- \`code-change\` - Broadcast code edits
- \`cursor-move\` - Update cursor position
- \`language-change\` - Switch programming language

**Server → Client:**
- \`session-joined\` - Session connection confirmed
- \`code-update\` - Receive code changes from others
- \`cursor-update\` - Other users' cursor positions
- \`language-update\` - Language change notification
- \`user-joined\` / \`user-left\` - User presence updates

## 🚀 Installation

### Prerequisites
- Java 17 + Spring Boot 18+ and npm
- Docker and Docker Compose (for containerized setup)

### Option 1: Docker Compose (Recommended)

\`\`\`bash
# Clone the repository
git clone https://github.com/kratikachaudhary298/realtime-code-editor.git
cd realtime-code-editor

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
\`\`\`

### Option 2: Local Development

#### Backend Setup
\`\`\`bash
cd server
npm install
npm start
# Server runs on http://localhost:5000
\`\`\`

#### Frontend Setup
\`\`\`bash
cd client
npm install
npm start
# Client runs on http://localhost:3000
\`\`\`

## 📖 Usage

### Creating a New Session

1. Open http://localhost:3000
2. Enter your name
3. Click "Create New Session"
4. Share the generated link with collaborators

### Joining an Existing Session

1. Click the shared session link (e.g., http://localhost:3000/session/abc-123)
2. Enter your name
3. Start coding collaboratively!

### Features Guide

**Changing Programming Language:**
- Use the dropdown in the header to switch languages
- Changes sync across all users

**Sharing Session:**
- Click "Share Link" button to copy session URL
- Share with team members for instant collaboration

**Viewing Active Users:**
- See all connected users in the header
- User badges show who's currently coding

## 📚 API Documentation

### WebSocket API

#### Join Session
\`\`\`javascript
socket.emit('join-session', {
  sessionId: 'optional-session-id',
  username: 'YourName'
});
\`\`\`

#### Send Code Changes
\`\`\`javascript
socket.emit('code-change', {
  sessionId: 'session-id',
  code: 'console.log(\"Hello\");'
});
\`\`\`

#### Change Language
\`\`\`javascript
socket.emit('language-change', {
  sessionId: 'session-id',
  language: 'python'
});
\`\`\`

## 📁 Project Structure

\`\`\`
realtime-code-editor/
├── server/
│   ├── server.js              # Java 17 + SprSpring WebSocket + STOMPing Boot server & session management
│   ├── package.json           # Backend dependencies
│   └── Dockerfile             # Backend containerization
├── client/
│   ├── src/
│   │   ├── App.js             # Main React component with Monaco Editor
│   │   ├── App.css            # Styling
│   │   └── index.js           # React entry point with routing
│   ├── package.json           # Frontend dependencies
│   └── Dockerfile             # Frontend containerization
├── docker-compose.yml         # Multi-container orchestration
└── README.md
\`\`\`

## 🎯 Use Cases

- **Pair Programming**: Real-time code review and collaboration
- **Coding Interviews**: Conduct remote technical interviews
- **Teaching**: Instructor demonstrates code to students live
- **Code Sharing**: Quick code snippets sharing with team
- **Remote Teams**: Distributed teams working on code together

## 🚧 Future Enhancements

- [ ] AI code suggestions (OpenAI/GitHub Copilot integration)
- [ ] Code execution environment
- [ ] File upload and project structure support
- [ ] Video/audio chat integration
- [ ] Persistent session storage (Redis/MongoDB)
- [ ] User authentication
- [ ] Code version history
- [ ] Collaborative debugging
- [ ] Syntax error highlighting

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👩‍💻 Author

**Kratika Chaudhary**
- GitHub: [@kratikachaudhary298](https://github.com/kratikachaudhary298)
- Portfolio Project #2

## 🙏 Acknowledgments

- Monaco Editor by Microsoft
- Java 17 + SprSpring WebSocket + STOMPing Boot for real-time communication
- React community for excellent tools
- Docker for simplified deployment

---

⭐ **If this project helps you, please give it a star!**

Built with ❤️ for remote developers and pair programmers worldwide.
