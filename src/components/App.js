import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Input from './Input';
import Login from './Login';
import Logout from './Logout';


//MAIN PROBLEMS:
// 1. Solved list rendering on load problem, via useEffect [userId].
// 2. Need to conditionally render list/input based on isLoggedIn State.
// 3. How to style login/logout component/buttons.

// https://developers.google.com/identity/sign-in/web/sign-in
// https://developers.google.com/identity/sign-in/web/backend-auth

//NPM VERSION: https://www.youtube.com/watch?v=-OgU5EAcQmo
//https://anthonyjgrove.github.io/react-google-login/?path=/info/google-logout-button--default-button
//https://www.npmjs.com/package/react-google-login
//https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del



//O AUTH
// CLIENT ID 610908639248-t99nq5ooodvi7r5qm834b2u2ruuh7hus.apps.googleusercontent.com

const url = 'http://localhost:3001'

const App = () => {
    
    console.log('App Component Renders');

    // for use with google log in. pass down as props throughout the app.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('0');



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

        makeGetRequest();
        // await axios.get(`${url}/db`, {
        //     params: {
        //         userId: userId
        //     }
        // })
        // .then( res => {
        //     const array = [];
        //     res.data.forEach( (element) => {
        //         array.push(element);
        //     })
        //     setList(array);
        // });
    };


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
                    makeGetRequest={makeGetRequest}
                    makePostRequest={makePostRequest}
                    makeDeleteRequest={makeDeleteRequest}
                    setList={setList}
                    list={list}
                />    

            </div>
        </div>
    );
        
}

export default App;