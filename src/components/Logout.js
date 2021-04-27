import React from 'react';
import { GoogleLogout } from 'react-google-login';

const Logout = (
    {   isLoggedIn, 
        setIsLoggedIn, 
        userId, 
        setUserId, 
        userName, 
        setUserName
    }) => {
    console.log('Logout Component Renders');
    const clientId = "610908639248-t99nq5ooodvi7r5qm834b2u2ruuh7hus.apps.googleusercontent.com"

    const logout = async () => {
        console.log('Logged Out.');
        console.log("gapi.auth2.getAuthInstance().isSignedIn.get() =", window.gapi.auth2.getAuthInstance().isSignedIn.get())
        await setIsLoggedIn(false);
        await setUserId('0');
        setUserName('');
        console.log('user id: ', userId); //this is still doing the stale state problem...
        //needs to make another get request that repopulates the screen...
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Log Out"
                onLogoutSuccess={logout}
            />
        </div>
    );    
}

export default Logout;

