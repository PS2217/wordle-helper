import React, { useReducer, useState, useCallback } from 'react';
import './App.css';

import backButton from './back-button.png';

import Header from './components/Header/Header';
import Input from './components/Input/Input';
import Label from './components/Label/Label';
import Button from './components/Button/Button';
import Suggestion from './components/Suggestion/Suggestion';
import InstructionManual from './components/Manual/InstructionManual';

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

    const [currentWords, setCurrentWords] = useState(words);
    
    const [displayManual, setDisplayManual] = useState(false)

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
            // console.log("special: ", regexPattern);
        } else {
            for(let i = 1; i < 6; i++) {
                const key = `green${i}`;
                if (inputState[key]) {
                    regexPattern += inputState[key];
                } else {
                    regexPattern += yellowAndGreyRegEx(false);
                }
            }

            // console.log("regular: ", regexPattern);
        }

        let regEx = new RegExp(regexPattern, 'gi');

        let filteredWords = [];

        for(let i = 0; i < words.length; i++) {
            const found = words[i].match(regEx);
            if(found) {
                filteredWords.push(...found);
            }
        };

        // filter words according to yellow letters
        let advancedFilteredWords = [];
        let advancedRegexPattern = '';

        if (inputState.yellow) {
            for(let i = 1; i < 6; i++) {
                const key = `green${i}`;
                if (inputState[key]) {
                    advancedRegexPattern += inputState[key];
                } else {
                    advancedRegexPattern += '.';
                }
            }

            let yellowRegexPattern = '(';
            for(let i = 0; i < inputState.yellow.length; i++) {
                if (i === 0) {
                    yellowRegexPattern += inputState.yellow[i];
                } else {
                    yellowRegexPattern += "|" + inputState.yellow[i];
                }
            }
            yellowRegexPattern += ")";

            for(let i = 0; i < advancedRegexPattern.length; i++) {
                let tempRegexPattern = '';
                if (advancedRegexPattern[i] === '.') {
                    tempRegexPattern = advancedRegexPattern.slice(0,i) + yellowRegexPattern + advancedRegexPattern.slice(i+1);

                    let advancedRegEx = new RegExp(tempRegexPattern, 'gi');
                    for (let j = 0; j < filteredWords.length; j++) {
                        const found = filteredWords[j].match(advancedRegEx);
                        if (found) {
                            advancedFilteredWords.push(...found);
                        }
                    }
                }
            }
            advancedFilteredWords = [...new Set(advancedFilteredWords)];
        }



        if (advancedFilteredWords.length !== 0) {
            setCurrentWords(advancedFilteredWords);
        }
        else if(filteredWords.length !== 0) {
            setCurrentWords(filteredWords);
        }
    }

    const resetButtonHandler = () => {
        window.location.reload(false);
    }

    // to update current words when the components don't re-render
    const reRenderCurrentWords = useCallback(
        () => {
          setCurrentWords((prev) => [...prev]);
        },
        [],
      )
    
    function countVowels(word) {
        let vowels = 0;
        for (let letter of word) {
            if(letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u'){
                vowels++;
            }
        }
        return vowels;
    }

    function countDuplicates(word) {
        let duplicates = 1;

        let wordObj = {};

        for (let letter of word) {
            wordObj[letter] = (wordObj[letter] || 0) + 1;
            if (wordObj[letter] > duplicates) {
                duplicates = wordObj[letter];
            }
        }
        return (duplicates === 1 ? duplicates - 1 : duplicates);
    }

    const dropdownChangeHandler = (event) => {
        switch (event.target.value) {
            case '0':
                currentWords.sort((a,b) => a.localeCompare(b));
                reRenderCurrentWords();
                break;
            case '1':
                currentWords.sort((a,b) => b.localeCompare(a));
                reRenderCurrentWords();
                break;
            case '2':
                currentWords.sort(function(a,b){
                    if(countVowels(a) < countVowels(b)) {
                        return 1;
                    } else if(countVowels(a) > countVowels(b)) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                reRenderCurrentWords();
                break;
            case '3':
                currentWords.sort(function(a,b){
                    if(countVowels(a) > countVowels(b)) {
                        return 1;
                    } else if(countVowels(a) < countVowels(b)) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                reRenderCurrentWords();
                break;
            case '4':
                currentWords.sort(function(a,b) {
                    if (countDuplicates(a) < countDuplicates(b)) {
                        return -1;
                    } else if(countDuplicates(a) > countDuplicates(b)) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                reRenderCurrentWords();
                break;
            default:
                break;
        }
    };

    return (
        <React.Fragment>
            <Header />
            {!displayManual && 
            <React.Fragment>
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

            <div className='manual-container'>
                <p className='display-manual' onClick={function() {setDisplayManual(true)}}>How does this helper work?</p>
            </div>

            <div className="dropdown-container">
                <div className='custom-dropdown'>
                    <div className='word-list_info'>Suggestions ({currentWords.length} words)</div>
                    <select className='select-selected' onChange={dropdownChangeHandler} defaultValue="-1">
                        <option value='-1' disabled>Sort Options</option>
                        <option value='0' className='select-items'>Ascending</option>
                        <option value='1' className='select-items'>Descending</option>
                        <option value='2' className='select-items'>Most vowels</option>
                        <option value='3' className='select-items'>Most consonants</option>
                        <option value='4' className='select-items'>Unique letters</option>
                    </select>
                </div>
            </div>
            
            <div className='container'>
                <Suggestion words={currentWords} />
            </div>
            </React.Fragment>}
            {displayManual && 
            <React.Fragment>
                <img src={backButton} alt="back" id='back-button' onClick={function() {setDisplayManual(false)}} />
                <div className='container'>
                    <InstructionManual />
                </div>
            </React.Fragment>}
        </React.Fragment>
    );
}

export default App;
