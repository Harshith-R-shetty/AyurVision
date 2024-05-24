import React from 'react';

const ChatBot = () => {
  return (
    <div style={{ width: '98vw', height: '100vh', margin: 0 }}>
      <iframe
        src="http://localhost:8000"
        width="100%"
        height="94%"
        style={{ border: 'none' }}
        title="chat box"
      ></iframe>
    </div>
  );
};

export default ChatBot;
