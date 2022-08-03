import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom'

export default function Breadcumbs(props) {

    const navigate = useNavigate()

    const handleClick = (e, index) => {
        e.preventDefault();
        const url = props.urls[index]
        navigate(url)
    }

    const ultimo = props.names.length - 1
    const breadcrumbs =
        props.names.map((name, index) => (

            index !== ultimo
                ?
                <Link underline="hover" key={index} color="inherit" href={props.urls[index]} onClick={() => handleClick(index)}>
                    {name}
                </Link>
                :
                <Typography key={index} color="text.primary">
                    {name}
                </Typography>
        )
        )

    return (
        <Stack spacing={2}
        >
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
/* 
// Copiar para implementar
// Recibe los nombres a mostrar y los url a redireccionar. El ultimo nombre es
// la pagina actual por lo que no recibe url

<Breadcumbs
                names={['Clientes', 'Cliente']}
                urls={['../clientes/']}
            />

*/