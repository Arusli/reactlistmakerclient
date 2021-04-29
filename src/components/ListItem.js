import React, {useState} from 'react';


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
    
    //one list item per component
    return (
        <li 
        className = 'add'
        style={{
            opacity: 1,
            display: display,
            width: '100%', 
            maxHeight: maxHeight,
            overflow: 'hidden',
            padding: padding, 
            borderRadius: '10px', 
            gridTemplateColumns: '60% 20% 20%', 
            alignItems: 'center', 
            color: coloring, 
            backgroundColor: bgColoring, 
            textDecoration: textDec,
            margin: '5px', 
            fontSize: '1.6rem', 
            }}>
            <div style={{overflowWrap: 'break-word', margin: '0 10px'}}>{item.content}</div>
            <button style={{color: '#ffffcc', backgroundColor: '#0080ff', fontWeight: 'bold', height: '2.5rem', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={checkOff}>&#10003;</button>
            <button style={{color: '#ffffcc', backgroundColor: '#FF3333', fontWeight: 'bold', height: '2.5rem', marginLeft: '10px', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={updateList} >X</button>
        </li>
    );
}

export default ListItem;