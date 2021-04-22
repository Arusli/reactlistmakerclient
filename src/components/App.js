import React from 'react';
import Input from './Input';

//an advanced version of this app could take a google sign in
//and save/remember individuals lists in the database.

const App = () => {
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1 style={{marginBottom: '0px'}}>Listmaker</h1>
            <h5 style={{marginTop: '0px'}}>Built with react/node/sql.</h5>
            <Input />
        </div>
    );
        
}

export default App;