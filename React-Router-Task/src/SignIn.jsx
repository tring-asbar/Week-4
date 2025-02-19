import { useNavigate} from "react-router-dom"
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { useState } from "react";
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
            login(email, password);
        }
    };
    return(
        <div className="loginForm">
            <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
        <label>Email</label><br />
        <input  type="text" className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/> 
        <br /><br />
        {errors.email && <><span className="error" style={{color:'red'}}>{errors.email}</span>
        <br /><br /></>}

        <label>Password</label><br />
        <input  type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password"/>
        <br /><br />
        {errors.password && <><span className="error" style={{color:'red'}}>{errors.password}</span>
        <br /><br /></>}

        <button  className='submit'type="submit">Submit</button><br />
        <p>Dont't have an account?<span onClick={()=>navigate('/Register')}>Register</span></p>
        </form>
        </div>
    )
}
export default SignIn