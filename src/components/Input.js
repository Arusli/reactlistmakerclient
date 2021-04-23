import React, {useState, useEffect} from 'react';
import List from './List';

const Input = () => {
    
    const [term, setTerm] = useState('');
    const [list, setList] = useState(['default', 'default2']); 

    //why doesn't setList update immediately? https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    //https://reactjs.org/docs/hooks-effect.html
    //https://linguinecode.com/post/why-react-setstate-usestate-does-not-update-immediately

    //STALE PROPS: https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function


    const onSubmit = (event) => {
        if (term !== '' && !list.includes(term.trim())) {
            const array = [...list, term.trim()];
            event.preventDefault();
            setList(array); //possibly need to make this an object with properties {term: term, id: uuid}
            // setList(['hamster', 'gerbil']);
            console.log(term);
            setTimeout(() => console.log(list), 2000); 
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