import './app.css';
import { Route, Routes, Navigate} from "react-router-dom";

import Header from './components/header';
import Dashboard from './components/dashboard';
import PetDetails from './components/details';
import Footer from './components/footer';

function App() {
  return (
    <div>
        <Header />

        <Routes>
            <Route path='/pets' element={<Dashboard />} />
            <Route path='/pets/categories/:category' element={<Dashboard />} />
            <Route path='/pets/details/:id' element={<PetDetails />} />
            <Route path="*" element={<Navigate to="/pets"/>} />
        </Routes>
        
        <Footer /> 
    </div>
  );
}

export default App;
