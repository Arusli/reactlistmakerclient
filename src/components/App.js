import React from 'react';
import Input from './Input';

//an advanced version of this app could take a google sign in
//and save/remember individuals lists in the database.

const App = () => {
    
    return (
        <div style={{backgroundColor: 'beige', height: '98vh', margin: '20px', padding: '0px', display: 'flex', justifyContent: 'center', alignItems: 'start'}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50vw'}}>
                <h1 style={{marginBottom: '0px', marginTop: '5rem'}}>Listmaker</h1>
                <h5 style={{marginTop: '0px'}}>Built with react/node/sql.</h5>
                <Input />
            </div>
        </div>
    );
        
}

export default App;