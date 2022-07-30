import React from "react";
import { Link } from "react-router-dom";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/firebase";
import { getOtherUser } from "../../common/common";
import "./sidebarChatCard.css";
import Avatar from "../avatar/avatar";

const SidebarChatCard = ({ contact, curUser }) => {
    const positionEmail = getOtherUser(contact.users, curUser); //emil cua user khac

    const lastTime =
        contact.lastTime == null
            ? ""
            : `${new Date(contact.lastTime.seconds * 1000).getHours()}:
                        ${new Date(
                            contact.lastTime.seconds * 1000
                        ).getMinutes()}`; //thoi gian cuoi cung cua tin nhan
    const q = query(
        collection(db, "users"),
        where("email", "==", positionEmail)
    );
    const [response] = useCollectionData(q);

    if (!response) {
        return null;
    }

    return (
        <Link to={`/message/${contact.id}`} className="sidebar-chat-card">
            <div className="avatar-wrapper">
                <Avatar width="50px" avtSrc={response[0].photoURL} />
            </div>
            <div className="chat-content-container">
                <div className="top-text">
                    <div className="chat-content-name">
                        {response[0].displayName}
                    </div>
                    <div className="time-container">{lastTime}</div>
                </div>
                <div className="chat-content-message">
                    {contact.lastMessage}
                </div>
            </div>
        </Link>
    );
};

export default SidebarChatCard;
