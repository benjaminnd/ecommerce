import React from 'react'
import {Select} from 'antd'

const {Option} = Select


function Sortby({handleFilters}) {

        const handleChange = (value) => {
            if(value == "name asc"){
                handleFilters({sortBy: 'name', order: 'asc'})
            }else if(value == 'name desc'){
                handleFilters({sortBy: 'name', order: 'desc'})
            }else if(value == 'price asc'){
                handleFilters({sortBy: 'price', order: 'asc'})
            }else {
                handleFilters({sortBy: 'price', order: 'desc'})
            }
        }
    return (
      <Select
        defaultValue="Sort by"
        style={{ width: 220 }}
        onChange={handleChange}
      >
        <Option value="name asc"><span className="filter-text">Sort By Name (ascending)</span></Option>
        <Option value="name desc"><span className="filter-text">Sort By Name (descending)</span></Option>
        <Option value="price asc"><span className="filter-text">Sort By Price (low to high)</span></Option>
        <Option value="price desc"><span className="filter-text">Sort By Price (high to low)</span></Option>
      </Select>
    );
}

export default Sortby
