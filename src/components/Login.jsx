import UserService from "../services/UserService";
import "../styles/welcome.scss";
import { ReactComponent as WelcomeImage } from '../assets/images/welcome.svg';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Welcome = () => {
  const handleLogin = async ()=>{
    UserService.doLogin();
  }

  return (
    <div className="jumbotron">
      <div className="login-page">
        <WelcomeImage className="welcome" alt="login" />
        <h1>Welcome to Power Access Cloud</h1>
        <p>Please Login to continue</p>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Welcome;
