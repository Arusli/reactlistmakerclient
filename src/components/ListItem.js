import React, {useState} from 'react';
// import _ from 'lodash';  //remove lodash from npm possibly?


const ListItem = ({item, list, setList, isLoggedIn, setIsLoggedIn, userId, setUserId, makeDeleteRequest}) => {

    console.log('ListItem Component Renders');
    const [itemClass, setItemClass] = useState('add');
    // const [height, setHeight] = useState('100%'); //this didn't work, not sure why. 
    const [display, setDisplay] = useState('grid');

    //styling states
    const [coloring, setColoring] = useState('rgba(255, 255, 204, 1)');
    const [bgColoring, setBgColoring] = useState('rgba(60, 60, 60, 1)');
    const [textDec, setTextDec] = useState('none');
    // const [opacity, setOpacity] = useState('1');
    const [checked, setChecked] = useState(false);


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
        setItemClass('drop');
        setTimeout(()=>setDisplay('none'), 190);
        console.log('item:',item);
        makeDeleteRequest(item);
    };
    

    return (
        // contains one list item each
        <li 
        className={itemClass}
        style={{
            display: display,
            width: '100%', 
            height: '100%',
            padding: '10px 10px', 
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