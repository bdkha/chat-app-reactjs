import { collection, getDocs, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { db } from "../../firebase/firebase";
import { where } from "firebase/firestore";
import SearchBodyCard from "../searchBodyCard/searchBodyCard";
import "./searchBody.css";

const SearchBody = ({ curUser }) => {
    const searchText = useSelector((state) => state.searchText.value);

    const q = query(
        collection(db, "users"),
        where("email", ">=", searchText),
        where("email", "<=", searchText + "\uf8ff")
    );

    const [users] = useCollectionData(q);
    console.log(users);

    return (
        <div className="chat-container">
            {users
                ?.filter((u) => u.email != curUser.email)
                .map((u) => (
                    <SearchBodyCard user={u} curUser={curUser} />
                ))}
        </div>
    );
};

export default SearchBody;
