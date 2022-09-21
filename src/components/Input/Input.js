import React, { useState } from 'react';

import './Input.css';

const ShortInput = props => {

    const [inputValue, setInputValue] = useState("");

    const changeHandler = (e) => {
        setInputValue(e.target.value.toUpperCase());
    }

    const element =
        props.element === "ShortInput" ? (
            <input
                className = {`short-input ${inputValue !== "" && "short-input_value"}`}
                id = {props.id}
                type = "text"
                maxLength = "1"
                onChange = {changeHandler}
                value = {inputValue}
            />
        ) : (
            <input
                className = "long-input"
                id = {props.id}
                type = "text"
                onChange = {changeHandler}
                value = {inputValue}
            />
        );

    return (
        <React.Fragment>
            {element}
        </React.Fragment>
    );
};

export default ShortInput;