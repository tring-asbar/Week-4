import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import ToastMessage from "./ToastMessage";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = "Name is required!";
      isValid = false;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
      errors.name = "Name can only contain letters and spaces!";
      isValid = false;
    }

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

    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match!";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      {register(name, email, password) && 
       ToastMessage("Register Successful 👍",'success')}
    }
  };

  return (
    <div className="loginForm">
      <h1>REGISTER</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label><br />
        <input 
          id="name" 
          type="text" 
          name="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter Name" 
        />
        <br /><br />
        {errors.name && <><span className="error" style={{color:'red'}}>{errors.name}</span>
        <br /><br /></>}

        <label htmlFor="email">Email</label><br />
        <input 
          id="email" 
          type="text" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter Email"
        />
        <br /><br />
        {errors.email && <><span className="error" style={{color:'red'}}>{errors.email}</span>
        <br /><br /></>}

        <label htmlFor="password">Password</label><br />
        <input 
          id="password" 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter Password"
        />
        <br /><br />
        {errors.password && <><span className="error" style={{color:'red'}}>{errors.password}</span>
        <br /><br /></>}

        <label htmlFor="cfpassword">Confirm Password</label><br />
        <input 
          id="cfpassword" 
          type="password" 
          name="confirmPassword" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Enter Same Password" 
        />
        <br /><br />
        {errors.confirmPassword && <><span className="error" style={{color:'red'}}>{errors.confirmPassword}</span>
        <br /><br /></>}

        <button type="submit" className="submit">Submit</button>
        <br />

        <p>Already have an account? <span onClick={() => navigate('/SignIn')}>Sign in</span></p>
      </form>
    </div>
  );
};

export default Register;
