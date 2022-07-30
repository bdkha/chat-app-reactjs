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
        where("users", "array-contains", [curUser.email, user.email])
    );

    //response trả về
    const [response] = useCollection(q);

    const responseData = response?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    console.log(responseData);

    //check xem đã có chat với user này chưa
    const checkFriend = () => {
        if (responseData.length > 0) {
            console.log("da co chat");
            return true;
        }
        console.log("chua co chat");
        return false;
    };

    //tạo chat mới
    const addNewChat = async () => {
        console.log("add new chat");
        let newChat = {
            users: [curUser.email, user.email],
            lastMessage: "",
            lastTime: serverTimestamp(),
        };
        //add new chat
        const docRef = await addDoc(collection(db, "chats"), newChat);

        //add content chat
        await addDoc(collection(db, `chats/${docRef.id}/messages`), {
            text: "",
            sender: "",
            timestamp: serverTimestamp(),
        });
        navigate(`/message/${docRef.id}`);
    };

    //xử lý khi click vào user
    const handleClick = async () => {
        console.log(checkFriend());
        if (checkFriend()) {
            await updateDoc(db, `chats/${responseData[0]?.id}`, {
                lastTime: serverTimestamp(),
            });
            navigate(`/message/${response[0]?.id}`);
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
