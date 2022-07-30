import React from "react";
import "./message.css";

//message component
const Message = ({ message, typeOfMessage }) => {
    //format time
    const messageTime =
        message.timestamp == null || message.timestamp == undefined
            ? ""
            : `${new Date(message.timestamp.seconds * 1000).getHours()}:
                ${new Date(message.timestamp.seconds * 1000).getMinutes()}`;
    return (
        <div
            className={`personal-message ${
                typeOfMessage == 0 ? "chat-send" : "chat-receive" //typeOfMessage = 0: message send by user, typeOfMessage = 1: message receive from other user
            }`}
        >
            {message.text}
            <div className="message-time">{messageTime}</div>
        </div>
    );
};

export default Message;
