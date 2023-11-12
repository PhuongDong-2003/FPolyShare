import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme";
import { ProgressCircle } from "./ProgressCircle";

export const StatItem = ({icon, title, subtitle, progress, increase}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <Box width="100%" m="0 30px">
            {/* ICON, TITLE & PROGRESS CIRCLE */}
            <Box display="flex" justifyContent="space-between">
                {/* ICON, TITLE */}
                <Box>
                    {icon}
                    <Typography variant="h4" fontWeight="bold" sx={{color:colors.grey[100]}}>
                        {title}
                    </Typography>
                </Box>
                {/* PROGRESS CIRCLE */}
                <Box>
                    <ProgressCircle progress={progress}/>
                </Box>
            </Box>
            {/* SUBTITLE & ICREASE */}
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h5" sx={{color:colors.greenAccent[500]}}>
                    {subtitle}
                </Typography>
                <Typography sx={{color: colors.greenAccent[600]}}>
                    {increase}
                </Typography>
            </Box>
        </Box>
    )
}