import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Drawer from './components/drawer/Drawer'
//  Cambiar nombre footer por footer2 y vice versa
import Footer from './components/Footer';

import { Navigate } from "react-router-dom";
import AuthService from './services/auth.service';
import LoginPage from './pages/LoginPage';
import ClientsPage from './pages/ClientsPage';
import ClientPage from './pages/ClientPage'


function App() {

  const token = AuthService.getStoredSession();

  if (!token) {
    return (
      <div className="fondo" >
        <BrowserRouter>
          <Drawer showMenu={false} />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }

  return (
    <div className="fondo">
      <BrowserRouter >
        <Drawer showMenu={true} token={token} />
        <Routes >
          <Route path="/" element={<h1>Logeado</h1>} />

          {token.permisos.includes("gestion-clientes") && <Route path="/clientes" element={<ClientsPage />} />}
          {token.permisos.includes("gestion-clientes") && <Route path="/clientes/:clienteId" element={<ClientPage />} />}
          {token.permisos.includes("gestion-planes") && <Route path="/planes" element={<h1>Gestion de planes</h1>} />}
          {token.permisos.includes("mis-planes") && <Route path="/mis-planes" element={<h1>Mis planes</h1>} />}

          <Route path="/*" element={<h1>Error no autorizado</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
