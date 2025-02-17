import React from 'react'
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Route from './Pages/Routes/Route'
// import { useLocation } from 'react-router-dom';
// import Header1 from './Components/Header/Header';

const App = () => {
  // const location = useLocation()
  // const validPath=['/auth/']
  return (
    <>
    {/* {!validPath.some(item=>location.pathname.startsWith(item)) && <Header1/>} */}
      <Route />
    </>
  )
}

export default App