import React, {useState, useEffect} from 'react';
import _ from 'lodash';

const ListItem = ({item, list, setList}) => {

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

    const updateList = () => {
        const ar = [...list]; //I did this to trick setList to rerender instantly.
        setList(_.pull(ar, item));
        // setList(['test one', 'test two']);
    };

  


    return (
        <div style={{color: coloring, fontSize: sizing, marginBottom: '10px', display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
            <button style={{color: 'black', marginRight: '8px', height: '2rem', width: '3rem', cursor: 'pointer'}} onClick={checkOff}>&#10003;</button>
            {item}
            <button style={{color: 'maroon', marginLeft: '8px', height: '2rem', width: '3rem', cursor: 'pointer'}} onClick={updateList} >X</button>
        </div>
    );
}

export default ListItem;