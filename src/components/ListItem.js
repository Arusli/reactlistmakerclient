import React, {useState} from 'react';


 // make two styles, one state for each, so that you can switch the styling when button is clicked. WON'T WORK.
// use a similar idea somehow to update the array when the complete button is clicked.



const ListItem = ({item}) => {

    const [coloring, setColoring] = useState('black');

    const changeColoring = () => {
        if (coloring === 'grey') {
            setColoring('black');
        }
 
        if (coloring === 'black') {
            setColoring('grey');
        }
    };

    return (
        <div style={{color: coloring, fontSize: '2rem', marginBottom: '10px'}}>
            {item}
            <button style={{color: coloring, marginLeft: '8px', height: '1.5rem', width: '1.5rem'}} onClick={changeColoring}>&#10003;</button>
        </div>
    );
}

export default ListItem;