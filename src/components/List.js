import React, {useState} from 'react';
import ListItem from './ListItem';

const List = ({list}) => {
    let list2 = [...list];

  
    //use map to map an array of all the list items.
    //this items will be stored in an array in state.

    //also need keys/ids for items
    // How to generate keys: https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements

    //this needs to update when user clicks Clear Items Button. How?
    //needs to know via props/state which items in List Item were checked off.
    //maybe we can loop through the list items and see if their state is complete/incomplete and if so, use those to setList again.
    const updateList = () => {
        return 'updated list'
    };

    const renderedList = list.map(
        (item) => {
            return (
                <ListItem item={item} /> //need key?
            );
        });
    
    return (
        <div style={{textAlign: 'center'}}>
            <div style={{margin: '40px', textAlign: 'left'}}>
                {renderedList}
            </div>
            <div>
                <button>Update List</button>
            </div>
        </div>
    );
}

export default List;