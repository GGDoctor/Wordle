import {green, grey, orange} from '@mui/material/colors';

const boxStyleVariants = {
    exactMatch: {
        backgroundColor: green[400],
        color: grey[50],
        borderColor: green[400]
    },

    partialMatch: {
        backgroundColor: orange[200],
        color: grey[50],
        borderColor: orange[200]

    },

    noMatch: {
        backgroundColor: grey[500],
        color: grey[50],
        borderColor: grey[500]
    },

    blankBox: {
        backgroundColor: grey[100],
        color: grey[900],
        borderColor: grey[400]
    },

    notEvaluated: {
        backgroundColor: grey[50],
        color: grey[900],
        borderColor: grey[400]
    },

    keyboardUnusedKey: {
        backgroundColor: '#bfc1c2',
        color: grey[900],
        borderColor: grey['A100']
    }
};

export default boxStyleVariants;
