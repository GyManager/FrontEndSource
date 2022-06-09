import './App.css';

import AppBar from './components/Appbar'
import Login from './pages/LoginPage'
import Footer from './components/Footer';


function App() {
  return (
    <div className="App" >
        <AppBar />
        <Login />
        <Footer sx={{display: {xs:'none', sm:'none', md:'block'}}}/>
    </div>
  );
}

export default App;
