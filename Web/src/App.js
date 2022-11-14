import logo from './logo.svg';
import './App.css';

import{Routes, Route} from "react-router-dom";

import WelcomePage from './composants/WelcomePage';
import LoginPage from './composants/LoginPage';
import ClientAreaPage from './composants/ClientAreaPage';
import ChangePassWord from './composants/ChangePassWordPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/Connexion" element={<LoginPage/>}/>
        
        {/* pour le test interne*/}
        <Route path="/Admin" element={<ClientAreaPage/>}/>
        <Route path="/ChangePassword" element={<ChangePassWord/>} />
      </Routes>
    </div>
  );
}

export default App;
