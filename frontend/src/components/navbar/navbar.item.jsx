import React from 'react'
import {Link} from 'react-router-dom'
const NavItem = ({link, listStyle, name, action}) => {
    return (
        <li className={`animate px-3 py-2 rounded-md ${listStyle}`}>
            {
                action ? <a className="listItem" href={link} onClick={action}>{name}</a> : <Link to={link}><span className="listItem">{name}</span></Link>
            }
            
        </li>
    )
}

export default NavItem;