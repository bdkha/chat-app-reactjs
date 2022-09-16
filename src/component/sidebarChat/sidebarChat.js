import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarChatCard from "../sidebarChatCard/sidebarChatCard";
import "./sidebarChat.css";


const SidebarChat = ({ contactsData, curUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (contactsData == undefined || contactsData.length == 0) {
            navigate("/home");
        } else {
            navigate(`/message/${contactsData[0]?.id}`);
        }
    }, [contactsData]);

    return (
        <div className="chat-container">
            {contactsData?.map((contact) => {
                return (
                    <SidebarChatCard
                        key={contact.id}
                        contact={contact}
                        curUser={curUser}
                    />
                ); 
            })}
        </div>
    );
};

export default SidebarChat;
