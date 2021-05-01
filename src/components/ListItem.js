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
    const [classVar, setClassVar] = useState('unchecked');
    //useref
    const checkState = useRef(checked);
    
 
    const checkOff = async (e) => {
        e.preventDefault();
        if (!checked) {
            setClassVar('checked')
            await setChecked(true);
            console.log(checkState.current); //why false in react dev tools/console?
        }
        if (checked) {
            setClassVar('unchecked')
            setChecked(false);
            console.log(checked);
            
        }
    };

    //UPDATE LIST TEST
     const updateList = () => {
        setMaxHeight('0px'); 
        setPadding('0px')
        setTimeout(()=>setDisplay('none'), 190); //prevents weird css spacingbackup when deleting multiple items.
        //update list state minus the term, no get request. - katie
        console.log('item:',item);
        makeDeleteRequest(item);
    };
    
    //Remember: one list item per component, each with their own personal states.
    //Remember: only the targeted list item will re-render on listitem state change.
   
    // just use regular variable to change classname. - katie. (this didn't work for me.)
    return (
        <li 
        className={classVar}
        style={{
            display: display,
            maxHeight: maxHeight,
            padding: padding
            }}>
            <div style={{overflowWrap: 'break-word', margin: '0 10px'}}>{item.content}</div>
            <button style={{color: '#ffffcc', backgroundColor: '#0080ff', fontWeight: 'bold', height: '2.5rem', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={checkOff} ><FaCheckCircle size="1.4rem" /></button>
            <button style={{color: '#ffffcc', backgroundColor: '#FF3333', fontWeight: 'bold', height: '2.5rem', marginLeft: '10px', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={updateList} ><MdRemoveCircle size="1.5rem"  /></button>
        </li>
    );
}

export default ListItem;