import React from 'react';
import { GoogleLogin } from 'react-google-login';




//console code to check if user is signed in: gapi.auth2.getAuthInstance().isSignedIn.get()

const Login = () => {

    const responseGoogle = (response) => {
        console.log(response);
      }
    
    return (
        <div>
            <GoogleLogin
                clientId="610908639248-t99nq5ooodvi7r5qm834b2u2ruuh7hus.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}


export default Login;