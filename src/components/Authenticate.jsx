import { useState } from 'react';

export default function Authenticate({ token }) {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);

    async function handleClick() {
        try{
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', 
            { 
              method: "GET", 
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
              }
            });
            const result = await response.json();
            setMessage(result.message);
            setUsername(result.data.username);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
    <>
        <h2>Authenticate!</h2>
        <button onClick={handleClick}>Authenticate</button>
        {message && <p>✅ User "{username}" {message}</p>}
        {error && <p>❌ {error}</p>}
    </>
    );
}