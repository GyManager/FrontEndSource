import React from 'react';
import { useState } from 'react';


import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


function SearchBar(props) {
    



    return (
        <Paper
            component="form"
            onSubmit={props.onClickSearchButton}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                inputProps={{ 'aria-label': 'search google maps' }}
                placeholder='Ingrese su busqueda'
                autoFocus={true}
                id='inputSearch'
                name='inputSearch'
                value={props.stateSearch}
                onChange={props.onChangeSearch}
            />
            <IconButton 
            type="submit" 
            sx={{ p: '10px' }} 
            aria-label="search"
            >
                <SearchIcon />
            </IconButton>

        </Paper>
    );

}

export default SearchBar