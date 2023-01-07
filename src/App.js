import React from 'react';
import { Route, Routes } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css';
import {Home, Navbar, SuperAdmin, Registration, Login} from './features';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='container'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/users" element={<SuperAdmin />} />
          <Route  path="/register" element={<Registration />} />
          <Route  path="/login" element={<Login />} />
        </Routes>

        <div className='footer'>
          <span className="blue-text lighten-3 right">
            <i className="material-icons left">copyright</i>Copyright 2023 codeWithAnki</span>
        </div>
      </div>

    </div>
  );
}

export default App;
