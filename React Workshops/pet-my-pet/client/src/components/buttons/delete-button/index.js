import usePetService from "../../../hooks/usePetService";

import Button from "../../shared/button";

const DeleteButton = ({ id }) => {
    const { deletePet } = usePetService();
    
    const deleteCallback = () => {
        deletePet(id);
    };
    
    return <Button text="Delete" onClickHandler={deleteCallback} />;
}

export default DeleteButton;