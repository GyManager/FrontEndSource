import { Link, Paper, Typography } from "@mui/material";

export default function GraficoContainer(props) {
    return (
        <Paper sx={ props.containerSxOverride? {...props.containerSxOverride} : { minHeight: "35vh", height: { xs: "50vh", md: "35vh" }, mt: 1, p: 1 }}>
            {!props.hideTitle && (
                <Typography variant="h6" align="center">
                    {props.link ? <Link href={props.link}>{props.title}</Link> : props.title}
                </Typography>
            )}
            {props.children}
        </Paper>
    );
}
