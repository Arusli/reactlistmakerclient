import React, {useState, useRef} from 'react';
import {FaCheckCircle} from 'react-icons/fa';
import {MdRemoveCircle} from 'react-icons/md';

const ListItem = ({item, list, setList, isLoggedIn, setIsLoggedIn, userId, setUserId, makeDeleteRequest}) => {
    console.log('ListItem Component Renders');
    const [checked, setChecked] = useState(false);
    const checkState = useRef(checked);
    //styling states
    const [maxHeight, setMaxHeight] = useState('150px');
    const [padding, setPadding] = useState('10px');
    const [display, setDisplay] = useState('grid');
    const [coloring, setColoring] = useState('rgba(255, 255, 204, 1)');
    const [bgColoring, setBgColoring] = useState('rgba(60, 60, 60, 1)'); 
    //useRefs don't update on screen until a re-render?
    const textDec = useRef('none');

    const checkOff = async (e) => {
        e.preventDefault();
        if (!checked) {
            await setColoring('rgba(255, 255, 204, .3)');
            await setBgColoring('rgba(60, 60, 60, .3)');
            textDec.current = 'line-through';
            await setChecked(true);
            console.log(checkState.current); //why false in react dev tools/console?
        }
        if (checked) {
            setColoring('rgba(255, 255, 204, 1)');
            setBgColoring('rgba(60, 60, 60, 1)');
            textDec.current = 'none';
            setChecked(false);
            console.log(checked);
            
        }
    };

    //UPDATE LIST TEST
     const updateList = () => {
        setMaxHeight('0px'); 
        setPadding('0px')
        setTimeout(()=>setDisplay('none'), 190); //prevents weird css spacing backup when deleting multiple items.
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
            textDecoration: textDec.current,
            }}>
            <div style={{overflowWrap: 'break-word', margin: '0 10px'}}>{item.content}</div>
            <button style={{color: '#ffffcc', backgroundColor: '#0080ff', fontWeight: 'bold', height: '2.5rem', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={checkOff} ><FaCheckCircle size="1.4rem" /></button>
            <button style={{color: '#ffffcc', backgroundColor: '#FF3333', fontWeight: 'bold', height: '2.5rem', marginLeft: '10px', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={updateList} ><MdRemoveCircle size="1.5rem"  /></button>
        </li>
    );
}

export default ListItem;