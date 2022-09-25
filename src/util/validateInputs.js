export const validate = (state, target, value) => {
    const yellow = [...state.yellow];
    const grey = [...state.grey];
    const val = [...value];
    const lastChar = val[val.length-1];
    let yellowIdx;
    let greyIdx;
    switch(target) {
        case "green":
            yellowIdx = yellow.indexOf(value);
            if (yellowIdx !== -1) {
                yellow.splice(yellowIdx, 1);
                state.yellow = yellow.join("");
            }

            greyIdx = grey.indexOf(value);
            if (greyIdx !== -1) {
                grey.splice(greyIdx, 1);
                state.grey = grey.join("");
            }

            return value;
        // END CASE Green

        case "yellow":
            if(grey.includes(lastChar)) {
                return state.yellow;
            }

            return value;
        // END CASE YELLOW

        // can't input multiple letters in grey
        // validate with yellow and greens
        case "grey":
            if (yellow.includes(lastChar)) {
                return state.grey;
            } 
            else if (state.green1 === lastChar) {
                return state.grey;
            }
            else if (state.green2 === lastChar) {
                return state.grey;
            }
            else if (state.green3 === lastChar) {
                return state.grey;
            }
            else if (state.green4 === lastChar) {
                return state.grey;
            }
            else if (state.green5 === lastChar) {
                return state.grey;
            }

            // check duplicate letters
            else if (grey.includes(lastChar)) {
                return state.grey;
            }

            return value;
        // END CASE GREY

        default:
            return;
    }
}