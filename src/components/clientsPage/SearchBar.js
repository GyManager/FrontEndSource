import { React, useState }  from 'react';
import { useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import ClientsService from '../../services/clients.service';

function SearchBar(props) {

    const navigate = useNavigate()
    const [valueToSearch, setValueToSearch] = useState('');
    const handleValueToSearchChange = (e) => {
        console.log('OnChange')
        setValueToSearch(e.target.value)
            console.log(e.target.value)
            console.log(e.target.name)
    }

    const handleSearchButtonClick = async (search) => {
        try {
            await ClientsService.getClient(search).then(
                (response) => {
                    const arr = []
                    arr.push(response)
                    console.log(arr)
                    setClientes(arr)
                },
                (error) => {
                    navigate('../login')
                    if (error.response.data.status === 401) {
                        console.log("Consolelog=401");
                    } else {
                        console.log(" Consolelog!=401");
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    };


    
    return (
        <Paper
            component="form"
            onSubmit={handleSearchButtonClick}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                inputProps={{ 'aria-label': 'search google maps' }}
                placeholder='Ingrese su busqueda'
                autoFocus={true}
                id='inputSearch'
                name='inputSearch'
                value={valueToSearch}
                onChange={handleValueToSearchChange}
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