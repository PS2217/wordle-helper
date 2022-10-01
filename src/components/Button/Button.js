import React from 'react';

import './Button.css';

const Button = props => {
    
    return (
        <React.Fragment>
            <button className={`${props.class} button`} onClick={props.buttonHandler}>
                {props.name}
            </button>
        </React.Fragment>
    );
};

export default Button;