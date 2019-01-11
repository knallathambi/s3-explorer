import React from 'react';
import {NavLink} from 'react-router-dom';

const NavPath = ({bucketName, selectedKey}) => {
    return (
        <nav >
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <NavLink to="/">{bucketName}</NavLink>
                </li>
                <li className="breadcrumb-item active" >[{selectedKey}]</li>
            </ol>
        </nav>        
    )
}

export default NavPath;