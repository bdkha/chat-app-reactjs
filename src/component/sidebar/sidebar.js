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

//sidebar component
const Sidebar = () => {
    const searchText = useSelector((state) => state.searchText.value);
    const [user] = useAuthState(auth);
    const [snapshot, loading, err] = useCollection(collection(db, "chats"));

    //contact đã từng chat and data
    const contactsData = snapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })); // dữ liệu các đoạn chat

    return (
        <div className="sidebar-container">
            <SidebarHeader userAvt={user.photoURL} />
            <SidebarSearch contactsData={contactsData} />

            {searchText == "" ? (
                <SidebarChat contactsData={contactsData} />
            ) : (
                <SearchBody curUser={user} />
            )}
        </div>
    );
};

export default Sidebar;