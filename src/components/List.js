import React, {useState} from 'react';

const List = ({list}) => {
    let list2 = [...list];
    const [style1, setStyle1] = useState({color: 'green'});
    const [style2, setStyle2] = useState({color: 'black'})


    //use map to map an array of all the list items.
    //this items will be stored in an array in state.

    //also need keys/ids for items

    // make two styles, one state for each, so that you can switch the styling when button is clicked. WON'T WORK.
    // use a similar idea somehow to update the array when the complete button is clicked.
    const renderedList = list.map(
        (item) => {
            return (
                <div style={style1}>{item} <button>&#10003;</button></div>
            );
        });
    
    return (
        <div style={{textAlign: 'center'}}>
            <div style={{margin: '40px'}}>
                {renderedList}
            </div>
            <div>
                <br></br>
                <button>Clear Checked Items</button>
            </div>
        </div>
    );
}

export default List;