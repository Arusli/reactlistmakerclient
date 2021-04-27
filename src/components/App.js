import React, {useState} from 'react';
import axios from 'axios';
import Input from './Input';
import Login from './Login';
import Logout from './Logout';


//MAIN PROBLEMS:
//Right now, there is no get request call triggered when I do a google login.
//which is why the list items, based on the list prop that is filled by a get request, do not update on the screen.
//Therefore, I either need Login to trigger a get request OR
//OR I need a get request to be called whenever user Id changes.

// https://developers.google.com/identity/sign-in/web/sign-in
// https://developers.google.com/identity/sign-in/web/backend-auth

//NPM VERSION: https://www.youtube.com/watch?v=-OgU5EAcQmo
//https://anthonyjgrove.github.io/react-google-login/?path=/info/google-logout-button--default-button
//https://www.npmjs.com/package/react-google-login
//https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del



//O AUTH
// CLIENT ID 610908639248-t99nq5ooodvi7r5qm834b2u2ruuh7hus.apps.googleusercontent.com

const App = () => {
    
    console.log('App Component Renders');

    // for use with google log in. pass down as props throughout the app.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('0');



    

    //NEED TO LOG IN HERE FIRST, USE EFFECT HERE FIRST, THEN PASS THAT INFORMATION DOWN TO THE LOGIN COMPONENT...

    return (
        <div style={{backgroundColor: 'beige', height: '98vh', margin: '20px', padding: '0px', display: 'flex', justifyContent: 'center', alignItems: 'start'}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50vw'}}>
           
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div style={{margin:'10px'}}>
                        <Login 
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            userId={userId}
                            setUserId={setUserId}
                        />
                    </div>
                    <div style={{margin:'10px'}}>
                        <Logout 
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            userId={userId}
                            setUserId={setUserId}
                        />
                    </div>
                </div>

                <h1 style={{marginBottom: '0px', marginTop: '5rem'}}>Listmaker</h1>
                <h5 style={{marginTop: '0px'}}>Built with react/node/sql.</h5>
                <Input 
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    userId={userId}
                    setUserId={setUserId}
                />    

            </div>
        </div>
    );
        
}

export default App;