const arePetsEqual = (prevProps, props) => {
    return prevProps.id === props.id &&
           prevProps.likes === props.likes &&
           prevProps.description === props.description;
};

export default arePetsEqual;