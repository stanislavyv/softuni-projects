import React from 'react';

import "./utils/firebase";
import GlobalStyles from './GlobalStyles';
import { Route, Routes, Navigate } from "react-router-dom";

import CustomErrorBoundary from "./components/custom-error-boundary";
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import CreatePet from "./components/forms/create-pet";
import EditPet from './components/pet-details/edit-pet';
import RegisterForm from "./components/forms/auth/register";
import LoginForm from "./components/forms/auth/login";
import MyPets from "./components/my-pets";
import OtherPetDetails from './components/pet-details/other-pet-details';
import Notification from "./components/notification";
import Footer from "./components/footer";

import AuthProvider from './contexts/AuthContext';
import NotificationProvider from "./contexts/NotificationContext";

import AuthRoute from "./hoc/AuthRoute";
import AuthFormRoute from './hoc/AuthFormRoute';
import Loading from './components/loading';

//TODO: 
// THINK OF A WAY TO USE AUTH CONTEXT IN APP COMP
// SEE useSignInWithEmailAndPassword FOR ERROR HANDLING ON 
//     ATTEMPTED LOGIN WITH INVALID CREDENTIALNS
// !!!!!!!!! EXECUTE THE HOOK FN ONCE IN THE HOOK FILE AND EXPORT ITS VALUE!!!!!!!!!
// TEST IF YOU CAN REPLACE CONTEXT WITH GLOBAL HOOK
// See how to make auth guard without HOC
function App() {

    return (
        <>
            <GlobalStyles />
            <NotificationProvider>
                <AuthProvider>
                    <Loading loading={true} />
                    <Header />

                    <CustomErrorBoundary>
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
                                element={<AuthRoute children={<MyPets />} />}
                            />

                            <Route path="*" element={<Navigate to="/pets" />} />
                        </Routes>

                        <Notification />
                    </CustomErrorBoundary>
                </AuthProvider>
            </NotificationProvider>

            <Footer />

        </>
    );
}

export default App;
