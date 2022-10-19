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
import Ejercicios from './components/ejercicios/Ejercicios'
import EjercicioPage from './pages/EjercicioPage';
import MicroPlanesPage from './pages/MicroPlanesPage';
import UsersPage from './pages/UsersPage'
import UserPage from './pages/UserPage'
import Dash from './components/home/Dash'

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
import MisPlanes from './components/misPlanes/MisPlanes';
import { UserProvider } from './context/UserContext';
import MiPlan from './components/misPlanes/MiPlan';
import MiMicroPlan from './components/misPlanes/MiMicroPlan';
import MiRutina from './components/misPlanes/MiRutina';
import MiPlanContextLayout from './context/MiPlanContextLayout';
import PasswordChange from './components/password/PasswordChange';

function App() {

  const token = AuthService.getStoredSession();

  const theme = createTheme(gymanagerTheme);
console.log(token)
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
      <UserProvider>
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
                    {token.permisos.includes("mis-planes") && <Route path="/mis-planes" element={<MisPlanes/>} />}
                    <Route element={<MiPlanContextLayout />}>
                      {token.permisos.includes("mis-planes") && <Route path="/mis-planes/:idPlan" element={<MiPlan/>} />}
                      {token.permisos.includes("mis-planes") && <Route path="/mis-planes/:idPlan/micro-plan/:idMicroPlan" element={<MiMicroPlan/>} />}
                      {token.permisos.includes("mis-planes") && <Route path="/mis-planes/:idPlan/micro-plan/:idMicroPlan/rutina/:idRutina" element={<MiRutina/>} />}
                      {token.permisos.includes("mis-planes") && <Route path="/mis-planes/:idPlan/micro-plan/:idMicroPlan/rutina/:idRutina/ejercicio/:idEjercicioAplicado" element={<UnderConstructionPage title='Mis planes - MicroPlan - Rutina'/>} />}
                    </Route>
                    {token.permisos.includes("gestion-ejercicios") && <Route path="/ejercicios" element={<Ejercicios/>} />}
                    {token.permisos.includes("gestion-ejercicios") && <Route path="/ejercicios/:idEjercicio" element={<EjercicioPage/>} />}
                    {token.permisos.includes("gestion-usuarios") && <Route path="/usuarios" element={<UsersPage/>} />}
                    {token.permisos.includes("gestion-usuarios") && <Route path="/usuarios/:idUsuario" element={<UserPage/>} />}

                    {token && <Route path="/password" element={<PasswordChange/>} />}
                    <Route path="/home" element={<Dash token={token}/>}  />
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
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
