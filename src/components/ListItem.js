import React, {useState} from 'react';
// import _ from 'lodash';  //remove lodash from npm possibly?
import axios from 'axios';

const ListItem = ({item, list, setList, isLoggedIn, setIsLoggedIn, userId, setUserId}) => {

    //styling states
    const [coloring, setColoring] = useState('black');
    // const [sizing, setSizing] = useState('2rem');
    const [checked, setChecked] = useState(false);

    const checkOff = (e) => {
        e.preventDefault();

        if (!checked) {
            setChecked(true);
            setColoring('lightgrey');
            // setSizing('2rem');
        }

        if (checked) {
            setChecked(false);
            setColoring('black');
            // setSizing('2rem');
        }
    };

    const makeDeleteRequest = async (item) => {
        console.log('userId value in ListItem Component', userId);
        await axios.delete('http://localhost:3001/delete', {
            data: {
                id: item.id,
                userId: userId
            }
        })
        .then( res => {
            console.log(res.data);
        });

        await axios.get('http://localhost:3001/db', {
            params: {
                userId: userId
            }
        })
        .then( res => {
            const array = [];
            res.data.forEach( (element) => {
                array.push(element);
            })
            setList(array);
        });
    };

    //TEST
    // const makeGetRequest = async () => {
    //     await axios.get('http://localhost:3001/db')
    //     .then( res => {
    //         const array = [];
    //         res.data.forEach( (element) => {
    //             array.push(element);
    //         })
    //         setList(array);
            
    //     })
    // };

    // const updateList = () => {
    //     console.log('item:',item);
    //     makeDeleteRequest(item);
    //     const ar = []; //I did this to trick setList to rerender instantly.
    //     list.forEach( (element) => {
    //         ar.push(element.content);
    //     })
    //     setList(_.pull(ar, item));
    //     // setList(['test one', 'test two']);
    // };

    //UPDATE LIST TEST
     const updateList = async () => {
        console.log('item:',item);
        await makeDeleteRequest(item);
        // axios.get('http://localhost:3001/db')
        // .then( res => {
        //     const array = [];
        //     res.data.forEach( (element) => {
        //         array.push(element);
        //     })
        //     setList(array);
        // });
    };
    

    //add a <pre> tag around {item} if you want to preserve spaces
    return (
        <div style={{display: 'grid', width: '100%', gridTemplateColumns: '60% 20% 20%', alignItems: 'center', color: coloring, margin: '15px', fontSize: '1.5rem'}}>
            <div style={{overflowWrap: 'break-word'}}>{item.content}</div>
            <button style={{color: 'white', backgroundColor: 'green', height: '2.2rem', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={checkOff}>&#10003;</button>
            <button style={{color: 'white', backgroundColor: 'red', height: '2.2rem', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={updateList} >X</button>
        </div>
    );
}

export default ListItem;