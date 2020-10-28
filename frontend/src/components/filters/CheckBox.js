import React, {useState} from 'react'
import {Checkbox, Collapse} from 'antd';
import { connect } from 'react-redux';
const {Panel} = Collapse

function CheckBox({handleFilters, stateCategories}) {
    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        const newListChecked = [...Checked]
        const currentIndex = Checked.indexOf(value)

        if(currentIndex === -1) { //if value not in current checklist push it to array
            newListChecked.push(value)
        }else { //delete from current checked list
            newListChecked.splice(currentIndex, 1)
        }

        setChecked(newListChecked)
        handleFilters(newListChecked)
    }
    
    const renderCheckboxLists = ()=> stateCategories.map((value, index) => (
        <React.Fragment key={index}>
        <Checkbox 
        onChange={()=>handleToggle(value._id)}
        type="checkbox"
        checked={Checked.indexOf(value._id) === -1 ? false : true} />
        <span>{value.name}</span>
        </React.Fragment>  
    ))
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Categories" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

const mapToStateProps = state => ({
    stateCategories: state.category.categories
})


export default connect(mapToStateProps)(CheckBox)
