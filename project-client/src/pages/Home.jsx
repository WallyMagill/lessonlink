import React, { useEffect, useState } from 'react';
import fetchHelloWorld from '../services/api';

function Home() {
  const [msg, setMsg] = useState('');

  // we only want to grab the message once
  useEffect(() => {
    const getMessage = async () => {
      try {
        const message = await fetchHelloWorld();
        setMsg(message);
      } catch (error) {
        console.error(`Failed to fetch message: ${error}`);
      }
    };
    getMessage();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to LessonLink</h1>
        <p className="text-gray-600">Your platform for connecting students with tutors!</p>
        <p className="server-message">An incoming message from the server is: {msg}</p>
      </div>
    </div>
  );
}

export default Home;
