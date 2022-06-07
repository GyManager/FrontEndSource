import './App.css';

import { ThemeProvider } from '@mui/material/styles/'
import themeConfig from "./themeConfig"

import NavBar from './components/Navbar'
import Login from './pages/LoginPage'


function App() {
  return (
    <div className="App" >
      <ThemeProvider theme={themeConfig} >
        <NavBar />
        <Login />
        </ThemeProvider>
    </div>
  );
}

export default App;
