import React from 'react';
import Input from './Input';
import List from './List';

//an advanced version of this app could take a google sign in
//and save/remember individuals lists in the database.

const App = () => {
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1>To Do List</h1>
            <Input />
        </div>
    );
        
}

export default App;