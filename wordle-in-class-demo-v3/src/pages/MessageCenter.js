import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

import dimensions from "../utils/dimensions";
const MessageCenter = props => {
    //console.log(props);
    return (
        <Box sx={{
            width: "100%",
            height: dimensions.messageCenterHeight,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography variant="h3">
                {props.Message}
            </Typography>
        </Box>
    )
};

export default MessageCenter;