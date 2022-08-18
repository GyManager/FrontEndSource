import React from 'react'

import { Container } from '@mui/material/';

import MicroPlanes from '../components/microPlanes/MicroPlanes';


export default function MicroPlanesPage() {
    return (
        <Container maxWidth='false' disableGutters sx={{py:{xs:0, sm:1}, px:{xs:0.1, sm:1, md:3, lg:5}}}>
            <MicroPlanes/>
        </Container>
    )
}
