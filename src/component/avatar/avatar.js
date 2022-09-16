import React from "react";
import "./avatar.css";


const Avatar = ({ width, avtSrc }) => {
    return (
        <div
            className="avatar-container"
            style={{ width: width, height: width }}
        >
            <img
                src={
                    avtSrc
                        ? avtSrc
                        : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
                }
            />
        </div>
    );
};

export default Avatar;
