const PetCard = ({ props }) => {
    return (
        <>
            <h3>Name: {props.name}</h3>
            <p>Category: {props.category}</p>
            <p className="img">
                <img src={props.imageURL} alt="pet" />
            </p>
            <p className="description">{props.description}</p>
        </>
    );
};

export default PetCard;
