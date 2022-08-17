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
import MicroPlanesPage from './pages/MicroPlanesPage';

//Probando context below
import { DataProvider } from "./context/DataContext";
import MicroPlanPage from './pages/MicroPlanPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
import NoAutorizadoPage from './pages/NoAutorizadoPage';

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
    <DataProvider>
      <div className="fondo">
        <BrowserRouter >
          <Drawer showMenu={true} token={token} />
          <Routes >
            <Route path="/" element={<h1>Logeado</h1>} />

            {token.permisos.includes("gestion-clientes") && <Route path="/clientes" element={<ClientsPage />} />}
            {token.permisos.includes("gestion-clientes") && <Route path="/clientes/:clienteId" element={<ClientPage />} />}
            {token.permisos.includes("gestion-planes") && <Route path="/planes" element={<UnderConstructionPage title='Gestion de planes'/>} />}
            {token.permisos.includes("gestion-micro-planes") && <Route path="/micro-planes" element={<MicroPlanesPage/>} />}
            {token.permisos.includes("gestion-micro-planes") && <Route path="/micro-planes/:idMicroPlan" element={<MicroPlanPage/>} />}
            {token.permisos.includes("mis-planes") && <Route path="/mis-planes" element={<UnderConstructionPage title='Mis planes'/>} />}

            <Route path="/*" element={<NoAutorizadoPage/>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </DataProvider>
  );
}

export default App;
