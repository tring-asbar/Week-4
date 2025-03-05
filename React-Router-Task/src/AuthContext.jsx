import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import ToastMessage from "./ToastMessage";
// Create Authentication Context
const AuthContext = createContext();






export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [personas,setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState();
  const [personaKey,setPersonaKey] = useState();
  const navigate = useNavigate();
  

  // Register function
  const register = (name, email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if email is already registered
    if (users.some(user => user.email === email)) {
      ToastMessage("Email already exists!", 'error');
      return false;
    }
  
    const newUser = { name, email, password, personas: [] };
    users.push(newUser);
  
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    navigate('/SignIn'); // Redirect after signup
    return true;
  };
  
  
  // Login function
  const login = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.email === email && user.password === password);
  
    if (!existingUser) {
      ToastMessage("Invalid email or password!", 'error');
      return false;
    }
  
    localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
    setUser(existingUser);
    navigate("/UserPage"); // Redirect after login
    return true;
  };
  
  // localStorage.clear()
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
    ToastMessage("Logged out Successful",'info')
    navigate("/"); // Redirect to home
  };

  const addPersona = (newPersona) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (!currentUser) return;
  
    users = users.map(user => {
      if (user.email === currentUser.email) {
        user.personas.push(newPersona);
        currentUser.personas = user.personas;
      }
      return user;
    });
  
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
  
    setUser(currentUser);
    setPersonas(currentUser.personas);
  };
  

  const SetKey=(index)=>{
    setPersonaKey(index);
  }
  

  return (
    <AuthContext.Provider value={{ user,setUser, register, login, logout,personas,setPersonas,addPersona,selectedPersona,setSelectedPersona,SetKey,personaKey}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
