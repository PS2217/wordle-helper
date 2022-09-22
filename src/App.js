import React, { useReducer } from 'react';
import './App.css';

import Header from './components/Header/Header';
import Input from './components/Input/Input';
import Label from './components/Label/Label';
import { validate } from './util/validateInputs';

const initialInputValues = {
    green1: "",
    green2: "",
    green3: "",
    green4: "",
    green5: "",
    yellow: "",
    grey: "",
};

const inputReducer = (state, action) => {
    switch (action.type) {
        case "G1":
            return {
                ...state,
                green1: action.val
            };
        case "G2":
            return {
                ...state,
                green2: action.val
            };
        case "G3":
            return {
                ...state,
                green3: action.val
            };
        case "G4":
            return {
                ...state,
                green4: action.val
            };
        case "G5":
            return {
                ...state,
                green5: action.val
            };
        case "Yellow":
            return {
                ...state,
                yellow: action.val
            };
        case "Grey":
            return {
                ...state,
                grey: action.val
            };
        default:
            return state;
    }
};

function App() {
    const [inputState, dispatch] = useReducer(inputReducer, initialInputValues);

    const g1Handler = (value) => {
        dispatch({ type: "G1", val: validate(inputState, "Green", value) });
    };

    const g2Handler = (value) => {
        dispatch({ type: "G2", val: validate(inputState, "Green", value) });
    };

    const g3Handler = (value) => {
        dispatch({ type: "G3", val: validate(inputState, "Green", value) });
    };

    const g4Handler = (value) => {
        dispatch({ type: "G4", val: validate(inputState, "Green", value) });
    };

    const g5Handler = (value) => {
        dispatch({ type: "G5", val: validate(inputState, "Green", value) });
    };

    const yellowHandler = (value, isDelete) => {
        if (isDelete) {
            dispatch({ type: "Yellow", val: value });
        } else {
            dispatch({ type: "Yellow", val: validate(inputState, "Yellow", value) });
        }
    };

    const greyHandler = (value, isDelete) => {
        if (isDelete) {
            dispatch({ type: "Grey", val: value });
        } else {
            dispatch({ type: "Grey", val: validate(inputState, "Grey", value) });
        }
    };

    return (
        <React.Fragment>
            <Header />
            <div className = "green-letters">
                <Label text="green" />
                <Input
                    element = "ShortInput"
                    id = "green1"
                    value={inputState.green1}
                    inputHandler={g1Handler}
                />
                <Input
                    element = "ShortInput"
                    id = "green2"
                    value={inputState.green2}
                    inputHandler={g2Handler}
                />
                <Input
                    element = "ShortInput"
                    id = "green3"
                    value={inputState.green3}
                    inputHandler={g3Handler}
                />
                <Input
                    element = "ShortInput"
                    id = "green4"
                    value={inputState.green4}
                    inputHandler={g4Handler}
                />
                <Input
                    element = "ShortInput"
                    id = "green5"
                    value={inputState.green5}
                    inputHandler={g5Handler}
                />
            </div>
            <div className = "yellow-letters">
                <Label text="yellow" />
                <Input
                    element = "LongInput"
                    id = "yellow"
                    value={inputState.yellow}
                    inputHandler={yellowHandler}
                    max="5"
                />
            </div>
            <div className="grey-letters">
                <Label text="grey" />
                <Input
                    element = "LongInput"
                    id = "grey"
                    value={inputState.grey}
                    inputHandler={greyHandler}
                    max="26"
                />
            </div>
        </React.Fragment>
    );
}

export default App;
