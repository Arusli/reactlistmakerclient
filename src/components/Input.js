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
    
    //why doesn't setList update immediately? https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    //https://reactjs.org/docs/hooks-effect.html
    //https://linguinecode.com/post/why-react-setstate-usestate-does-not-update-immediately

    //STALE PROPS: https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function

    
    //TEST NEW ONSUBMIT
    const onSubmit = async (event) => {
        if (term !== '' && list.length < 51) {
            event.preventDefault();
            await makePostRequest(term.replace(/"/g, "'")); //accounts for sql "" errors
            await makeGetRequest(); //UPDATE ARRAY, DON'T MAKE GET REQUEST. - katie. (here you should update list with the term. but realize that right now list is a list of objects.)
            setTerm(''); 
            console.log('user id', userId);
            // console.log('user id ref', userIdRef.current)
        }
        
        if (term === '' || list.length >= 51) {
            event.preventDefault();
        }
    }

    return (
        // container div inside the input div
        <div style={{marginTop: '20px'}}>

            {/* contains input bar and button */}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <form onSubmit={onSubmit}>
                    <div style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center'}}>
                        <input className='fadein input-field' autoFocus type="text" maxLength="40" value={term} onChange={event => setTerm(event.target.value)} />
                        <input className='fadein submitButton' type="submit" value="+"></input>
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