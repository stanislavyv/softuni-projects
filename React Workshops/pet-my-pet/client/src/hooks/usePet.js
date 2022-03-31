import { useEffect, useState } from "react";
import petService from "../utils/petService";

const usePet = (id) => {
    const [state, setState] = useState({});

    useEffect(() => {
        petService
            .getById(id)
            .then(pet => setState(pet));
    }, [id])

    return state;
}

export default usePet;