import React, { useState } from 'react';
import Login from './components/Login.js';
import Main from './components/Main.js';
import './App.css';

function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLoginSuccess = (user) => {
        setLoggedInUser(user);
    };

    return (
        <div className="App">
            {loggedInUser ? (
                <div>
                    <h1>Welcome, {loggedInUser.username}</h1>
                    <p>You are logged in as {loggedInUser.role}.</p>
                    <Main />
                </div>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;
