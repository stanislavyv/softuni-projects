import './app.css';
import { Route, Routes } from "react-router-dom";

import Header from './components/header';
import Dashboard from './components/dashboard';
import PetDetails from './components/details';
import Footer from './components/footer';

function App() {
  return (
    <div>
        <Header />

        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/:category' element={<Dashboard />} />
            <Route path='/details/:id' element={<PetDetails />} />
        </Routes>
        
        <Footer /> 
    </div>
  );
}

export default App;
