import React, { useReducer } from 'react';
import './App.css';

import Header from './components/Header/Header';
import Input from './components/Input/Input';
import Label from './components/Label/Label';

function App() {
    // use reducer hook


  return (
    <React.Fragment>
        <Header />
        <div className = "green-letters">
            <Label text="green" />
            <Input
                element = "ShortInput"
                id = "green1"
            />
            <Input
                element = "ShortInput"
                id = "green2"
            />
            <Input
                element = "ShortInput"
                id = "green3"
            />
            <Input
                element = "ShortInput"
                id = "green4"
            />
            <Input
                element = "ShortInput"
                id = "green5"
            />
        </div>
        <div className = "yellow-letters">
            <Label text="yellow" />
            <Input
                element = "LongInput"
                id = "yellow"
            />
        </div>
        <div className="grey-letters">
            <Label text="grey" />
            <Input
                element = "LongInput"
                id = "grey"
            />
        </div>
    </React.Fragment>
  );
}

export default App;
