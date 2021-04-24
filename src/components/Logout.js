import React from 'react';
import { GoogleLogout } from 'react-google-login';

const Logout = () => {

    const logout = () => {
        console.log('Logged Out.');
    }

    return (
        <div>
            <GoogleLogout
                clientId="610908639248-t99nq5ooodvi7r5qm834b2u2ruuh7hus.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout>
        </div>
    );    
}

export default Logout;

