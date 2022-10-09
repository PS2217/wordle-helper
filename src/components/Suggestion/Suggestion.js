import React from 'react';
import allWords from "./words.js";
import './Suggestion.css';






const Suggestion = props => {

    let table1; 

            if (props.text === "suggestUI") {}
            table1 =
            <div className='wordsTable'>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                        {allWords.map((allWords) => (
                            <tr>
                            <td>
                              {allWords}
                            </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>


    return (
        <React.Fragment>

        {table1}


        </React.Fragment>
    );
};

export default Suggestion;