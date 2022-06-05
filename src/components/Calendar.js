import React, { useState } from 'react'
import {Header} from './Header'
import {Days} from './Days'
import { Labels } from './Labels'

import '../css/calendar.css'

function Calendar(props) {
    const [selectedDate, setSelectedDate] = useState(
        {
            date: new Date(),
            isSelected: true
        }
    );
    const [selectedMonth, setSelectedMonth] = useState(
        {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        }
    );
    
    const label = `${selectedDate.date.getDate()}-${selectedDate.date.getMonth()+1}-${selectedDate.date.getFullYear()}`;

    return (
        <div className='calendar'>
            <Labels calendarType={props.type} selected={selectedDate.isSelected} label={label}/>
            <Header month={selectedMonth.month} year={selectedMonth.year} setSelectedMonth={setSelectedMonth}/>
            <Days selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/>
        </div>
    );        
}

export {Calendar}