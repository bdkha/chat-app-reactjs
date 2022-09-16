import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faVideo,
    faPhone,
    faEllipsisVertical,
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "./chatbody.css";
import Avatar from "../avatar/avatar";
import MessageSendInput from "../messageSendInput/messageSendInput";
import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
    useCollectionData,
    useDocumentData,
} from "react-firebase-hooks/firestore";
import { getOtherUser } from "../../common/common";
import Message from "../message/message";


const ChatBody = ({ curUser }) => {
    

    const endMessage = React.useRef(); 
    const { contactID } = useParams(); 
    console.log(contactID);
    
    const ScrollToBottom = () => {
        endMessage.current.scrollIntoView({ behavior: "smooth" });
    };

    
    const messagesQuery = query(
        collection(db, `chats/${contactID}/messages`),
        orderBy("timestamp", "asc")
    );

    
    const [messages] = useCollectionData(messagesQuery);

    
    const [memberChat] = useDocumentData(doc(db, "chats", contactID));

    const otherUserEmail = getOtherUser(memberChat?.users, curUser);
    console.log(otherUserEmail);

    const q = query(
        collection(db, "users"),
        where("email", "==", otherUserEmail ? otherUserEmail : "")
    );

    const [otherUser] = useCollectionData(q);
    console.log(otherUserEmail, otherUser);

    
    useEffect(() => {
        ScrollToBottom();
    }, [messages]);

    if (contactID == undefined || contactID == null) {
        return <div>Bắt đầu gửi tin nhắn cho nhau</div>;
    }

    return (
        <div className="chat-body-container">
            <div className="chat-header">
                <div className="chat-header-left">
                    <Avatar
                        width="40px"
                        avtSrc={otherUser ? otherUser[0]?.photoURL : undefined}
                    />
                    <div className="opposite-details">
                        <div className="opposite-name">
                            {otherUser ? otherUser[0]?.displayName : ""}
                        </div>
                        <div className="opposite-status"></div>
                    </div>
                </div>
                <div className="chat-header-right">
                    <div className="chat-header-right-icon-container">
                        <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className="icon-header-right"
                        />
                    </div>
                    <div className="chat-header-right-icon-container">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="icon-header-right"
                        />
                    </div>
                    <div className="chat-header-right-icon-container">
                        <FontAwesomeIcon
                            icon={faPhone}
                            className="icon-header-right"
                        />
                    </div>
                    <div className="chat-header-right-icon-container">
                        <FontAwesomeIcon
                            icon={faVideo}
                            className="icon-header-right"
                        />
                    </div>
                </div>
            </div>
            <div className="chat-content" id="chat-content">
                {messages
                    ?.filter((message) => message.text != "")
                    .map((message) => (
                        <Message
                            message={message}
                            typeOfMessage={
                                message.sender == curUser.email ? 0 : 1
                            }
                        />
                    ))}
                <div ref={endMessage}></div>
            </div>
            <MessageSendInput curUser={curUser} contactID={contactID} />
        </div>
    );
};

export default ChatBody;
