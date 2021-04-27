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
        <div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <form onSubmit={onSubmit}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <input style={{textAlign: 'center', marginRight: '10px', minWidth: '300px', minHeight: '2.2rem', fontSize: '1.2rem'}} type="text" maxLength="40" value={term} onChange={event => setTerm(event.target.value)}></input>
                        <input style={{textAlign: 'center', height: '2.2rem', width: '3rem', color: 'white', backgroundColor: 'black', borderRadius: '5px', borderStyle: 'none', fontSize: '1.5rem'}} type="submit" value="+"></input>
                    </div>
                </form>
            </div>

            <div style={{}}>
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