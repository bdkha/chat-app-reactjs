import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase/firebase";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Sidebar from "./component/sidebar/sidebar";
import ChatBody from "./component/chatbody/chatbody";
import Login from "./component/login/login";
import DefaultChat from "./component/defaultChat/defaultChat";

function App() {
    const [user, loading, err] = useAuthState(auth);
    const [listUser] = useCollectionData(collection(db, "users"));

    useEffect(() => {
        if (user && listUser && checkExistUser() == false) {
            addNewUser();
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const checkExistUser = () => {
        let exist = false;

        listUser?.filter((u) => {
            if (u.email == user.email) {
                exist = true;
            }
        });

        return exist;
    };

    const addNewUser = async () => {
        let newUser = {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            contact: [],
            id: user.uid,
        };

        await addDoc(collection(db, "users"), newUser);
    };

    if (!user) {
        return <Login />;
    }

    return (
        <div className="app">
            <Sidebar curUser={user} />
            <Routes>
                <Route path="/home" element={<DefaultChat />} />
                <Route
                    path="/message/:contactID"
                    element={<ChatBody curUser={user} />}
                />
            </Routes>
        </div>
    );
}

export default App;
