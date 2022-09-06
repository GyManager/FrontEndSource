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
import EjerciciosPage from './components/ejerciciosPage/EjerciciosPage'
import UnEjercicioPage from './pages/UnEjercicioPage';
import MicroPlanesPage from './pages/MicroPlanesPage';

//Probando context below
import { DataProvider } from "./context/DataContext";
import MicroPlanPage from './pages/MicroPlanPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
import NoAutorizadoPage from './pages/NoAutorizadoPage';
import PlanPage from './pages/PlanPage';
import SnackbarSystem from './components/reusable/SnackbarSystem';
import { SnackbarProvider } from './context/SnackbarContext';
import ErrorModalSystem from './components/reusable/ErrorModalSystem';
import { ErrorProvider } from './context/ErrorContext';
import gymanagerTheme from './GymanagerTheme';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {

  const token = AuthService.getStoredSession();

  const theme = createTheme(gymanagerTheme);

  if (!token) {
    return (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <ErrorProvider>
          <SnackbarProvider>
            <div className="fondo">
              <BrowserRouter >
                <Drawer showMenu={true} token={token} />
                <Routes >
                  <Route path="/" element={<h1>Logeado</h1>} />

                  {token.permisos.includes("gestion-clientes") && <Route path="/clientes" element={<ClientsPage />} />}
                  {token.permisos.includes("gestion-clientes") && <Route path="/clientes/:clienteId" element={<ClientPage />} />}
                  {token.permisos.includes("gestion-planes") && <Route path="/clientes/:clienteId/planes/:idPlan" element={<PlanPage />} />}
                  {token.permisos.includes("gestion-micro-planes") && <Route path="/micro-planes" element={<MicroPlanesPage/>} />}
                  {token.permisos.includes("gestion-micro-planes") && <Route path="/micro-planes/:idMicroPlan" element={<MicroPlanPage/>} />}
                  {token.permisos.includes("mis-planes") && <Route path="/mis-planes" element={<UnderConstructionPage title='Mis planes'/>} />}
                  {token.permisos.includes("gestion-ejercicios") && <Route path="/ejercicios" element={<EjerciciosPage/>} />}
                  {token.permisos.includes("gestion-ejercicios") && <Route path="/ejercicios/:idEjercicio" element={<UnEjercicioPage/>} />}

                  <Route path="/*" element={<NoAutorizadoPage/>} />
                </Routes>
                <Footer />
              </BrowserRouter>
              <SnackbarSystem/>
              <ErrorModalSystem/>
            </div>
          </SnackbarProvider>
        </ErrorProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
