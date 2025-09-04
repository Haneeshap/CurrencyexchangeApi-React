import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    // Simulate login logic
    console.log('Logging in with:', { username, password });

    // You can replace this with actual API call later
    //alert(`Welcome, ${username}!`);
    onLoginSuccess();
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

// Simple inline styles
const styles = {
  container: {
    maxWidth: '300px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #0c3ba8ff',
    borderRadius: '8px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#c32206ff',
    color: '#4f0256ff',
    border: 'none',
    borderRadius: '4px'
  }
};
export default Login;