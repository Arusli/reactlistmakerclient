import React, {useState} from 'react';
import List from './List';

//why doesn't setList update immediately? https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    //https://reactjs.org/docs/hooks-effect.html
    //https://linguinecode.com/post/why-react-setstate-usestate-does-not-update-immediately

    //STALE PROPS: https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function


const Input = (
    {
    userId, 
    makeGetRequest, 
    makePostRequest, 
    list, 
    setList
    }) => {

    console.log('Input Component Renders');
    
    const [term, setTerm] = useState('');
    

    //UPDATE LIST/ARRAY, DON'T MAKE GET REQUEST. - katie. 
            // (here you should update list with the term. but realize that right now list is a list of objects.)
            // Realized I can't do this because I can't delete the correct item from the DB without knowing the id,
            // and the id property is assigned in sequel and needs to be getRequested.
            // I could use UUIDs and avoid this problem, technically.

    //TEST NEW ONSUBMIT
    const onSubmit = async (event) => {
        if (term !== '' && list.length < 51) {
            event.preventDefault();
            await makePostRequest(term.replace(/"/g, "'")); //accounts for sql "" errors
            await makeGetRequest(); 
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
            
        </div>
    );
}

export default Input;