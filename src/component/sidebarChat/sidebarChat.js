import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import SidebarChatCard from "../sidebarChatCard/sidebarChatCard";
import "./sidebarChat.css";

//sidebar chat component
const SidebarChat = ({ contactsData }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        contactsData && navigate(`/message/${contactsData[0].id}`);
    }, [contactsData]);
    return (
        <div className="chat-container">
            {contactsData
                ?.filter((contact) => contact.users.includes(user.email)) // filter những contact có liên lạc với người dùng
                .map((contact) => {
                    return (
                        <SidebarChatCard
                            key={contact.id}
                            contact={contact}
                            curUser={user}
                        />
                    ); // render ra các contact
                })}
        </div>
    );
};

export default SidebarChat;
