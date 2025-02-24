import logo from './assets/logo.svg'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Header=()=>{
    const navigate = useNavigate();
    const navToSignIn=()=>{
        navigate('/SignIn')
    }
    
    
    return(
        <>  
            <header className='header'>
                <div>
                    <img src={logo} alt="" />
                </div>
                <div>
                    <button className='login' onClick={navToSignIn}>Login</button>
                    {/* <button  className='register' onClick={navToRegister}>Register</button> */}
                </div>
            </header>
        </>
    )
}
export default Header