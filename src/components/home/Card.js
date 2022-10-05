import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { Newspaper } from "@mui/icons-material";
import _ from "lodash";

export default function ActionAreaCard(props) {
    const cardMediumStyle = {
        width: "80vw",
    };

    return (
        <Card
            sx={{ minWidth: 250, maxWidth: 300, margin: "1vw", backgroundColor: "white" }}
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
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" color="black">
                            {_.startCase(props.title)}
                        </Typography>
                        <Typography variant="body3" color="black">
                            {_.capitalize(props.description)}
                        </Typography>
                    </CardContent>
                </Stack>
            </CardActionArea>
        </Card>
    );
}
