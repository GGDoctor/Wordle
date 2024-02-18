
const guessArea = {
    widthOfLetterBox: 55,
    heightOfLetterBox: 55,
    numRows: 6,
    numColumns: 5,
    hGap: 10,
    vGap: 10
};


const topBannerHeight = 150;
const messageCenterHeight = 100;

const guessAreaWidth = guessArea.numColumns * guessArea.widthOfLetterBox +
    (guessArea.numColumns - 1) * guessArea.hGap;

const guessAreaHeight = guessArea.numRows * guessArea.heightOfLetterBox +
    (guessArea.numRows - 1) * guessArea.vGap;

const keyboardHeight = 200;

const keyboardBoxSizes = {
    width: 50,
    height: 55,
};

const keyboardRowsHGap = -5;


const dimensions = {
    width: 600,
    height: topBannerHeight + messageCenterHeight + guessAreaHeight + keyboardHeight,
    topBannerHeight: topBannerHeight,
    guessAreaHeight: guessAreaHeight,
    guessAreaWidth,
    keyboardHeight: keyboardHeight,
    messageCenterHeight: messageCenterHeight,
    guessArea,
    keyboardBoxSizes,
    keyboardRowsHGap
};

export default dimensions;