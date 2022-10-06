import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import _ from "lodash";

export default function ActionAreaCard(props) {


    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.87)',
          boxShadow: theme.shadows[1],
          fontSize: 11,
        },
      }));



    const cardMediumStyle = {
        width: "80vw",
    };

    return (
        <LightTooltip title={_.capitalize(props.description)}>
        <Card
            sx={{ minWidth: 250, maxWidth: 300, margin: "0.5vw", backgroundColor: "white" }}
            variant="outlined"
        >
            <CardActionArea>
                {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
                <Stack direction={props.isMediumDevice ? "row" : "column"} alignItems="center">
                    {props.children}
                    
                        <Typography gutterBottom variant="h6" component="div" color="black">
                            {_.startCase(props.title)}
                        </Typography>
                   
                </Stack>
            </CardActionArea>
        </Card>
        </LightTooltip>
    );
}
