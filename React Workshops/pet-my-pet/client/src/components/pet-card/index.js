const PetCard = ({ pet }) => {
    return (
        <>
            <h3>Name: {pet.name}</h3>
            <p>Category: {pet.category}</p>
            <p className="img">
                <img src={pet.imageURL} alt="pet" />
            </p>
            <p className="description">{pet.description}</p>
        </>
    );
};

export default PetCard;
