import React from 'react'

const FormInput = ({title, type, placeholder, value, defaultChecked, acceptValue, handleChange}) => {
    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`form-${title}`}>
                {title}
            </label>
            <input className={`${type=='checkbox' ? '' : 'appearance-none'} block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id={`form-${title}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                accept={acceptValue}
                defaultChecked={defaultChecked}
            />
        </>
    )
}

export default FormInput;