import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import Me from "./assets/mine.jpeg"
import CardsList from "./CardsList"
import FetchApi from './FetchApi'
import FormComponent from './FormComponent'
import CrudOperation from './CrudOperation'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <CardsList/> */}
      {/* <FetchApi/>
      <FormComponent/> */}
      <CrudOperation/>
    </>
  )
}

export default App
