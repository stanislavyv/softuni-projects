import './app.css';
import { Route, Routes } from "react-router-dom";

import Header from './components/header';
import Dashboard from './components/dashboard';
import Footer from './components/footer';

function App() {
  return (
    <div>
        <Header />

        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/:category' element={<Dashboard />} />
        </Routes>
        
        <Footer /> 
    </div>
  );
}

export default App;
