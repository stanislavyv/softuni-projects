import { Link } from 'react-router-dom'

const Categories = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/" >All</Link></li>
                <li><Link to="/cat" >Cats</Link></li>
                <li><Link to="/dog" >Dogs</Link></li>
                <li><Link to="/parrot" >Parrots</Link></li>
                <li><Link to="/reptile" >Reptiles</Link></li>
                <li><Link to="/other" >Other</Link></li>
            </ul>
        </nav>
    );
};

export default Categories;
