import React from 'react'
import {Collapse, Radio} from 'antd'
import { useState } from 'react';
import price from '../../assets/price';

const {Panel} = Collapse;


function RadioBox({handleFilters}) {
    const [Value, setValue] = useState('0')

    const renderRadioBox = () =>  (
            price.map((price, index)=> (
                <Radio key={index} value={`${index}`}>{price.name}</Radio>
            ))
    )
    
    
    const handleChange =  event => {
        setValue(event.target.value)
        handleFilters(event.target.value)
    }
    return (
        <div>
            <Collapse defaultActiveKey={['0']}> 
                <Panel header="price" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
