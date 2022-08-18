import { Add } from "@mui/icons-material";
import { Box, Button, Fab } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";


export default function ButtonToFabCrear(props){

    const navigate = useNavigate();

    return (
        <Fragment>
            <Button
                sx={{display: { xs: 'none', md: 'inline-flex' }}}
                variant='contained'
                startIcon={<Add/>}
                size='medium'
                onClick={() => navigate(props.url)}
            >
                {props.label}
            </Button>
            <Box
                sx={{
                    display: { xs: 'block', md: 'none'}, 
                    position: 'fixed',
                    right: '4vw',
                    bottom: '4vh'
                }}
            >
                <Fab color='primary' aria-label='add' onClick={() => navigate(props.url)}>
                    <Add/>
                </Fab>
            </Box>
        </Fragment>
    )
}