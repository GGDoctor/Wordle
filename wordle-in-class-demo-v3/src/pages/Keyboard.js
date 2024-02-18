import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import { Grid} from "@mui/material";


import dimensions from "../utils/dimensions";
import boxStyles from '../utils/boxesAndTheirAttributes';

const {keyboardBoxSizes, keyboardRowsHGap} = dimensions;


const KeyboardLetterBox = (props) => {

    const {keyAttributes} = props;

    // console.log(`keyboardBoxSizes ${JSON.stringify(keyAttributes)}`);

    return (
        <Box sx={{
            ...keyboardBoxSizes,
            border: 1,
            ...keyAttributes
        }}>
            {keyAttributes.letter}
        </Box>
    )
}

const Keyboard = (props) => {

    const {keyboard, onClickCallback} = props;
    const {demoNumKeys} = props;
    const {backgroundColor} = props;

    return (
        <Fragment>
            <Grid  container columns={9.9993}  // hard-coded value -- this is the number of demo keys
                   sx={{
                       width: (demoNumKeys * keyboardBoxSizes.width) + (demoNumKeys ) * (keyboardRowsHGap - 400),
                       height: dimensions.keyboardHeight,
                       textAlign : "center",
                       alignItems : "center",
                       justifyContent : "center",
                       margin : "auto",
                       border : 2,
                       m : .75,
                       padding : .5
                   }}
            >
                {
                    keyboard.map((keyAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                              fontSize={45}
                              onClick={() => onClickCallback(keyAttributes)}
                        >
                            <KeyboardLetterBox keyAttributes={keyAttributes}/>
                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default Keyboard;