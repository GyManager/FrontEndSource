import { Box, Link, Paper, Typography } from "@mui/material";

export default function GraficoContainer(props) {
    return (
        <Box sx={{ minHeight: "100%", height: "100%", width: { lg: props.maxWidth } }}>
            <Paper sx={{ p: 2, m: 2 }}>
                <Typography variant="h6" align="center">
                    {props.link ? <Link href={props.link}>{props.title}</Link> : props.title}
                </Typography>
                <Box>{props.children}</Box>
            </Paper>
        </Box>
    );
}
