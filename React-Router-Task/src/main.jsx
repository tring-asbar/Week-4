import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './AuthContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ApolloClient,InMemoryCache,ApolloProvider} from   '@apollo/client'

const client = new ApolloClient({
  uri : "http://localhost:4000/",
  cache:new InMemoryCache(),
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApolloProvider client={client}>
        <App />
        <ToastContainer/>
        </ApolloProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
