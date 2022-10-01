import React from 'react';

import "./Label.css";

const Label = props => {

    let element;

    if (props.text === "green") {
        element = 
            <div className="label green-bg">
                <p>Green</p>
            </div>
    } else if (props.text === "yellow") {
        element = 
            <div className="label yellow-bg">
                <p>Yellow</p>
            </div>
    } else {
        element = 
            <div className="label grey-bg">
                <p>Grey</p>
            </div>
    }

    return (
        <React.Fragment>
            {element}
        </React.Fragment>
    );
}

export default Label;