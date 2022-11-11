import logo from './logo.svg';
import './App.css';

import{Routes, Route} from "react-router-dom";

import WelcomePage from './composants/WelcomePage';
import LoginPage from './composants/LoginPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/Connexion" element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
