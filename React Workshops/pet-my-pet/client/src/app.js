import { useState, useEffect } from 'react';

import './app.css';
import './utils/firebase';
import { Route, Routes, Navigate} from "react-router-dom";

import Header from './components/header';
import Dashboard from './components/dashboard';
import PetDetails from './components/other-pet-details';
import CreatePet from './components/forms/create-pet';
import EditPet from './components/forms/edit-pet';
import RegisterForm from './components/forms/auth/register'
import LoginForm from './components/forms/auth/login'
import Footer from './components/footer';

import authService from './utils/authService';
//TODO:
// OTHER AUTH STUFF - NOTIFICATIONS, MY PETS PAGE, ADD AND 
// DELETE FOR AUTHORIZED USERS ONLY, PET ONLY ONCE
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.onStateChange(setUser)
  }, []);

  const authInfo = {
    isLoggedIn: Boolean(user),
    username: user?.email,
  };

  return (
    <div>
        <Header {...authInfo}/>
        <Routes>
            <Route path='/pets' element={<Dashboard />} />
            <Route path='/pets/categories/:category' element={<Dashboard />} />
            <Route path='/pets/details/:id' element={<PetDetails />} />
            <Route path='/pets/create' element={<CreatePet /> } />
            <Route path='/pets/edit/:id' element={<EditPet /> } />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path="*" element={<Navigate to="/pets"/>} />
        </Routes>
        
        <Footer /> 
    </div>
  );
}

export default App;
