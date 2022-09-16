import React from "react";
import "./message.css";


const Message = ({ message, typeOfMessage }) => {
    
    const messageTime =
        message.timestamp == null || message.timestamp == undefined
            ? ""
            : `${new Date(message.timestamp.seconds * 1000).getHours()}:
                ${new Date(message.timestamp.seconds * 1000).getMinutes()}`;
    return (
        <div
            className={`personal-message ${
                typeOfMessage == 0 ? "chat-send" : "chat-receive" 
            }`}
        >
            {message.text}
            <div className="message-time">{messageTime}</div>
        </div>
    );
};

export default Message;
