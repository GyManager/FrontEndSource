import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Drawer from './components/drawer/Drawer'
import Footer from './components/Footer';

import Login from './pages/LoginPage'
import Acceso from './components/accesoOk'

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Drawer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Ok" element={<Acceso />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
