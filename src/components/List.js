import React from 'react';
import ListItem from './ListItem';

const List = ({list, setList}) => {
   
    
    // USING REFS: https://reactjs.org/docs/refs-and-the-dom.html
    // I THINK I NEED TO USE REFS TO CREATE THE NEXT ARRAY. 
    // OTHERWISE EACH TIME I CHECK/UNCHECK A LIST ITEM IT WILL ADD/DELETE A NEW INSTANCE TO THE DATABASE. NOT WHAT WE WANT.


    //use map to map an array of all the list items.
    //this items will be stored in an array in state.

    //also need keys/ids for items
    // How to generate keys: https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements

    //this needs to update when user clicks Clear Items Button. How?
    //needs to know via props/state which items in List Item were checked off.
    //maybe we can loop through the list items and see if their state is complete/incomplete and if so, use those to setList again.


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
        </div>
    );
}

export default List;