import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { selectSearchText, setSearchText } from "../../redux/searchTextSlices";
import { auth, db } from "../../firebase/firebase";
import "./sidebarSearch.css";

const SidebarSearch = ({ contactsData }) => {
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const searchText = useSelector(selectSearchText);

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            addNewContact();
        }
    };

    const isExitsChat = () => {
        return contactsData?.find(
            (contact) =>
                contact.user.includes(user.email) &&
                contact.user.includes(searchText)
        );
    };

    const addNewContact = async () => {
        if (!isExitsChat() && searchText != user.email) {
            await addDoc(collection(db, "chats"), {
                users: [user.email, searchText],
            });
        }

        dispatch(setSearchText(""));
    };
    return (
        <div className="sidebar-search-container">
            <div className="search-input-container">
                <div>
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="icon-search"
                    />
                </div>
                <input
                    type="text"
                    name=""
                    id="search-input"
                    placeholder="Tìm kiếm hoặc thêm cuộc trò chuyện mới"
                    onChange={(e) => dispatch(setSearchText(e.target.value))}
                    onKeyPress={(e) => onKeyPress(e)}
                    value={searchText}
                    autoComplete="off"
                />
            </div>
            <div className="filter-container" onClick={() => addNewContact()}>
                <span class="material-symbols-outlined">filter_list</span>
            </div>
        </div>
    );
};

export default SidebarSearch;
