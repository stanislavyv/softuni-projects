import React from 'react';

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
import Notification from "./components/notification";
import Footer from "./components/footer";

import AuthContext from "./contexts/AuthContext";
import { NotificationCtxProvider } from "./contexts/NotificationContext";
import AuthRoute from "./hoc/AuthRoute";

//TODO:
// NOTIFICATIONS
// ROUTE GUARD FOR EDITING PETS (ONLY CREATOR SHOULD EDIT)
// SEE route-my-pets -> HAS NOTIFICATIONS?
// ВИЖ ЗАЩО НЕ СЕ ВИЗУАЛИЗИРАТ ТЪПИТЕ ИЗВЕСТИЯ
// АКО СЛУЧАЙНО СТАНЕ, ВИЖ КАК ДА ИЗПОЛЗВАШ useNotificationContext
// В petService -> usePetService? (with state or?)
// ВИЖ REACT-TOASTIFY КАК СА ГО НАПРАВИЛИ
// МАНИ ТЪПОТО jsx АТРИБУТ ОТ styles ДА НЕ МРЪНКА!
// ВИЖ ДАЛИ ИМА НАЧИН ДА ИЗПОЛЗВАШ CONTEXT В SERVICE, БЕЗ ДА ГО ПРАВИШ HOOK
// TRY NOTIF WITH PLAIN HTML
// TRY IT IN CODESANDBOX

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
                                path="/pets/details/:id"
                                element={<PetDetails />}
                            />
                            <Route
                                path="/pets/create"
                                element={<AuthRoute children={<CreatePet />}/>}
                            />
                            <Route
                                path="/pets/edit/:id"
                                element={<AuthRoute children={<EditPet />}/>}
                            />
                            <Route
                                path="/register"
                                element={<RegisterForm />}
                            />
                            <Route path="/login" element={<LoginForm />} />
                            <Route
                                path="/my-pets"
                                element={<AuthRoute children={<MyPets {...authInfo}/>}/>}
                            />
                            <Route
                                path="/pets/:id"
                                element={<OtherPetDetails />}
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
