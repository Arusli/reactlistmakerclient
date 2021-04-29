import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Input from './Input';
import Login from './Login';
import Logout from './Logout';


//MAIN PROBLEMS:
// 1. SOLVED - list rendering on load problem, via useEffect [userId].
// 2. SOLVED - Need to conditionally render list/input based on isLoggedIn State.
// 3. SOLVED - How to style login/logout component/buttons.
// 4. SOLVED - Css formatting to look good, be responsive, and account for long term values.
// 5. SOLVED - Edit list item css re: check mark toggling, possbily use useRef for this.
// 6. maybe add media query's for mobile device, re: reducing fontSize/div height of list items.
// 7. re-refactor code, adding appropriate comments, deleting lodash from npm, etc.

// https://developers.google.com/identity/sign-in/web/sign-in
// https://developers.google.com/identity/sign-in/web/backend-auth

//NPM VERSION: https://www.youtube.com/watch?v=-OgU5EAcQmo
//https://anthonyjgrove.github.io/react-google-login/?path=/info/google-logout-button--default-button
//https://www.npmjs.com/package/react-google-login
//https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del


const url = 'http://localhost:3001'

const App = () => {
    
    console.log('App Component Renders');

    // for use with google log in. pass down as props throughout the app.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('0');
    const [userName, setUserName] = useState(''); //pass to Log in/Log out as a prop.



    //MOVING IN THIS LOGIC FROM INPUT COMPONENT TO HERE
    const [list, setList] = useState([]); 

    const userIdRef = useRef('0');
    userIdRef.current = userId;


    //USE EFFECT RERENDERS APP WHENEVER USER ID CHANGES. THIS REDISPLAYS UPDATED LIST ITEMS.
    useEffect( () => {
        console.log('input useEffect renders');
        makeGetRequest();
    }, [userId]); //if a blank array, this will only run once upon loading


    //(can i extract these requests/import them from another file somehow?)
    //GET REQUEST
    const makeGetRequest = () => {
        console.log('makeGetRequest called');
        console.log('get request userId', userId);
        console.log('get request userIdRef', userIdRef.current);
        axios.get(`${url}/db`, {
            params: {
                userId: userId
                // userId: userIdRef.current
            }
        })
        .then( res => {
            const array = [];
            // const wordArray = [];
            console.log('get request response: ', res.data);
            res.data.forEach( (element) => {
                array.push(element);
                // wordArray.push(element.content);
            });
            // console.log(wordArray);
            setList(array);
            // setTermArray(wordArray);
        })
    };
    

    //POST REQUEST
    const makePostRequest = async (content) => {
        await axios.post(`${url}/post`, {
            content: content,
            userId: userId
            // userId: userIdRef.current
        })
        .then( res => {
            console.log(res.data);
        });
    };


    //DELETE REQUEST
    const makeDeleteRequest = async (item) => {
        console.log('userId value in ListItem Component', userId);
        await axios.delete(`${url}/delete`, {
            data: {
                id: item.id,
                userId: userId
            }
        })
        .then( res => {
            console.log(res.data);
        });

        // makeGetRequest();  unneeded
      };


    return (
        // container wrapping all content
        <div style={{}}>
                
                {/* navbar background. */}
                <div style={{position: 'fixed', top: '0', height: '64px', width: '100%', opacity: '.85', backgroundColor: '#000044'}}></div>

                {/* navbar container for centering */}
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {/* navbar */}
                    <div style={{position: 'fixed', top: '0', height: '64px', width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        {isLoggedIn ? (<div className='fadein' style={{color: '#CECECE', fontWeight: 'bold'}}>{userName}'s List</div>) : null }
                        {isLoggedIn ? null : 
                        (<div style={{margin:'10px 30px'}}>
                        <Login 
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            userId={userId}
                            setUserId={setUserId}
                            setUserName={setUserName}
                        />
                        </div>)}
                        {isLoggedIn ? (<div style={{margin:'10px 30px'}}>
                        <Logout 
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            userId={userId}
                            setUserId={setUserId}
                            setUserName={setUserName}
                        />
                        </div>) : null}
                    </div> 
                </div>
                

                {/* input div */}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '10vh'}}>
                    <h1 className='fadein' style={{marginBottom: '0px', marginTop: '5rem'}}>Listmaker</h1>
                    <h3 className='fadein' style={{marginTop: '0px'}}>Built with react/node/sql.</h3>
                    {isLoggedIn ? null : (<div className='pulse' style={{fontSize: '2.6rem', margin: '30px', fontWeight: 'bold'}}>Please Log In.</div>)}
                
                    {isLoggedIn ? (
                        <Input 
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        userId={userId}
                        setUserId={setUserId}
                        makeGetRequest={makeGetRequest}
                        makePostRequest={makePostRequest}
                        makeDeleteRequest={makeDeleteRequest}
                        setList={setList}
                        list={list}
                        />
                        ) : null}    
                </div>
                
        </div>
    );
        
}

export default App;