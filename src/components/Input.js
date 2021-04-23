import React, {useState, useEffect} from 'react';
import List from './List';
import axios from 'axios';

const Input = () => {
    
    const [term, setTerm] = useState('');
    const [list, setList] = useState([]); 
    
    useEffect( () => {
        axios.get('http://localhost:3001/db')
        .then( res => {
            const array = [];
            res.data.forEach( (element) => {
                array.push(element.content);
            })
            console.log(array);
            setList(array);
        })
    }, []); //if a blank array, this will only run once upon loading

    
    const makePostRequest = async (content) => {
        //need a function that produces a data object {content: someting} to pass into post method.?
        await axios.post('http://localhost:3001/post', {
            content: content
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
    const onSubmit = (event) => {
        if (term !== '' && !list.includes(term.trim())) {
            makePostRequest(term.trim());
            const array = [...list, term.trim()];
            event.preventDefault();
            setList(array); //possibly need to make this an object with properties {term: term, id: uuid}. //is this a "STALE CLOSURE PROBLEM?"
            // setList(['hamster', 'gerbil']);
            console.log(term);
            setTimeout(() => console.log(list), 2000); //is this a "STALE CLOSURE PROBLEM?"
            setTerm(''); 
        }
        
        if (term === '' || list.includes(term.trim())) {
            event.preventDefault();
        }
    }
    
    // useEffect( () => {
    //     console.log(list)
    // }, [list]);

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <form onSubmit={onSubmit}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input style={{textAlign: 'center', marginRight: '10px', minWidth: '300px', minHeight: '30px', fontSize: '1.5rem'}} type="text" value={term} onChange={event => setTerm(event.target.value)}></input>
                        <input style={{textAlign: 'center', height: '30px', width: '30px'}} type="submit" value="+"></input>
                    </div>
                </form>
            </div>
            <div>
                <List list={list} setList={setList} />
            </div>
        </div>
    );
}

export default Input;