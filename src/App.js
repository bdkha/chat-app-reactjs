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
        console.log(listUser);
        listUser?.filter((u) => {
            if (u.email == user.email) {
                console.log("user exist");
                exist = true;
            }
        });
        console.log(exist);
        return exist;
    };

    const addNewUser = async () => {
        console.log("add new user");
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
            <Sidebar />
            <Routes>
                <Route
                    path="/message/:contactID"
                    element={<ChatBody curUser={user} />}
                />
            </Routes>
        </div>
    );
}

export default App;
