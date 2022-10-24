import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import _ from "lodash";

export default function ActionAreaCard(props) {
    const navigate = useNavigate();
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: "rgba(0, 0, 0, 0.87)",
            boxShadow: theme.shadows[1],
            fontSize: 11,
        },
    }));
    const handleClick = () => {
        if (props.title === "Mi Matricula") {
            props.handleClickOpen()
        } else {
            navigate(props.url);
        }
    };

    return (
        <LightTooltip title={_.capitalize(props.description)}>
            <Card
                sx={{
                    width: props.isMediumDevice ? "80vw" : 200,
                    maxWidth: "400px",
                    margin: "1vw",
                    p: "15px",
                    backgroundColor: "white",
                }}
                variant="outlined"
                onClick={handleClick}
            >
                <CardActionArea>
                    <Stack direction={props.isMediumDevice ? "row" : "column"} alignItems="center">
                        {props.children}
                        <Typography gutterBottom variant="h6" component="div" color="black">
                            {_.startCase(props.title)}
                        </Typography>
                    </Stack>
                    <Typography gutterBottom variant="caption" component="div" color="black">
                        {_.capitalize(props.description)}
                    </Typography>
                </CardActionArea>
            </Card>
        </LightTooltip>
    );
}
