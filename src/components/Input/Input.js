import React, { useState } from 'react';

import './Input.css';

const ShortInput = props => {
    
    const [lastCur, setlastCur] = useState(0);

    const changeHandler = (e) => {
        if (e.keyCode === 8) {
            e.target.value = e.target.value.slice(0,lastCur) + e.target.value.slice(lastCur+1);
            props.inputHandler(e.target.value, true);
        } else {
            setlastCur(e.target.selectionStart);
            props.inputHandler(e.target.value.replace(/[^A-Za-z]/, '').toUpperCase(), false);
        }
    }

    const element =
        props.element === "ShortInput" ? (
            <input
                className = {`short-input ${props.value !== "" && "short-input_value"}`}
                id = {props.id}
                type = "text"
                maxLength = "1"
                onChange = {changeHandler}
                onKeyUp={changeHandler}
                value = {props.value}
            />
        ) : (
            <input
                className = "long-input"
                id = {props.id}
                type = "text"
                maxLength={props.max}
                onChange = {changeHandler}
                onKeyUp={changeHandler}
                value = {props.value}
            />
        );

    return (
        <React.Fragment>
            {element}
        </React.Fragment>
    );
};

export default ShortInput;