import './App.css';

import { ThemeProvider } from '@mui/material/styles/'
import themeConfig from "./themeConfig"

import NavBar from './components/Navbar'
import Login from './pages/LoginPage'
import BottomBar from './components/BottomBar';


function App() {
  return (
    <div className="App" >
      <ThemeProvider theme={themeConfig} >
        <NavBar />
        <Login />
        <BottomBar sx={{display: {xs:'none', sm:'none', md:'block'}}}/>
        </ThemeProvider>

    </div>
  );
}

export default App;
