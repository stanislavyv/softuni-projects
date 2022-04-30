import { useAuth } from "../../contexts/AuthContext";

import MyPetsList from "./my-pets-list";

const MyPets = () => {
    const { username } = useAuth();

    return (
        <section className="my-pets">
            <h1>My Pets</h1>
            <MyPetsList username={username} />
        </section>
    );
}

export default MyPets;