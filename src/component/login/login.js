import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./login.css";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";


const Login = () => {
    const [signInWithGoogle, user, loading, err] = useSignInWithGoogle(auth);
    return (
        <div className="login-screen">
            <FontAwesomeIcon icon={faWhatsapp} className="app-logo" />
            <div className="login-button" onClick={() => signInWithGoogle()}>
                <img
                    className="login-logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                />
                Sign in with Google
            </div>
        </div>
    );
};

export default Login;
