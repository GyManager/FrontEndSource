import React from 'react'
import { Container } from '@mui/material/';
import Plan from '../components/plan/Plan';
import { ParameterDropdownProvider } from '../context/ParameterDropdownContext';

export default function PlanPage() {
    return (
        <Container maxWidth='false' disableGutters sx={{py:{xs:0, sm:1}, px:{xs:0.1, sm:1, md:3, lg:5}}}>
            <ParameterDropdownProvider objetivo>
                <Plan/>
            </ParameterDropdownProvider>
        </Container>
    )
}
