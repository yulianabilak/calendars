import React, { useState } from 'react'
import {Header} from './Header'
import {Days} from './Days'
import { Labels } from './Labels'

import '../css/calendar.css'

function Calendar(props) {
    const [selectedRanges, setSelectedRanges] = useState(
        {
            dateFrom: new Date(),
            dateTo: null
        }
    );
    const [monthToRender, setMonthToRender] = useState(
        {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        }
    );

    return (
        <div className='calendar'>
            <Labels calendarType={props.type} selectedRanges={selectedRanges}/>
            <Header month={monthToRender.month} year={monthToRender.year} setMonthToRender={setMonthToRender}/>
            <Days selectedRanges={selectedRanges} setSelectedRanges={setSelectedRanges} monthToRender={monthToRender} setMonthToRender={setMonthToRender} type={props.type}/>
        </div>
    );        
}

export {Calendar}