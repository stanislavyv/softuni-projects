import React from 'react';

class Link extends React.Component {
    render() { 
        return ( 
        <li>
            <a href="#">{this.props.title}</a>
        </li> );
    }
}
 
export default Link;