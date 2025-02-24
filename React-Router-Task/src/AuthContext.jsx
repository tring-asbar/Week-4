import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import ToastMessage from "./ToastMessage";
// Create Authentication Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [personas,setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState();
  const [personaKey,setPersonaKey] = useState();
  const navigate = useNavigate();

  // Register function
  const register = (name, email, password) => {
    const newUser = { name, email, password };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    navigate('/'); // Redirect after signup
    return true;
  };

  
  // Login function
  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if(storedUser==null){
        alert("Please Register First")
    }
    else if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      navigate("/UserPage"); // Redirect after login
      return true;
    } else {
      ToastMessage("Invalid email or password!",'error');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    // localStorage.removeItem("user");
    ToastMessage("Logged out Successful",'info')
    navigate("/"); // Redirect to home
  };

  const addPersona=(newPersona)=>{
  
    setPersonas([...personas,newPersona]);
  }

  const SetKey=(index)=>{
    setPersonaKey(index);
  }
  

  return (
    <AuthContext.Provider value={{ user, register, login, logout,personas,setPersonas,addPersona,selectedPersona,setSelectedPersona,SetKey,personaKey}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
