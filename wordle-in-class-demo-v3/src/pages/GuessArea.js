import {Fragment} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import boxStyleVariants from "../utils/boxesAndTheirAttributes";

import dimensions from "../utils/dimensions";

const GuessBox = (props) => {
    // console.log(props);
    const {backgroundColor} = props.cellContent;

    return (
        <Box
            sx={{
                width: dimensions.guessArea.widthOfLetterBox,
                height: dimensions.guessArea.heightOfLetterBox,
                backgroundColor: backgroundColor,
                m: 0.4,
                padding: 0
            }}
        >
            {props.cellContent.letter}

        </Box>
    )
}
const GuessArea = (props) => {
    // console.log(props);
    const allRows = props.allRows;
    const {BRC} = props; //This holds green but we cant update the color for some reason?
    return (
        <Fragment>

            <Box sx={{
                height: dimensions.guessAreaHeight,
                width: "100%",    // sets the stage for centering the grid in the container of this component
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}>
            <Grid container columns={dimensions.guessArea.numColumns}
                  sx={{
                      height: dimensions.guessAreaHeight,
                      width: dimensions.guessAreaWidth,
                  }}
            >
                {
                    allRows.map((boxAttributes, idx) =>
                        <Grid item xs={1}
                              key={idx}
                              sx={{margin: 0, padding: 0}}
                              fontSize={45}
                        >
                            <GuessBox cellContent={boxAttributes} />
                        </Grid>
                    )
                }
            </Grid>
            </Box>
        </Fragment>
    )
};

export default GuessArea;