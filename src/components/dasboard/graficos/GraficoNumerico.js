import { Avatar, Skeleton, Typography } from "@mui/material";
import GraficoContainer from "./GraficoContainer";

export default function GraficoNumerico(props) {
    return (
        <GraficoContainer
            title={props.title}
            maxWidth={props.maxWidth}
            link={props.link}
            containerSxOverride={props.containerSxOverride}
        >
            {props.loading ? (
                <Skeleton variant="circular" />
            ) : (
                <Avatar
                    sx={{
                        bgcolor: "rgba(54, 162, 235, 0.8)",
                        width: { xs: "30vh", md: "15vh" },
                        height: { xs: "30vh", md: "15vh" },
                        m: "auto",
                        my: "5vh",
                    }}
                >
                    <Typography variant="h3">{props.data}</Typography>
                </Avatar>
            )}
        </GraficoContainer>
    );
}
