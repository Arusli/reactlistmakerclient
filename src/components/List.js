import React, {useState} from 'react';
import ListItem from './ListItem';

const List = ({list}) => {
    let list2 = [...list];

  
    //use map to map an array of all the list items.
    //this items will be stored in an array in state.

    //also need keys/ids for items


    const renderedList = list.map(
        (item) => {
            return (
                <ListItem item={item} />
            );
        });
    
    return (
        <div style={{textAlign: 'center'}}>
            <div style={{margin: '40px'}}>
                {renderedList}
            </div>
            <div>
                <button>Clear Completed Items</button>
            </div>
        </div>
    );
}

export default List;