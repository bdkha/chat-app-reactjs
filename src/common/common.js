import { collection, query, where } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";

//return email của người đang chat
export const getOtherUser = (users, currentUser) => {
    return users?.filter((user) => user !== currentUser.email)[0];
};
