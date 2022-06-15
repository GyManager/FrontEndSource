import './App.css';

import Drawer from './components/Drawer'
import Login from './pages/LoginPage'
import Footer from './components/Footer';


function App() {
  return (
    <div className="App" >
        <Drawer />
        <Login />
        <Footer sx={{display: {xs:'none', sm:'none', md:'block'}}}/>
    </div>
  );
}

export default App;
