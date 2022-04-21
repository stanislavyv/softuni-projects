import usePetService from "../../../hooks/usePetService";

import Button from "../../shared/button";

const DeleteButton = ({ id }) => {
    const { deletePet } = usePetService();
    
    const deleteCallback = () => {
        deletePet(id);
    };
    
    return <Button onClickHandler={deleteCallback}>Delete</Button>;
}

export default DeleteButton;