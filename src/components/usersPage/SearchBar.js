import { React, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar(props) {
    const [valueToSearch, setValueToSearch] = useState("");

    const handleValueToSearchChange = (e) => {
        setValueToSearch(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        props.searchUsuarios(valueToSearch);
    };
    return (
        <Paper
            component="form"
            onSubmit={onSubmit}

            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                inputProps={{ "aria-label": "Ingrese su busqueda" }}
                placeholder="Ingrese su busqueda"
                id="inputSearchUsuarios"
                name="inputSearch"
                value={valueToSearch}
                onChange={handleValueToSearchChange}
            />
            <IconButton
                id="buttonSearchClientes"
                type="submit"
                sx={{ p: "10px" }}

                aria-label="Buscar"
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}