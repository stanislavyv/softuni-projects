import MyPetsList from "./my-pets-list";

const MyPets = ({ username }) => {
    return (
        <section className="my-pets">
            <h1>My Pets</h1>
            <ul className="my-pets-list">
                <MyPetsList username={username}/>
            </ul>
        </section>
    );
}

export default MyPets;