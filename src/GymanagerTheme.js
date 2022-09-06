/*
//Opcion 1 -- Imagen 1 -- transparencia 8
const theme = createTheme({
  palette: {
    primary: {
      main: '#106373',
    },
    secondary: {
      main: '#7d7c7c ', 
    },
	error: {
      main: '#a55363',
    },
	success: {
      main: '#106373',
    }
  },
  
});
*/

//Opcion 2  -- IMAGEN2 -- transparencia d
const gymanagerTheme = {
    palette: {
        primary: {
            main: "#BA00BA",
        },
        secondary: {
            main: "#606060",
        },
        navbar: {
            main: "#202020",
        },
        error: {
            main: "#d32f2f",
        },
        success: {
            main: "#2e7d32",
        },
        info: {
            main: "#0288d1",
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFE",
                },
            },
        },
    },
};

export default gymanagerTheme;
