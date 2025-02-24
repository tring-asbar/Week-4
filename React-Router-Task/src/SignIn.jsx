import { useNavigate} from "react-router-dom"
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ToastMessage from "./ToastMessage";

const SignIn=()=>{
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors,setErrors] = useState({});

    const validateForm=()=>{

        let errors = {};
        let isValid = true;

        if (!email.trim()) {
            errors.email = "Email is required!";
            isValid = false;
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Invalid email format!";
            isValid = false;
          }
      
          if (!password) {
            errors.password = "Password is required!";
            isValid = false;
          } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters!";
            isValid = false;
          } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
            errors.password = "Password must contain letters and numbers!";
            isValid = false;
          }
          setErrors(errors);
          return isValid;
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()){
           { login(email, password) &&
            ToastMessage("Logged in Successful👍","success")
           }
        }
    };
    return(
        <div id="login" className="loginForm">
            <h1 style={{paddingTop:'5%'}}>LOGIN</h1>
        <form onSubmit={handleSubmit}>
        <label>Email</label><br />
        <input  type="text" className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/> 
        
        {errors.email && <><span className="error" style={{color:'red',fontSize:'15px'}}>{errors.email}</span>
        <br /></>}
        
        <label>Password</label><br />
        <input  type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password"/>
        <br />
        {errors.password && <><span className="error" style={{color:'red',fontSize:'15px'}}>{errors.password}</span>
        <br /></>}
        <br />

        <button  className='submit'type="submit">Submit</button><br />
        <p>Don't have an account? <span onClick={()=>navigate('/Register')}>Register</span></p>
        </form>
        </div>
    )
}
export default SignIn