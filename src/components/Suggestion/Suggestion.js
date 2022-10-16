import React from 'react';

import './Suggestion.css';

const Suggestion = props => {

    return (
        <React.Fragment>
            <div className='box'>
                {props.words.map((word, index) => {
                    return (
                        <div key={index} className='box-item'>
                            <div className='box-text'>
                                {word}
                            </div>
                        </div>);
                })}
            </div>
        </React.Fragment>
    );
};

export default Suggestion;