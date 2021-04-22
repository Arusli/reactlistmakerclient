import React, {useState} from 'react';

const ListItem = ({item}) => {

    const [coloring, setColoring] = useState('black');
    const [sizing, setSizing] = useState('2rem');
    const [line, setline] = useState('none')
    const [checked, setChecked] = useState(false);

    const checkOff = (e) => {

        e.preventDefault();

        if (!checked) {
            setChecked(true);
            setColoring('lightgrey');
            setSizing('2rem');
            setline('line-through')
        }

        if (checked) {
            setChecked(false);
            setColoring('black');
            setSizing('2rem');
            setline('none');
        }
 
    };

    // setting up an anchor tag onclick in react:
    // https://stackoverflow.com/questions/44292187/anchor-tag-isnt-calling-the-onclick-function-in-react

    return (
        <div style={{color: coloring, fontSize: sizing, marginBottom: '10px', display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
            <button style={{color: coloring, marginRight: '8px', height: '2rem', width: '3rem', cursor: 'pointer'}} onClick={checkOff}>&#10003;</button>
            {item}
            <button style={{color: 'red', marginLeft: '8px', height: '2rem', width: '3rem', cursor: 'pointer'}}>X</button>
        </div>
    );
}

export default ListItem;