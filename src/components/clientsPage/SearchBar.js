import { React, useState }  from 'react';
// import { useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import ClientsService from '../../services/clients.service';

function SearchBar(props) {

    // const navigate = useNavigate()
    const [valueToSearch, setValueToSearch] = useState('');
    const handleValueToSearchChange = (e) => {
        setValueToSearch(e.target.value)
    }

    /*
    const handleSearchButtonClick = async () => {
        try {
            await ClientsService.getClient().then(
                (response) => {
                    const arr = []
                    arr.push(response)
                    props.setClientes(arr)
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
    */

const onSubmit = async (e) => {
    e.preventDefault()
    try {
        await ClientsService
        .getClients(valueToSearch)
        .then(
            (response) => {
                props.setClientes(response)
            }
        )
    } catch (err) {
        console.log(err)
    }
}

    return (
        <Paper
            component="form"
            onSubmit={onSubmit}
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