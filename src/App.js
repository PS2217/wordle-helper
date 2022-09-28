import React, { useReducer } from 'react';
import './App.css';

import Header from './components/Header/Header';
import Input from './components/Input/Input';
import Label from './components/Label/Label';
import Button from './components/Button/Button';
import { validate } from './util/validateInputs';
import { words } from './words';

const initialInputValues = {
    green1: "",
    green2: "",
    green3: "",
    green4: "",
    green5: "",
    yellow: "",
    grey: "",
};

const inputReducer = (state, action) => ({ ...state, [action.type]: action.val });

function App() {

    const [inputState, dispatch] = useReducer(inputReducer, initialInputValues);

    const greenHandler = (index, value) => dispatch({ type: `green${index}`, val: validate(inputState, "green", value)});

    const YGHandler = (color, value, isDelete) => {
        if (isDelete) {
            dispatch({ type: color, val: value });
        } else {
            dispatch({ type: color, val: validate(inputState, color, value) });
        }
    };

    const suggestButtonHandler = () => {
        // filter words here

    }

    const resetButtonHandler = () => {
        for(let key in initialInputValues) {
            dispatch({type: key, val: initialInputValues[key]});
        }
    }

    return (
        <React.Fragment>
            <Header />
            <div className = "green-letters">
                <Label text="green" />
                {Array.from({length: 5}).map((_ , i) => {
                    const index = `green${i+1}`
                    return <Input 
                        key = {i}
                        element = "ShortInput"
                        id = {index}
                        value = {inputState[index]}
                        inputHandler = {(value) => greenHandler(i + 1, value)}
                    />;
                })}

                
            </div>
            <div className = "yellow-letters">
                <Label text="yellow" />
                <Input
                    element = "LongInput"
                    id = "yellow"
                    value={inputState.yellow}
                    inputHandler={(value, isDelete) => YGHandler("yellow", value, isDelete)}
                    max="5"
                />
            </div>
            <div className="grey-letters">
                <Label text="grey" />
                <Input
                    element = "LongInput"
                    id = "grey"
                    value={inputState.grey}
                    inputHandler={(value, isDelete) => YGHandler("grey", value, isDelete)}
                    max="26"
                />
            </div>
            
            <div className='button-container'>
                <Button name="Suggest" class="green-bg" buttonHandler={suggestButtonHandler} />
                <Button name="Reset" class="yellow-bg" buttonHandler={resetButtonHandler} />
            </div>
            
        </React.Fragment>
    );
}

export default App;
