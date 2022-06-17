import React,{useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import './Login.css';
import { AppSettingsContext } from "./appsettings";
import axios from 'axios'

const Login = () => {
const {token,assignToken} =useContext(AppSettingsContext);
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const navivate = useNavigate();
const handleClickButton = async () => {
    try{
    const response = await axios.post("/api/signin",{  "email": email,"password":password});
    assignToken(response.data.token);
    console.log(token);
    navivate('/Search');
    }
    catch(e)
    {
        
    }
};
  return (
    <div className="maincontainer">
      Login
      <Link to="/Search">Search</Link>
      <div className="logincontainer">
        <TextField
          required
          id="outlined-required"
          onChange={(e)=>{setEmail(e.target.value)}}
          label="Email"
          value ={email}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          onChange={(e)=>{setPassword(e.target.value)}}
          type="password"
          value ={password}
          autoComplete="current-password"
        />
        <Button variant="contained" onClick={handleClickButton}>Login</Button>
      </div>
    </div>
  );
};
export default Login;
