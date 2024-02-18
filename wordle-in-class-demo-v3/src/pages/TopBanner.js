import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

import dimensions from "../utils/dimensions";

const TopBanner = props => {

    const title = props.title;

    return (
        <Box sx={{
            height: dimensions.topBannerHeight,
            width: "100%",
            textEmphasis: "bold",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "eggshell"
        }}>
            <Typography variant="h2">
                { title }
            </Typography>
        </Box>
    )
};

export default TopBanner;