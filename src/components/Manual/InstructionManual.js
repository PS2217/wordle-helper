import React from 'react';

import './InstructionManual.css';

const InstructionManual = props => {
    return (
        <React.Fragment>
            <header className="header">
                 {/* <h1><span className="green">W</span>ordle <span className="yellow">H</span>elper</h1> */}
                 <h1>How It Works</h1>              
            </header>
            <div>   
                 <p>To use this helper, begin by selecting a word from the initial suggestions and then typing in the results from that word into the slots below.</p>
                 <p>Place the correct letters in their correct positions (Green),  any correct letters in the wrong place in the yellow textbox, and finally any incorrect letters in the grey textbox, then press suggest.</p>
                 <p>Repeat these steps with each guess as needed.</p>
                 <p>This will filter out the word list below to help you with more suggestions until the word can be found.</p>
                 <p>Use the sort options drop-down to view the word list in different formats, and the reset button to start again.</p>   
            </div>
        </React.Fragment>
    );
};

export default InstructionManual;