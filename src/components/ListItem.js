import React, {useState} from 'react';
// import _ from 'lodash';  //remove lodash from npm possibly?


const ListItem = ({item, list, setList, isLoggedIn, setIsLoggedIn, userId, setUserId, makeDeleteRequest}) => {

    console.log('ListItem Component Renders');
    //styling states
    const [coloring, setColoring] = useState('#ffffcc');
    // const [sizing, setSizing] = useState('2rem');
    const [checked, setChecked] = useState(false);

    const checkOff = (e) => {
        e.preventDefault();

        if (!checked) {
            setChecked(true);
            setColoring('grey');
            // setSizing('2rem');
        }

        if (checked) {
            setChecked(false);
            setColoring('#ffffcc');
            // setSizing('2rem');
        }
    };

    //passed in makeDeleteRequest as an prop from App.


    //UPDATE LIST TEST
     const updateList = async () => {
        console.log('item:',item);
        await makeDeleteRequest(item);
    };
    

    //add a <pre> tag around {item} if you want to preserve spaces
    return (
        // contains one list item each
        <div style={{display: 'grid', width: '100%', height: '100%', padding: '10px 10px', borderRadius: '10px', gridTemplateColumns: '60% 20% 20%', alignItems: 'center', color: coloring, backgroundColor: '#3C3C3C', margin: '5px', fontSize: '1.5rem', fontWeight: 'bold'}}>
            <div style={{overflowWrap: 'break-word'}}>{item.content}</div>
            <button style={{color: '#ffffcc', backgroundColor: '#0080ff', fontWeight: 'bold', height: '2.5rem', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={checkOff}>&#10003;</button>
            <button style={{color: '#ffffcc', backgroundColor: '#FF3333', fontWeight: 'bold', height: '2.5rem', marginLeft: '10px', cursor: 'pointer', borderRadius: '5px', borderStyle: 'none'}} onClick={updateList} >X</button>
        </div>
    );
}

export default ListItem;