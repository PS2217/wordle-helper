import React, { useReducer, useState } from 'react';
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

    const [currentWords, setCurrentWords] = useState([]);

    const greenHandler = (index, value) => dispatch({ type: `green${index}`, val: validate(inputState, "green", value)});

    const YGHandler = (color, value, isDelete) => {
        if (isDelete) {
            dispatch({ type: color, val: value });
        } else {
            dispatch({ type: color, val: validate(inputState, color, value) });
        }
    };

    function greyRegEx(includesDot) {
        let regexPattern = '';
        if (inputState.grey) {
            if (includesDot === false) {
                return "|[^" + inputState.grey + "]";
            }
            regexPattern += "[^" + inputState.grey + "]";
        } else {
            regexPattern += ".";
        }
        return regexPattern;
    }

    function yellowAndGreyRegEx(special) {
        let regexPattern = "";
        if(inputState.yellow) {
            regexPattern += "(";
            for(let i = 0; i < inputState.yellow.length; i++) {
                if (i === 0) {
                    regexPattern += inputState.yellow[i];
                } else {
                    regexPattern += "|" + inputState.yellow[i];
                }
            }
            if (!special) {
                regexPattern += greyRegEx(false);
            }
            regexPattern += ")";
        } else if (!special) {
            regexPattern += greyRegEx(true);
        }
        return regexPattern;
    }

    const suggestButtonHandler = () => {
        // filter words here

        let regexPattern = '';

        // check for special cases where there are altogether 5 letters combined in greens and yellow
        let specialRegexPattern = '';
        let greens = 0;

        for (let i = 1; i < 6; i++) {
            const key = `green${i}`;
            if (inputState[key]) {
                specialRegexPattern += inputState[key];
                greens++;
            } else {
                specialRegexPattern += yellowAndGreyRegEx(true);
            }
        }

        if (greens + inputState.yellow.length >= 5) {
            regexPattern = specialRegexPattern;
            console.log("special: ", regexPattern);
        } else {
            for(let i = 1; i < 6; i++) {
                const key = `green${i}`;
                if (inputState[key]) {
                    regexPattern += inputState[key];
                } else {
                    regexPattern += yellowAndGreyRegEx(false);
                }
            }

            console.log("regular: ", regexPattern);
        }

        let regEx = new RegExp(regexPattern, 'gi');

        let filteredWords = [];

        for(let i = 0; i < words.length; i++) {
            const found = words[i].match(regEx);
            if(found) {
                filteredWords.push(...found);
            }
        };

        if(filteredWords.length !== 0) {
            setCurrentWords(filteredWords);
        }

        console.log(currentWords);
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

            <p className='green'>
                {currentWords[0]}
            </p>
            
        </React.Fragment>
    );
}

export default App;
