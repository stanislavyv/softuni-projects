import { Component, useState, useEffect } from "react";
import DashboardPetCard from "../../pet-card";
import petService from "../../../utils/petService";

const DashboardPetsList = (props) => {
    const [pets, setPets] = useState([]);
    // TODO: CHECK IF HOOKS SOLVE RENDERING PROBLEM
    //       TRANSFORM LIFECYCLE METHODS TO useEffect
    //       SEE HOW props IS RECEIVED
    //       ASK SOMEONE IF THEY KNOW HOW TO SOLVE THIS...
    //       FIX DIMMED BACKGROUND THEMES
    //       FIX THEMES UNDERLINE
    //       UPDATE CHANGELOG

    // shouldComponentUpdate(nextProps) {
    //     if (nextProps.category === category) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    useEffect(() => {
        const category = props.category;

        petService
            .getAll(category)
            .then(pets => {
                setPets(pets);
            });
    }, [props.category]);

    return (
        <ul className="other-pets-list">
            {pets.map(pet => {
                return <DashboardPetCard key={pet.id} {...pet} />
            })}
        </ul>
    );
};

export default DashboardPetsList;

// class DashboardPetsList extends Component {
//     constructor(props) {
//         super(props);

//         this.state = { 
//             pets: [],
//             currentCategory: '' 
//         };
//     }    

//     componentDidMount() {
//         petService
//             .getAll()
//             .then(pets => this.setState({ pets: pets })
//             );
//     }

//     shouldComponentUpdate(nextProps) {
//         if (nextProps.category === this.props.category) {
//             return false;
//         } else {
//             return true;
//         }
//     }

//     componentDidUpdate() {
//         const category = this.props.category;

//         petService
//             .getAll(category)
//             .then(pets => {
//                 this.setState({ pets: pets, currentCategory: category })
//             });
//     }   

//     render() { 
//         return (
//             <ul className="other-pets-list">
//                 {this.state.pets.map(pet => {
//                     return <DashboardPetCard key={pet.id} {...pet} />
//                 })}
//             </ul>
//         );

//     }
// };