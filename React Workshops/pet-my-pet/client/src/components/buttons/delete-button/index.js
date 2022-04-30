import { useNotification } from '../../../contexts/NotificationContext';

import { deletePet } from "../../../utils/petService";

import Button from "../../shared/button";

const DeleteButton = ({ id }) => {
    const { notifyInfo, notifyError } = useNotification();

    const deleteCallback = () => {
        try {
            deletePet(id);
            notifyInfo('Successfuly removed pet!');
        } catch (e) {
            notifyError(`Couldn't remove pet: ${e.message}`);
        }
    };

    return <Button onClickHandler={deleteCallback}>Delete</Button>;
}

export default DeleteButton;