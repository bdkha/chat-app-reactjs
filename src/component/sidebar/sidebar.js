import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { useSelector } from "react-redux/es/exports";
import { auth, db } from "../../firebase/firebase";
import SidebarChat from "../sidebarChat/sidebarChat";
import SidebarHeader from "../sidebarHeader/sidebarHeader";
import SidebarSearch from "../sidebarSearch/sidebarSearch";
import "./sidebar.css";
import SearchBody from "../searchContent/searchBody";


const Sidebar = ({ curUser }) => {
    const searchText = useSelector((state) => state.searchText.value);
    const [user] = useAuthState(auth);
    const [snapshot, loading, err] = useCollection(collection(db, "chats"));

    
    const contactsData = snapshot?.docs
        .filter((doc) => doc.data().users.includes(curUser.email))
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

    

    return (
        <div className="sidebar-container">
            <SidebarHeader userAvt={user.photoURL} />
            <SidebarSearch contactsData={contactsData} />

            {searchText == "" ? (
                <SidebarChat curUser={curUser} contactsData={contactsData} />
            ) : (
                <SearchBody curUser={user} />
            )}
        </div>
    );
};

export default Sidebar;
