import React from 'react';
import { Link } from 'react-router-dom'

const Categories = React.memo(() => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/pets" >All</Link></li>
                <li><Link to="/pets/categories/cat" >Cats</Link></li>
                <li><Link to="/pets/categories/dog" >Dogs</Link></li>
                <li><Link to="/pets/categories/parrot" >Parrots</Link></li>
                <li><Link to="/pets/categories/reptile" >Reptiles</Link></li>
                <li><Link to="/pets/categories/other" >Other</Link></li>
            </ul>
        </nav>
    );
});

Categories.displayName = 'Categories';
export default Categories;
