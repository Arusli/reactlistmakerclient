import React, {useState} from 'react';


// make two styles, one state for each, so that you can switch the styling when button is clicked. WON'T WORK.
// use a similar idea somehow to update the array when the complete button is clicked.


const ListItem = ({item}) => {

    const [coloring, setColoring] = useState('black');
    const [sizing, setSizing] = useState('2rem');
    const [line, setline] = useState('none')

    const changeColoring = (e) => {

        e.preventDefault();

        if (coloring === 'black') {
            setColoring('lightgrey');
            setSizing('2rem');
            setline('line-through')
        }

        if (coloring === 'lightgrey') {
            setColoring('black');
            setSizing('2rem');
            setline('none');
        }
 
    };

    // setting up an anchor tag onclick in react:
    // https://stackoverflow.com/questions/44292187/anchor-tag-isnt-calling-the-onclick-function-in-react

    return (
        <div style={{color: coloring, fontSize: sizing, marginBottom: '10px'}}>
            <button style={{color: coloring, marginRight: '8px', height: '1.5rem', width: '2rem', cursor: 'pointer'}} onClick={changeColoring}>&#10003;</button>
            <a style={{color: coloring, textDecoration: line}} href='/' onClick={changeColoring}>{item}</a>
        </div>
    );
}

export default ListItem;