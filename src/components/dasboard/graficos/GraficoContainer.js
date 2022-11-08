import { Box, Paper, Typography } from "@mui/material";

export default function GraficoContainer(props) {
    return (
        <Box sx={{ minHeight: "100%", height: "100%", maxWidth: { lg: "33%" } }}>
            <Paper sx={{ p: 2, m: 2 }}>
                <Typography variant="h6" align="center">
                    {props.title}
                </Typography>
                <Box>{props.children}</Box>
            </Paper>
        </Box>
    );
}
