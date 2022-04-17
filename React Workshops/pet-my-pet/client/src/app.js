import React from 'react';

import "./app.css";
import "./utils/firebase";
import { Route, Routes, Navigate } from "react-router-dom";

import useUser from "./hooks/useUser";

import CustomErrorBoundary from "./components/custom-error-boundary";
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import CreatePet from "./components/forms/create-pet";
import EditPet from "./components/forms/edit-pet";
import RegisterForm from "./components/forms/auth/register";
import LoginForm from "./components/forms/auth/login";
import MyPets from "./components/my-pets";
import OtherPetDetails from "./components/other-pet-details";
import Notification from "./components/notification";
import Footer from "./components/footer";

import AuthContext from "./contexts/AuthContext";
import { NotificationCtxProvider } from "./contexts/NotificationContext";
import AuthRoute from "./hoc/AuthRoute";
import AuthFormRoute from './hoc/AuthFormRoute';

//TODO:
// ROUTE GUARD FOR EDITING PETS (ONLY CREATOR SHOULD EDIT)
// ВИЖ REACT-TOASTIFY КАК СА ГО НАПРАВИЛИ
// МАНИ ТЪПОТО jsx АТРИБУТ ОТ styles ДА НЕ МРЪНКА!

function App() {
    const authInfo = useUser();

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                <Header />

                <CustomErrorBoundary>
                    <NotificationCtxProvider>
                        <Routes>
                            <Route path="/pets" element={<Dashboard />} />

                            <Route
                                path="/pets/categories/:category"
                                element={<Dashboard />}
                            />
                            <Route
                                path="/pets/:id"
                                element={<OtherPetDetails />}
                            />
                            <Route
                                path="/pets/create"
                                element={<AuthRoute children={<CreatePet />} />}
                            />
                            <Route
                                path="/pets/edit/:id"
                                element={<AuthRoute children={<EditPet />} />}
                            />
                            <Route
                                path="/register"
                                element={<AuthFormRoute children={<RegisterForm />} />}
                            />
                            <Route path="/login" element={<AuthFormRoute children={<LoginForm />} />} />
                            <Route
                                path="/my-pets"
                                element={<AuthRoute children={<MyPets {...authInfo} />} />}
                            />

                            <Route path="*" element={<Navigate to="/pets" />} />
                        </Routes>

                        <Notification />
                    </NotificationCtxProvider>
                </CustomErrorBoundary>

                <Footer />
            </AuthContext.Provider>
        </div>
    );
}

export default App;
