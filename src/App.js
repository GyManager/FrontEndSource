import './App.css';

import { ThemeProvider } from '@mui/material/styles/'
import themeConfig from "./ThemeConfig"

import NavBar from './components/Appbar'
import Login from './pages/LoginPage'
import BottomBar from './components/Footer';


function App() {
  return (
    <div className="App" >
        <NavBar />
        <Login />
        <BottomBar sx={{display: {xs:'none', sm:'none', md:'block'}}}/>
    </div>
  );
}

export default App;
