import './app.css';
import { Route, Routes, Navigate} from "react-router-dom";

import Header from './components/header';
import Dashboard from './components/dashboard';
import PetDetails from './components/details';
import CreatePet from './components/forms/create-pet';
import EditPet from './components/forms/edit-pet';
import Footer from './components/footer';

function App() {
  return (
    <div>
        <Header />

        <Routes>
            <Route path='/pets' element={<Dashboard />} />
            <Route path='/pets/categories/:category' element={<Dashboard />} />
            <Route path='/pets/details/:id' element={<PetDetails />} />
            <Route path='/pets/create' element={<CreatePet /> } />
            <Route path='/pets/edit/:id' element={<EditPet /> } />
            {/* <Route path="*" element={<Navigate to="/pets"/>} /> */}
        </Routes>
        
        <Footer /> 
    </div>
  );
}

export default App;
