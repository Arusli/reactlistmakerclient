import React, {useState, useRef} from 'react';
import {FaCheckCircle} from 'react-icons/fa';
import {MdRemoveCircle} from 'react-icons/md';

const ListItem = ({item, list, setList, isLoggedIn, setIsLoggedIn, userId, setUserId, makeDeleteRequest}) => {
    console.log('ListItem Component Renders');
    // const [checked, setChecked] = useState(false);
    //styling states
    const [classOpen, setClassOpen] = useState('open')
    const [classChecked, setClassChecked] = useState('unchecked');
    const [display, setDisplay] = useState('grid');
 
    const checkOff = (e) => {
        e.preventDefault();
        if (classChecked === 'unchecked') {
            setClassChecked('checked')
        }

        if (classChecked === 'checked') {
            setClassChecked('unchecked')
        }
    };

    //UPDATE LIST TEST
     const updateList = () => {
        setClassOpen('closed');
        setTimeout(() => setDisplay('none'), 190); //prevents weird css spacingbackup when deleting multiple items.
        //update list state minus the term, no get request. - katie.
        console.log('item:',item);
        makeDeleteRequest(item);
    };
    
    //Remember: one list item per component, each with their own personal states.
    //Remember: only the targeted list item will re-render on listitem state change.
   
    // just use regular variable to change classname. - katie. (this didn't work for me?)
    return (
        <li 
        className={`${classChecked} ${classOpen}`}
        style={{display: display}}>
            <div style={{overflowWrap: 'break-word', margin: '0 10px'}}>{item.content}</div>
            <button style={{color: '#ffffcc', backgroundColor: '#0080ff', fontWeight: 'bold', height: '2.5rem', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={checkOff} ><FaCheckCircle size="1.4rem" /></button>
            <button style={{color: '#ffffcc', backgroundColor: '#FF3333', fontWeight: 'bold', height: '2.5rem', marginLeft: '10px', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={updateList} ><MdRemoveCircle size="1.5rem"  /></button>
        </li>
    );
}

export default ListItem;