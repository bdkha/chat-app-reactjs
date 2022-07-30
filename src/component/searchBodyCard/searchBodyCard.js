import {
    addDoc,
    collection,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import Avatar from "../avatar/avatar";
import "./searchBodyCard.css";

//user được tìm thấy
const SearchBodyCard = ({ user, curUser }) => {
    const navigate = useNavigate();

    //query lấy thông tin user
    const q = query(
        collection(db, "chats"),
        where("users", "array-contains-any", [curUser.email, user.email])
    );

    //response trả về
    const [response] = useCollection(q);

    //check xem đã có chat với user này chưa
    const checkFriend = () => {
        if (response?.docs.length > 0) {
            return true;
        }
        return false;
    };

    //tạo chat mới
    const addNewChat = async () => {
        const newChat = {
            users: [curUser.email, user.email],
            lastMessage: "",
            lastTime: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, "chats"), newChat);

        await addDoc(collection(db, "chats", docRef.id, "messages"), {
            text: "",
            sender: "",
            timestamp: serverTimestamp(),
        });
        navigate(`/message/${docRef.id}`);
    };

    //xử lý khi click vào user
    const handleClick = async () => {
        if (checkFriend) {
            await updateDoc(db, `chats/${response?.docs[0].id}`, {
                lastTime: serverTimestamp(),
            });
            navigate(`/message/${response?.docs[0].id}`);
        } else {
            addNewChat();
        }
    };

    return (
        <div className="search-body-card" onClick={() => handleClick()}>
            <div className="search-body-card__avt">
                <Avatar avtSrc={user.photoURL} />
            </div>
            <div className="search-body-card__content">
                <div className="search-body-card__content__name">
                    {user.displayName}
                </div>
                <div className="search-body-card__email">{user.email}</div>
            </div>
        </div>
    );
};

export default SearchBodyCard;
