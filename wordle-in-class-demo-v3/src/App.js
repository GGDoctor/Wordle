import {Fragment} from "react";
import {useState} from "react";
import Box from "@mui/material/Box";

import GuessArea from "./pages/GuessArea";
import TopBanner from "./pages/TopBanner";
import Keyboard from "./pages/Keyboard";
import MessageCenter from "./pages/MessageCenter";

import dimensions from "./utils/dimensions";
import fiveLetterWords from "./fiveLetterWords.json";
import boxStyles from "./utils/boxesAndTheirAttributes";

const {keyboardBoxSizes, keyboardRowsHGap} = dimensions;


/*
       This code is to read the JSON data and randomly choose a 5-letter word that will be used later.
*/
const jsonData = JSON.parse(JSON.stringify(fiveLetterWords));
const word = jsonData;
const randomNumber = Math.floor(Math.random() * word.length);
const randomWord = word[randomNumber];
//console.log(word);
console.log(randomWord); //Holds the word that was randomly chosen

function App() {

    //Put all the keys in a string to be split later.
    const demoKeys = 'QWERTYUIOPASDFGHJKLZXCVBNM', demoNumKeys = demoKeys.length;

    const initialKeyBoard = () => {
        let keys = demoKeys.split("").map(letter => ({...boxStyles.keyboardUnusedKey, letter: letter}))
        const backspaceKey = {
            ...boxStyles.keyboardUnusedKey, // you should probably create a new variant for backspace and enter keys
            width: keyboardBoxSizes.width + 2,
            letter: 'Del',
            fontSize: 35,
            isBackspaceKey: true
        }
        const enterKey = {
            ...boxStyles.keyboardUnusedKey,
            width: keyboardBoxSizes.width + 40,
            letter: 'Enter',
            fontSize: 40,
            isEnterKey: true
        }

        keys.unshift(backspaceKey);
        keys.push(enterKey);

        return keys;
    }

    const initActiveRow = () => {
        // Take a close look at how the element of the array are being initialized.
        // Each element is being given a pointer to boxStyles['blankBox'], which is an Object.
        // Therefore, if you were to make changes to any of the elements of the array
        // that is being built, the change will affect all elements. See the onClickCallback
        // function for more on this.
        return new Array(dimensions.guessArea.numColumns).fill(boxStyles['blankBox']);
    }
    const newMessage = (arg) => {return arg;}

    //Holds completed Rows
    const addComplete = arg => {return arg;}
    const [completedRows,setCompleted]= useState(addComplete([]));
    console.log(completedRows);
    //Holds active rows
    const [activeRow, setActiveRow] = useState(initActiveRow());
    //Holds active row index
    const [activeRowIdx, setActiveRowIdx] = useState(0);  // the index of the first letter that gets added to the active row.
    const [keyboard, setKeyboard] = useState(initialKeyBoard);


    const remainingRows = new Array(dimensions.guessArea.numColumns * dimensions.guessArea.numRows -
      completedRows.length - activeRow.length).fill(boxStyles.blankBox);

    const allRows = [...completedRows, ...activeRow, ...remainingRows];

    const [Message, setMessage] = useState(newMessage(''));
    const newBRC = (color) => {return color;}
    const [BRC, setBRC] = useState(newBRC("white"));
    const keyboardKeyPressedCallBack = (attrsOfKeyThatUserClicked) => {
        //console.log(`attributes of the key that was just clicked is ${JSON.stringify(attrsOfKeyThatUserClicked)}`);

        if(activeRowIdx === 0 && attrsOfKeyThatUserClicked.isBackspaceKey) {
            setMessage("");
            return; // activeRow is empty as such, there are no letters to erase.
        }
        if(attrsOfKeyThatUserClicked.isBackspaceKey) {
            const newActiveRow = activeRow.slice();
            newActiveRow[activeRowIdx - 1] = boxStyles.blankBox;
            setActiveRow(newActiveRow);
            setActiveRowIdx(activeRowIdx - 1);
            return;
        }
        if(activeRowIdx === dimensions.guessArea.numColumns && attrsOfKeyThatUserClicked.isEnterKey) {
            // evaluate user's work that is now in activeRow. The feedback boxes get
            // stored in a 5-element array and get pushed into the completedRows.
            // the activeRow gets reset to 5 blank boxes.
            // the number of elements in remainingRows gets reduced by 5.
            // if the remainingRows is empty, game is over. Display a message in the
            // message center.

            //Add chars to a string
            const charArray = activeRow.map(obj => obj.letter);
            const guess = charArray.join(''); //Join array to get word

            //Check if string is either the word or in the word list
            if (guess === randomWord.toUpperCase()){
                activeRow.forEach(obj =>{
                    const element = obj.element;
                })

                setMessage("You did it!");
                //Keep everything the same
                //Only update boxStyles for exact match
                const newActiveRow = activeRow.map((item, index) => {
                    return {
                            ...activeRow[index],
                            // if chars are in word then change background color
                            ...boxStyles.exactMatch,
                        };

                });
                setActiveRow(newActiveRow);
                return;
            }
            else if (word.includes((guess.toLowerCase()))){

                //console.log("broke here");
                const newActiveRow = [];

                for(let i = 0; i < charArray.length; i++){

                    //ERROR in this code. If you pass a double letter it marks both as in the word
                    if(randomWord.includes(charArray[i].toLowerCase())){  //If random word includes a letter
                        if(randomWord.indexOf(charArray[i])===i){//If the index matches with the guessword
                            newActiveRow.push({
                                ...activeRow[i],
                                ...boxStyles.exactMatch,
                            })
                        }else{ //Index does not match
                            newActiveRow.push({
                                ...activeRow[i],
                                ...boxStyles.partialMatch,
                            })
                        }
                    }else{ //Not in word
                        newActiveRow.push({
                            ...activeRow[i],
                            ...boxStyles.noMatch,
                        })
                    }

                }

                //Add this row to completed rows
                setCompleted(newActiveRow);

                //Clear the activeRow
                const resetActive = activeRow.map((item, index) => {
                    return {
                        ...activeRow[index].letter = '',
                        // if chars are in word then change background color
                        ...boxStyles.blankBox,
                    };

                });
                setActiveRow(resetActive);
                setActiveRowIdx(0);
            }
            else{
                setMessage("Word not in word list");
            }
            return;
        }

        if(attrsOfKeyThatUserClicked.isEnterKey) {
            // ignore the enter key as there are not enough letters in activeRow
            return;
        }

        if(activeRowIdx === dimensions.guessArea.numColumns) {
            // activeRow is already full.
            return;
        }

        const newActiveRow = activeRow.slice();
        newActiveRow[activeRowIdx] = {
            ...boxStyles.notEvaluated,
            letter: attrsOfKeyThatUserClicked.letter
        };
        setActiveRow(newActiveRow);
        setActiveRowIdx(activeRowIdx + 1);
        //console.log(JSON.stringify(activeRow));
    }


  return (
      <Fragment>
          <Box sx={{
              width: dimensions.width,
              height: dimensions.height,
              backgroundColor: "salmon",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "auto"
          }}>
            <TopBanner title="Wordle" />
            <GuessArea allRows={allRows}
                       backgroundColor = {BRC}
            />
            <MessageCenter Message = {Message}/>
            <Keyboard keyboard={keyboard}
                      demoNumKeys={demoNumKeys}
                      backgroundColor={BRC}
                      onClickCallback={keyboardKeyPressedCallBack} />
          </Box>
      </Fragment>

  );
}

export default App;
