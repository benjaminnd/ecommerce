import React from 'react'
import { Link } from 'react-router-dom';
import {ShoppingCartOutlined} from '@ant-design/icons'

/**
 * 
 */

 const Button = ({isButton, title="", action, href, addStyle, type='button'}) => {
     const style = `font-bold rounded-md px-3 py-2 text-base cursor-pointer animate focus:outline-none ${addStyle}`
    return (
        <>
            {isButton ? (<button className={style} type={type} onClick={action}>{title} </button>) : (<Link to={href} className={style}>{title}</Link>)}

        </>
    )
 }

 export default Button;