import React from 'react'
import '../css/calendar.css'

function Labels(props) {
    function renderRangeLabels() {
        if (props.calendarType !== 'SINGLE') {
            return (
                <>
                <div className='separator'>—</div>
                <input type='text' readOnly className='date-label' value={props.selected ? props.label : ''}/>
                </>
            );
        }
        else return null;
    }

    return (
        <div className='date-labels'>
                <input type='text' readOnly className='date-label' value={props.selected ? props.label : ''}></input>
                {renderRangeLabels()}
            </div>
    );
}

export {Labels}