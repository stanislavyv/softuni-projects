import MyPetsList from "./my-pets-list";

const MyPets = () => {
    return (
        <section className="my-pets">
            <h1>My Pets</h1>
            <ul className="my-pets-list">
                <MyPetsList username="SomeGuy@abv.bg"/>
            </ul>
        </section>
    );
}

export default MyPets;