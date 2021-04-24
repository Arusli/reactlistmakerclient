import React from 'react';
import Input from './Input';
// import Login from './Login';
// import Logout from './Logout';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

//an advanced version of this app could take a google sign in
//and save/remember individuals lists in the database.

// https://developers.google.com/identity/sign-in/web/sign-in
// https://developers.google.com/identity/sign-in/web/backend-auth

//NPM VERSION: https://www.youtube.com/watch?v=-OgU5EAcQmo
//https://anthonyjgrove.github.io/react-google-login/?path=/info/google-logout-button--default-button
//https://www.npmjs.com/package/react-google-login
//https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del



//O AUTH
// CLIENT ID 610908639248-t99nq5ooodvi7r5qm834b2u2ruuh7hus.apps.googleusercontent.com

const App = () => {


    const responseGoogle = (response) => {
        console.log(response);
        console.log("gapi.auth2.getAuthInstance().isSignedIn.get() =", window.gapi.auth2.getAuthInstance().isSignedIn.get())
    }
    
    const logout = () => {
        console.log('Logged Out.');
        console.log("gapi.auth2.getAuthInstance().isSignedIn.get() =", window.gapi.auth2.getAuthInstance().isSignedIn.get())
    }


    return (
        <div style={{backgroundColor: 'beige', height: '98vh', margin: '20px', padding: '0px', display: 'flex', justifyContent: 'center', alignItems: 'start'}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50vw'}}>
                <h1 style={{marginBottom: '0px', marginTop: '5rem'}}>Listmaker</h1>
                <h5 style={{marginTop: '0px'}}>Built with react/node/sql.</h5>
                <Input />
                <GoogleLogin
                clientId="610908639248-t99nq5ooodvi7r5qm834b2u2ruuh7hus.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
                <GoogleLogout
                clientId="610908639248-t99nq5ooodvi7r5qm834b2u2ruuh7hus.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout>
            </div>
        </div>
    );
        
}

export default App;