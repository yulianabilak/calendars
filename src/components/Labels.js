import React from 'react'
import '../css/calendar.css'

function Labels(props) {
    const dateFrom = props.selectedRanges.dateFrom;
    const dateTo = props.selectedRanges.dateTo;
  
    function renderRangeLabels() {
        if (props.calendarType !== 'SINGLE') {
            return (
                <>
                <div className='separator'>—</div>
                <input type='text' readOnly className='date-label' value={dateTo ? `${dateTo.getDate()}-${dateTo.getMonth() + 1}-${dateTo.getFullYear()}` : ''}/>
                </>
            );
        }
        else return null;
    }
    
    return (
        <div className='date-labels'>
             <input type='text' readOnly className='date-label' value={`${dateFrom.getDate()}-${dateFrom.getMonth()+1}-${dateFrom.getFullYear()}`}></input>
            {renderRangeLabels()}
        </div>
    );
}

export {Labels}