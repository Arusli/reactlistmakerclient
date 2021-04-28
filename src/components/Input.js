import React, {useState} from 'react';
import List from './List';

const Input = (
    {isLoggedIn, 
    setIsLoggedIn, 
    userId, 
    setUserId, 
    makeGetRequest, 
    makePostRequest, 
    makeDeleteRequest,
    list, 
    setList
    }) => {

    console.log('Input Component Renders');
    
    const [term, setTerm] = useState('');
    // const [list, setList] = useState([]); 


    // const [termArray, setTermArray] = useState([]); //use this for populating list without get requests, if needed.
    // IF I WANT TO NOT MAKE AS MANY GET REQUESTS, I CAN POPULATE THE LIST WITH A TERM/WORD ARRAY.
    //HOWEVER THIS RUNS THE PROBLEM OF NOT TRACKING SETTING ID'S FROM THE DATABASE ONTO THE NEW ITEMS.
    //THIS MEANS WE CAN NO LONGER USE ID'S TO MAKE DELETE REQUESTS.
    //WE COULD ASSIGN UUID'S TO EACH NEW ITEM I SUPPOSE... AND SAVE THAT ID INTO THE DATABSE AND USE THAT TO DELETE.
    //THAT'S AN IDEA IF WE NEED TO DO IT.


    //MOVED GET REQUEST AND POST REQUEST TO APP COMPONENT


    
    //why doesn't setList update immediately? https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    //https://reactjs.org/docs/hooks-effect.html
    //https://linguinecode.com/post/why-react-setstate-usestate-does-not-update-immediately

    //STALE PROPS: https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function



    
    //TEST NEW ONSUBMIT
    const onSubmit = async (event) => {
        if (term !== '') {
            event.preventDefault();
            await makePostRequest(term.replace(/"/g, "'")); //accounts for sql "" errors
            await makeGetRequest();
            setTerm(''); 
            console.log('user id', userId);
            // console.log('user id ref', userIdRef.current)
        }
        
        if (term === '') {
            event.preventDefault();
        }
    }

    return (
        // container div inside the input div
        <div>

            {/* contains input bar and button */}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <form onSubmit={onSubmit}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <input style={{textAlign: 'center', width: '50vw', minWidth: '210px', maxWidth: '350px', margin: '0', padding: '0', height: '2.5rem', fontSize: '1.2rem', backgroundColor: '#F7F7F7', border: 'solid 2px #0080ff'}} autoFocus type="text" maxLength="40" value={term} onChange={event => setTerm(event.target.value)}></input>
                        <input style={{textAlign: 'center', margin: '0 0 0 10px', height: '3rem', width: '3rem', color: 'white', fontWeight: 'bold', backgroundColor: '#EC37CE', borderRadius: '5px', borderStyle: 'none', fontSize: '1.5rem', cursor: 'pointer'}} type="submit" value="+"></input>
                    </div>
                </form>
            </div>

            {/* contains list of items */}
            <div style={{border: 'none', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <List 
                    list={list} 
                    setList={setList} 
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    userId={userId}
                    setUserId={setUserId}  
                    makeDeleteRequest={makeDeleteRequest}
                />
            </div>

        </div>
    );
}

export default Input;