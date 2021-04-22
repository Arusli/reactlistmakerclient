import React, {useState} from 'react';
import List from './List';

const Input = () => {
    
    //need to create an input field
    // the value of this field will be stored to a state array 
    // that state array will be mapped and generated the visible list
    
    //also need a search term state
    const [term, setTerm] = useState('');
    const [list, setList] = useState([]);

    
   

    const onSubmit = (event) => {

        if (term !== '') {
            event.preventDefault();
            setList([...list, term]);
            console.log(term);
            console.log(list)   
            setTerm(''); 
        }
        
        if (term === '') {
            event.preventDefault();
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <input style={{textAlign: 'center'}} type="text" value={term} onChange={event => setTerm(event.target.value)}></input>
                        <input style={{textAlign: 'center'}} type="submit" value="+"></input>
                    </div>
                </form>
            </div>
            <div>
                <List list={list} />
            </div>
        </div>
    );
}

export default Input;