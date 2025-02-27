import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from 'https://localhost/api';
import AuthContext from './AuthContext.js';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = React.useContext(AuthContext);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { username, password });
      login(response.data); // Use the login function from AuthContext
      history.push('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
