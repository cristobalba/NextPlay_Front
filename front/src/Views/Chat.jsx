import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import './Chat.css';

function Chat() {
  const location = useLocation();
  const { recommendations } = location.state;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, id: messages.length }]);
      setMessage('');
    }
  };

  if (recommendations.length === 0) {
    return <div><h2>Cargando ...</h2></div>;
  }

  return (
    <div className="chat-container">
      <div className="recommendations-container">
        {recommendations ? (
          recommendations.map((recommendation, index) => (
            <div
              key={recommendation.id}
              className={`recommendation-card color-${index + 1}`}
            >
              <h3>{recommendation.gameTitle}</h3>
              <p>{recommendation.gameDescription}</p>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>


      <div className="chat-bar">
        <textarea
          className="chat-input"
          value={message}
          onChange={handleMessageChange}
          placeholder="Escribe un mensaje..."
        />
        <button className="send-button" onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
