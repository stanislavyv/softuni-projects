import React from 'react';

import styled from 'styled-components';

import StyledLink from '../../shared/link';
import CategoriesList from './categories-list';

const StyledCategories = styled.nav`
    display: flex;
    justify-content: center;
    margin: 10px 10px 20px 10px;
`;

const Categories = React.memo(() => {
    const links = [
        { name: "All", path: "/pets" },
        { name: "Cats", path: "/pets/categories/cat" },
        { name: "Dogs", path: "/pets/categories/dog" },
        { name: "Parrots", path: "/pets/categories/parrot" },
        { name: "Reptiles", path: "/pets/categories/reptile" },
        { name: "Other", path: "/pets/categories/other" },
    ];

    return (
        <StyledCategories>
            <CategoriesList>
                {links.map((link, index) => {
                    return <li key={index}><StyledLink to={link.path}>{link.name}</StyledLink></li>;
                })}
            </CategoriesList>
        </StyledCategories>
    );
});

Categories.displayName = 'Categories';
export default Categories;
