import React from 'react';

const List = () => {
    
    //use map to map an array of all the list items.
    //this items will be stored in an array in state.
    const renderedList = () => {
        return (
            <div>List Items Here</div>
        );
    };
    
    return (
        <div>
            {renderedList()}
        </div>
    );
}

export default List;