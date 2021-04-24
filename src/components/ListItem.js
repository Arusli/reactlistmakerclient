import React, {useState} from 'react';
import _ from 'lodash';
import axios from 'axios';

const ListItem = ({item, list, setList}) => {

    //styling states
    const [coloring, setColoring] = useState('black');
    const [sizing, setSizing] = useState('2rem');
    const [checked, setChecked] = useState(false);

    const checkOff = (e) => {
        e.preventDefault();

        if (!checked) {
            setChecked(true);
            setColoring('lightgrey');
            setSizing('2rem');
        }

        if (checked) {
            setChecked(false);
            setColoring('black');
            setSizing('2rem');
        }
    };

    const makeDeleteRequest = async (content) => {
        await axios.delete('http://localhost:3001/delete', {
            data: {
                content: content
            }
        })
        .then( res => {
            console.log(res.data);
        });

        await axios.get('http://localhost:3001/db')
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
        <div style={{color: coloring, fontSize: sizing, marginBottom: '10px', display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
            <button style={{color: 'black', marginRight: '8px', height: '2rem', width: '3rem', cursor: 'pointer'}} onClick={checkOff}>&#10003;</button>
            {item}
            <button style={{color: 'maroon', marginLeft: '8px', height: '2rem', width: '3rem', cursor: 'pointer'}} onClick={updateList} >X</button>
        </div>
    );
}

export default ListItem;