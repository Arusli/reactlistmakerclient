import React from 'react';

const Input = () => {
    
    //need to create an input field
    // the value of this field will be stored to a state array 
    // that state array will be mapped and generated the visible list
    
    //also need a search term state
    
    const onSubmit = event => {
        event.preventDefault();
        console.log('form submitted');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Enter Item</label>
                </div>
                <div>
                    <input type="text"></input>
                    <input type="submit" value="Add"></input>
                </div>
            </form>
        </div>
    );
}

export default Input;