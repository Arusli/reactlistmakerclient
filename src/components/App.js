import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Input from './Input';
import Login from './Login';
import Logout from './Logout';
import List from './List';

//material ui
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

//material ui
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

//MAIN PROBLEMS:
// 1. SOLVED - list rendering on load problem, via useEffect [userId].
// 2. SOLVED - Need to conditionally render list/input based on isLoggedIn State.
// 3. SOLVED - How to style login/logout component/buttons.
// 4. SOLVED - Css formatting to look good, be responsive, and account for long term values.
// 5. SOLVED - Edit list item css re: check mark toggling, possbily use useRef for this.
// 6. SOLVED? - List item animations for add/drop
// 7. SOLVED - Add icons/react-icons
// 8. SOLVED - useRef in listitem. (did this but don't understand it well)
// 9. SOLVED - delete lodash and react transition group from npm
// 10. SOLVED - decided not to refactor code according to Katie's advice, due to sql ids being used in makeDelete.
// 11. SOLVED - error handling on server/client side? list size limiting?
// 12. SOLVED - handle max list size delete bug...
// 13. SOLVED - Add loading spinner while awaiting api response, and prevent input access while loading.

// 14. BUG - when accessing the site after a long break, the db server takes a while to spin up.
// and if the user is pre-logged in, their list does not propagate. 
// It remains empty until they add an item. 
// I don't think this has anything to do with the added loading spinner, since I took it out and the problem was the same.
// I belive it has something to do with how often teh page is re-rendering/making get requests.
// I have set a if (user !== 0) statement to the get request, will push and test now. 
// This seems to work!

//  15. BUG - There is when switching between google accounts there is a split second where hte first
// list is on the page, then the list component repopulates with the second list.
// I think this is because I removed the makeGetRequest when userID = 0, which happens on logout.
// I added a setRequestComplete(false) to the logout flow, I think this fixes it.

// 15. maybe add media query's for mobile device, re: reducing fontSize/div height of list items.
// 16. re-refactor code, adding appropriate comments.
// 17. testing: https://enzymejs.github.io/enzyme/docs/guides/jest.html


//NPM GOOGLE AUTH/LOGIN: 
//https://www.youtube.com/watch?v=-OgU5EAcQmo
//https://anthonyjgrove.github.io/react-google-login/?path=/info/google-logout-button--default-button
//https://www.npmjs.com/package/react-google-login
//https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del

//LOCAL AND REMOTE DB URLS
const url = 'http://localhost:3001'
// const url = 'https://listmaker-express-server.herokuapp.com'


const App = () => {
    
    console.log('App Component Renders');

    // for use with google log in. pass down as props throughout the app.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('0');
    const [userName, setUserName] = useState('');
    const [list, setList] = useState([]); //default to null in order to use loading spinner?
    const [requestComplete, setRequestComplete] = useState(false);
    //
    const maxListLength = 20;
    //
    const userIdRef = useRef('0');
    userIdRef.current = userId;

    //material ui
    const classes = useStyles();

    //USE EFFECT RERENDERS APP WHENEVER USER ID CHANGES. THIS REDISPLAYS UPDATED LIST ITEMS.
    useEffect( () => {
        if (userId !== '0') {
            console.log('useEffect renders');
            makeGetRequest();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

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
            setRequestComplete(true); //I want this to fire first before setList, not after...
            const array = [];
            console.log('get request response: ', res.data);
            // res.data is an array of objects from sql.
            // e.g. res.data[0] === {id: 1955, content: "one", user_id: "114716709116595320820"}
            res.data.forEach( (element) => {
                //HYPOTHETICAL REFACTOR (David style)
                //element.classOpen = 'open'
                //element.classChecked = 'unchecked'
                //element.classDisplay = 'grid'
                array.push(element);
            });
            setList(array);
        }).catch( err => {
            console.log('get request error ', err);
            alert(`get request error: ${err}`);
        });
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
            // setRequestComplete(false);
        }).catch(err => {
            console.log('post request error ', err);
        });
    };

    //CHECKED REQUEST - NEW
    const makeCheckedRequest = async(item) => {
        await axios.post(`${url}/check`, {
            content: true,
            userId: userId,
            id: item.id
            // userId: userIdRef.current
        })
        .then( res => {
            console.log(res.data);
            // setRequestComplete(false);
        }).catch(err => {
            console.log('post request error ', err);
        });
    };

       //UNCHECKED REQUEST - NEW
       const makeUncheckedRequest = async(item) => {
        await axios.post(`${url}/check`, {
            content: false,
            userId: userId,
            id: item.id
            // userId: userIdRef.current
        })
        .then( res => {
            console.log(res.data);
            // setRequestComplete(false);
        }).catch(err => {
            console.log('post request error ', err);
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
        }).catch(err => {
            console.log('delete request error ', err);
        });
      };

    //MAKE AND DELETE REQUEST
        // only needed to control bug where if a user hits the max list.length
        // that user won't be able to add items even after they delete items
        // because the list ONLY UPDATES when the get request is called.
        // the deletions are only visual until the getRequest requests and re-renders that list.
    const makeDeleteAndGetRequest = async (item) => {
        await makeDeleteRequest(item);
        makeGetRequest();
    }

    return (
        // container wrapping all content
        <div style={{}}>
                
                {/* navbar background. */}
                <div className="navbar-bg"></div>

                {/* navbar container for centering */}
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    
                    {/* navbar */}
                    <div className="navbar" >
                        {isLoggedIn ? (<div className='fadein' style={{color: '#CECECE', fontSize: '1.3rem', fontWeight: 'bold'}}>{userName}'s List</div>) : null }
                        {isLoggedIn ? null : 
                        (<div>
                            <Login 
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                                userId={userId}
                                setUserId={setUserId}
                                setUserName={setUserName}
                            />
                        </div>)}
                        {isLoggedIn ? 
                        (<div>
                            <Logout 
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                                userId={userId}
                                setUserId={setUserId}
                                setUserName={setUserName}
                                setRequestComplete={setRequestComplete}
                            />
                        </div>) : null}
                    </div> 
                </div>

                   {/* Loading Spinner */}
                   { (!isLoggedIn || (isLoggedIn && requestComplete)) ? null : (<Backdrop className={classes.backdrop} open>
                    <CircularProgress color="inherit" />
                </Backdrop>) }
                
                {/* input div */}
                <div className='fadein' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '10vh'}}>
                    <h1 style={{marginBottom: '0px', marginTop: '3rem', fontSize: '2.5rem'}}>Listmaker</h1>
                    <h3 style={{margin: '10px'}}>Built with react/node/sql.</h3>
                    {isLoggedIn ? null : (<div className='pulse' style={{fontSize: '2.6rem', margin: '30px', fontWeight: 'bold'}}>Please Log In.</div>)}
                
                    {isLoggedIn && requestComplete ? (
                        <Input 
                        userId={userId}
                        makeGetRequest={makeGetRequest}
                        makePostRequest={makePostRequest}
                        list={list}
                        setList={setList}
                        maxListLength={maxListLength}
                        />
                        ) : null}    
                </div>
                

                {/* List div */}
                {isLoggedIn && requestComplete ? (
                    <div style={{border: 'none', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <List 
                            list={list} 
                            setList={setList} 
                            makeDeleteRequest={makeDeleteRequest}
                            userId={userId} 
                            makeDeleteAndGetRequest={makeDeleteAndGetRequest}
                            maxListLength={maxListLength}
                            makeCheckedRequest={makeCheckedRequest}
                            makeUncheckedRequest={makeUncheckedRequest}
                        />
                    </div>
                ) : null}
                         
        </div>
    );
        
}

export default App;