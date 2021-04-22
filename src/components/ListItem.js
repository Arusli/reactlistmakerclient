import React, {useState} from 'react';


// make two styles, one state for each, so that you can switch the styling when button is clicked. WON'T WORK.
// use a similar idea somehow to update the array when the complete button is clicked.


const ListItem = ({item}) => {

    const [coloring, setColoring] = useState('black');
    const [sizing, setSizing] = useState('2rem')

    const changeColoring = (e) => {

        e.preventDefault();

        if (coloring === 'black') {
            setColoring('grey');
            setSizing('1.6rem')
        }

        if (coloring === 'grey') {
            setColoring('black');
            setSizing('2rem')
        }
 
    };

    // setting up an anchor tag onclick in react:
    // https://stackoverflow.com/questions/44292187/anchor-tag-isnt-calling-the-onclick-function-in-react

    return (
        <div style={{color: coloring, fontSize: sizing, marginBottom: '10px'}}>
            <a style={{color: coloring, textDecoration: 'none'}} href='/' onClick={changeColoring}>{item}</a>
            <button style={{color: coloring, marginLeft: '8px', height: '1.5rem', width: '2rem'}} onClick={changeColoring}>&#10003;</button>
        </div>
    );
}

export default ListItem;