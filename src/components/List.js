import React from 'react';
import ListItem from './ListItem';

const List = ({list, setList, makeGetRequest}) => {

    //also need keys/ids for items
    // How to generate keys: https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements

    const renderedList = list.map(
        (item) => {
            return (
                <ListItem item={item.content} list={list} setList={setList} key={item.id} /> //need key?
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