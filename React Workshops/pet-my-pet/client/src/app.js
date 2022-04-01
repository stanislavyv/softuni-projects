import "./app.css";
import "./utils/firebase";

import { Route, Routes, Navigate } from "react-router-dom";

import useUser from "./hooks/useUser";

import CustomErrorBoundary from "./components/custom-error-boundary";
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import PetDetails from "./components/other-pet-details";
import CreatePet from "./components/forms/create-pet";
import EditPet from "./components/forms/edit-pet";
import RegisterForm from "./components/forms/auth/register";
import LoginForm from "./components/forms/auth/login";
import MyPets from "./components/my-pets";
import OtherPetDetails from "./components/other-pet-details";
import Footer from "./components/footer";

import AuthContext from "./contexts/AuthContext";

//TODO:
// NOTIFICATIONS
// AUTH GUARD AND ERROR BOUNDARY
function App() {
    const authInfo = useUser();

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                <Header />

                <CustomErrorBoundary>
                    <Routes>
                        <Route path="/pets" element={<Dashboard />} />
                        <Route
                            path="/pets/categories/:category"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/pets/details/:id"
                            element={<PetDetails />}
                        />
                        <Route path="/pets/create" element={<CreatePet />} />
                        <Route path="/pets/edit/:id" element={<EditPet />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/my-pets" element={<MyPets />} />
                        <Route path="/pets/:id" element={<OtherPetDetails />} />

                        <Route path="*" element={<Navigate to="/pets" />} />
                    </Routes>
                </CustomErrorBoundary>

                <Footer />
            </AuthContext.Provider>
        </div>
    );
}

export default App;
