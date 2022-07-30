import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faMessage,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../firebase/firebase.js";
import Avatar from "../avatar/avatar.js";
import "./sidebarHeader.css";
import { useNavigate } from "react-router-dom";

const SidebarHeader = ({ userAvt }) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const navigate = useNavigate();

    const logOut = () => {
        navigate("/");
        auth.signOut();
    };
    return (
        <div className="sidebar-header-container">
            <div className="sidebar-header-left">
                <Avatar width={"40px"} avtSrc={userAvt} />
            </div>
            <div className="sidebar-header-right">
                <div
                    className="icon-container"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="header-icon"
                    />
                    <div className="burger-menu" hidden={!showMenu}>
                        <div
                            className="burger-menu-item"
                            onClick={() => logOut()}
                        >
                            <div>Logout</div>
                            <FontAwesomeIcon
                                icon={faArrowRightFromBracket}
                                className="header-icon m-l-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="icon-container">
                    <span class="material-symbols-outlined header-icon">
                        chat
                    </span>
                </div>
                <div className="icon-container">
                    <span class="material-icons header-icon">donut_large</span>
                </div>
            </div>
        </div>
    );
};

export default SidebarHeader;
