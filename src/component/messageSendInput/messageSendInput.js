import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faFaceGrin } from "@fortawesome/free-regular-svg-icons";
import { faMicrophone, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import {
    addDoc,
    collection,
    doc,
    FieldValue,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./messageSendInput.css";
const MessageSendInput = ({ curUser, contactID }) => {
    const [value, setValue] = React.useState("");

    const sendMessage = async () => {
        let tempValue = value; //lưu lại giá trị value

        setValue(""); //set value = "" để tránh lỗi khi gửi tin nhắn nhanh

        //thêm tin nhắn vào db
        if (value.trim() !== "") {
            let tempM = {
                sender: curUser.email,
                text: tempValue,
                timestamp: serverTimestamp(),
            };
            let tempU = {
                lastTime: serverTimestamp(),
                lastMessage: tempValue,
            };

            await addDoc(collection(db, `chats/${contactID}/messages`), tempM);
            await updateDoc(doc(db, `chats/${contactID}`), tempU);
        }
    };

    //gửi tin nhắn khi nhấn enter
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="message-send-input-container">
            <div className="message-send-icon-left">
                <div className="m-r-8 send-toolbar-icon">
                    <FontAwesomeIcon icon={faFaceGrin} className="wh-26" />
                </div>
                <div className="p-8 send-toolbar-icon">
                    <FontAwesomeIcon icon={faPaperclip} className="wh-24" />
                </div>
            </div>
            <div className="message-send-input">
                <input
                    type="text"
                    id="message-input"
                    placeholder=" Nhập tin nhắn"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e)}
                    autoComplete="off"
                />
            </div>
            <div className="message-send-icon-right">
                <div className="p-5-10 send-toolbar-icon">
                    {value.length == "" ? (
                        <FontAwesomeIcon
                            icon={faMicrophone}
                            className="wh-24"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="wh-24"
                            onClick={() => sendMessage()}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageSendInput;
