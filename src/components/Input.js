import React, {useState, useEffect, useRef} from 'react';
import List from './List';
import axios from 'axios';

const Input = ({isLoggedIn, setIsLoggedIn, userId, setUserId}) => {
    
    const [term, setTerm] = useState('');
    const [list, setList] = useState([]); 

    const userIdRef = useRef('0');
    userIdRef.current = userId;

    // const [termArray, setTermArray] = useState([]); //use this for populating list without get requests, if needed.
    // IF I WANT TO NOT MAKE AS MANY GET REQUESTS, I CAN POPULATE THE LIST WITH A TERM/WORD ARRAY.
    //HOWEVER THIS RUNS THE PROBLEM OF NOT TRACKING SETTING ID'S FROM THE DATABASE ONTO THE NEW ITEMS.
    //THIS MEANS WE CAN NO LONGER USE ID'S TO MAKE DELETE REQUESTS.
    //WE COULD ASSIGN UUID'S TO EACH NEW ITEM I SUPPOSE... AND SAVE THAT ID INTO THE DATABSE AND USE THAT TO DELETE.
    //THAT'S AN IDEA IF WE NEED TO DO IT.


    useEffect( () => {
        makeGetRequest();
    }, []); //if a blank array, this will only run once upon loading


    //i need to pass some params/body to this request, re: userId.***
    //i think i need to move this function to App.js... along with axios. and make get requests from axios.
    //and also pass this function around as a prop that can be called by other components when needed.
    const makeGetRequest = () => {
        console.log('makeGetRequest called');
        console.log('get request userId', userId);
        console.log('get request userIdRef', userIdRef.current);
        axios.get('http://localhost:3001/db', {
            params: {
                // userId: userId
                userId: userIdRef.current
            }
        })
        .then( res => {
            const array = [];
            // const wordArray = [];
            console.log(res.data);
            res.data.forEach( (element) => {
                array.push(element);
                // wordArray.push(element.content);
            });
            // console.log(wordArray);
            setList(array);
            // setTermArray(wordArray);
        })
    };
    
    const makePostRequest = async (content) => {
        //need a function that produces a data object {content: someting} to pass into post method.?
        await axios.post('http://localhost:3001/post', {
            content: content,
            // userId: userId
            userId: userIdRef.current
        })
        .then( res => {
            console.log(res.data);
        });
    };
    

    //why doesn't setList update immediately? https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    //https://reactjs.org/docs/hooks-effect.html
    //https://linguinecode.com/post/why-react-setstate-usestate-does-not-update-immediately

    //STALE PROPS: https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function


    //need a post function here
    // const onSubmit = (event) => {
    //     if (term !== '' && !list.includes(term.trim())) {
    //         makePostRequest(term.trim());
    //         const array = [...list, term.trim()];
    //         event.preventDefault();
    //         setList(array); //possibly need to make this an object with properties {term: term, id: uuid}. //is this a "STALE CLOSURE PROBLEM?"
    //         // setList(['hamster', 'gerbil']);
    //         console.log(term);
    //         setTimeout(() => console.log(list), 2000); //is this a "STALE CLOSURE PROBLEM?"
    //         setTerm(''); 
    //     }
        
    //     if (term === '' || list.includes(term.trim())) {
    //         event.preventDefault();
    //     }
    // }
    
    //TEST NEW ONSUBMIT
    const onSubmit = async (event) => {
        if (term !== '') {
            event.preventDefault();
            await makePostRequest(term.replace(/"/g, "'")); //accounts for sql "" errors
            await makeGetRequest();
            setTerm(''); 
            console.log('user id', userId);
            console.log('user id ref', userIdRef.current)
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
                />
            </div>
        </div>
    );
}

export default Input;