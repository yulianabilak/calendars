import React from 'react'
import '../css/calendar.css'

function TypePicker(props) {

    function onChangeValue(e) {
        props.setCalendarType(e.target.value)
    }

    return (
        <div className='type-picker'>
            <input type='radio' id='single' name='type' onChange={onChangeValue} value='SINGLE' className='type-radio' defaultChecked></input>
            <label for='single' className='type-label'>SINGLE</label>
            <input type='radio' id='range' name='type' onChange={onChangeValue} value='RANGE' className='type-radio'></input>
            <label for='range' className='type-label'>RANGE</label>
            <input type='radio' id='multirange' name='type' onChange={onChangeValue} value='MULTIRANGE' className='type-radio'></input>
            <label for='multirange' className='type-label'>MULTIRANGE</label>
        </div>
    );
}

export {TypePicker}