import React, {useState, useRef} from 'react';
import {FaCheckCircle} from 'react-icons/fa';
import {MdRemoveCircle} from 'react-icons/md';

const ListItem = ({item, list, setList, isLoggedIn, setIsLoggedIn, userId, setUserId, makeDeleteRequest}) => {
    console.log('ListItem Component Renders');
    const [checked, setChecked] = useState(false);
    //styling states
    const [maxHeight, setMaxHeight] = useState('150px');
    const [padding, setPadding] = useState('10px');
    const [display, setDisplay] = useState('grid');
    const [coloring, setColoring] = useState('rgba(255, 255, 204, 1)'); //move to useRef probably
    const [bgColoring, setBgColoring] = useState('rgba(60, 60, 60, 1)'); //move to useRef probably
    const [textDec, setTextDec] = useState('none');


    const checkOff = (e) => {
        e.preventDefault();
        if (!checked) {
            setColoring('rgba(255, 255, 204, .3)');
            setBgColoring('rgba(60, 60, 60, .3)');
            setTextDec('line-through');
            setChecked(true);
        }
        if (checked) {
            setColoring('rgba(255, 255, 204, 1)');
            setBgColoring('rgba(60, 60, 60, 1)');
            setTextDec('none');
            setChecked(false);
        }
    };

    //UPDATE LIST TEST
     const updateList = () => {
        setMaxHeight('0px'); 
        setPadding('0px')
        setTimeout(()=>setDisplay('none'), 190);
        console.log('item:',item);
        makeDeleteRequest(item);
    };
    
    //Remember: one list item per component, each with their own personal states.
    //Remember: only the targeted list item will re-render on listitem state change.
    return (
        <li 
        style={{
            display: display,
            maxHeight: maxHeight,
            padding: padding,  
            color: coloring, 
            backgroundColor: bgColoring, 
            textDecoration: textDec,
            }}>
            <div style={{overflowWrap: 'break-word', margin: '0 10px'}}>{item.content}</div>
            <button style={{color: '#ffffcc', backgroundColor: '#0080ff', fontWeight: 'bold', height: '2.5rem', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={checkOff} ><FaCheckCircle size="1.4rem" /></button>
            <button style={{color: '#ffffcc', backgroundColor: '#FF3333', fontWeight: 'bold', height: '2.5rem', marginLeft: '10px', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={updateList} ><MdRemoveCircle size="1.5rem"  /></button>
        </li>
    );
}

//&#10003;

export default ListItem;