import React, {useRef} from 'react';
import { GoogleLogin } from 'react-google-login';




//console code to check if user is signed in: gapi.auth2.getAuthInstance().isSignedIn.get()

const Login = (
    {   isLoggedIn, 
        setIsLoggedIn, 
        userId, 
        setUserId, 
        setUserIdRef,
        userName,
        setUserName
    }) => {
    console.log('Login Component Renders');
    const clientId = "610908639248-t99nq5ooodvi7r5qm834b2u2ruuh7hus.apps.googleusercontent.com"

    const userIdRef = useRef('0');
    userIdRef.current = userId;

    const responseGoogle = (response) => {

        //Handles error in case logged out user closes pop up...
        if (response.error && userId === '0') {
            setIsLoggedIn(false);
            setUserId('0');
            return;
        }

        //Handles error in the case that logged in user closes pop up...
        if (response.error && userId !== '0') {
            return;
        }

        //Normal Situtation
        console.log(response);
        console.log("gapi.auth2.getAuthInstance().isSignedIn.get() =", window.gapi.auth2.getAuthInstance().isSignedIn.get());
        setIsLoggedIn(true);
        setUserId(response.googleId);
        setUserName(response.profileObj.givenName);
        console.log('user id: ', userId); //stale state problem here
        console.log('user id ref: ', userIdRef.current) //this is still doing the stale state problem...
        //after this logs in we need to make the Get Request and populate hte screen.
        
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Log In"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}


export default Login;