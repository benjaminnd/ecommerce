import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './dropdown.css'
function DropdownMenu({title, options, selected, onSelect}) {
    const [dropdownTitle, setDropdownTitle] = useState(title)

    // useEffect(()=>{
    //     setDropdownTitle(title)
    // }, [title])
    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`form-${title}`}>
                {title}
            </label>

            <div className="dropdown inline-block relative mb-3">
                <button type="button" className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center appearance-none focus:outline-none" onClick={e=>e.preventDefault()}>
                <span className="mr-1">--{dropdownTitle}--</span>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                </button>
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                    {options.map( (option, index) => (
                        <li key={index} className=""><a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={e=>{setDropdownTitle(option.name); onSelect(option._id)}}>{option.name}</a></li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default DropdownMenu
