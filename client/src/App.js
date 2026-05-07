import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';
import './App.css';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

function App() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState('// Start coding...');
  const [language, setLanguage] = useState('javascript');
  const [users, setUsers] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(sessionId || '');
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const socketInstance = io(SERVER_URL);
    setSocket(socketInstance);

    socketInstance.on('session-joined', ({ sessionId: id, code: sessionCode, language: lang, users: sessionUsers }) => {
      setCurrentSessionId(id);
      setCode(sessionCode);
      setLanguage(lang);
      setUsers(sessionUsers);
      setIsJoined(true);
      navigate(`/session/${id}`, { replace: true });
    });

    socketInstance.on('code-update', ({ code: newCode }) => {
      setCode(newCode);
    });

    socketInstance.on('language-update', ({ language: newLang }) => {
      setLanguage(newLang);
    });

    socketInstance.on('user-joined', ({ username: newUser, users: updatedUsers }) => {
      setUsers(updatedUsers);
    });

    socketInstance.on('user-left', ({ username: leftUser, users: updatedUsers }) => {
      setUsers(updatedUsers);
    });

    return () => socketInstance.disconnect();
  }, [navigate]);

  const joinSession = () => {
    if (socket && username) {
      socket.emit('join-session', { sessionId: currentSessionId, username });
    }
  };

  const createNewSession = () => {
    if (socket && username) {
      socket.emit('join-session', { username });
    }
  };

  const handleEditorChange = (value) => {
    setCode(value);
    if (socket && currentSessionId) {
      socket.emit('code-change', { sessionId: currentSessionId, code: value });
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if (socket && currentSessionId) {
      socket.emit('language-change', { sessionId: currentSessionId, language: newLang });
    }
  };

  const copySessionLink = () => {
    const link = `${window.location.origin}/session/${currentSessionId}`;
    navigator.clipboard.writeText(link);
    alert('Session link copied!');
  };

  if (!isJoined) {
    return (
      <div className="join-container">
        <h1>Real-Time Code Editor</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Session ID (optional)"
          value={currentSessionId}
          onChange={(e) => setCurrentSessionId(e.target.value)}
        />
        <button onClick={joinSession}>Join Session</button>
        <button onClick={createNewSession}>Create New Session</button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h2>Collaborative Code Editor</h2>
        <div className="controls">
          <select value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
          <button onClick={copySessionLink}>Share Link</button>
        </div>
        <div className="users">
          <span>Active Users ({users.length}):</span>
          {users.map((user, idx) => (
            <span key={idx} className="user-badge">{user.username}</span>
          ))}
        </div>
      </div>
      <Editor
        height="90vh"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
}

export default App;
