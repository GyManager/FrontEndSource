import { Avatar, Skeleton, Stack, Typography } from "@mui/material";
import GraficoContainer from "./GraficoContainer";

export default function GraficoNumerico(props) {
    return (
        <GraficoContainer title={props.title} maxWidth={props.maxWidth}>
            <Stack alignItems="center" sx={{ minHeight: "100%", height: "100%", py: 8.9 }}>
                {props.loading ? (
                    <Skeleton variant="circular" height={145} width={145}/>
                ) : (
                    <Avatar sx={{ bgcolor: "rgba(54, 162, 235, 0.8)", width: 150, height: 150 }}>
                        <Typography variant="h3">{props.data}</Typography>
                    </Avatar>
                )}
            </Stack>
        </GraficoContainer>
    );
}
