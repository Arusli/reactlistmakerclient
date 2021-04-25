import React from 'react';
import ListItem from './ListItem';

const List = ({list, setList, makeGetRequest, isLoggedIn, setIsLoggedIn, userId, setUserId}) => {


    //the item here is a list item object returned from the get request.
    //contains properties {id, content, and user_id} from sql
    const renderedList = list.map(
        (item) => {
            console.log('userId value in List component', userId);
            return (
                <ListItem 
                    item={item} 
                    list={list} 
                    setList={setList} 
                    key={item.id} 
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    userId={userId}
                    setUserId={setUserId}  
                /> //need key?
            );
        });
    
    return (
            <div style={{width: '40vw', maxWidth: '400px', margin: '40px', textAlign: 'left'}}>
                {renderedList}
            </div>
    );
}

export default List;