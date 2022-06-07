import React from 'react'
import '../css/calendar.css'
import PropTypes from 'prop-types'

function TypePicker(props) {

    function onChangeValue(e) {
        props.setCalendarType(e.target.value)
    }

    return (
        <div className='type-picker'>
            <input type='radio' id='single' name='type' onChange={onChangeValue} value='SINGLE' className='type-radio' defaultChecked></input>
            <label htmlFor='single' className='type-label'>SINGLE</label>
            <input type='radio' id='range' name='type' onChange={onChangeValue} value='RANGE' className='type-radio'></input>
            <label htmlFor='range' className='type-label'>RANGE</label>
        </div>
    );
}

TypePicker.propTypes = {
    setCalendarType: PropTypes.func.isRequired
}

export {TypePicker}