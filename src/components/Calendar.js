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
    
    const firstDayOfMonth = new Date(monthToRender.year, monthToRender.month, 1);
    const firstWeekDay = firstDayOfMonth.getDay()
    const dateFrom = selectedRanges.dateFrom;
    const dateTo = selectedRanges.dateTo;
   
    let subarr = []
    const dates = []

    let cnt = 1;
    let date = null;
    for (let i = 0; i < 42; i++) {
        if (i !== 0 && i % 7 === 0) {
            dates.push(subarr)
            subarr = []
        }
        if (i >= firstWeekDay) {
            date = new Date(monthToRender.year, monthToRender.month, cnt);
            subarr.push({
                date: date,
                isSelected: (date.toDateString() === dateFrom.toDateString() && monthToRender.month === dateFrom.getMonth()) || (dateTo && date.toDateString() === dateTo.toDateString() && monthToRender.month === dateTo.getMonth()) ,
                isFromOtherMonth: date.getMonth() !== monthToRender.month,
                isToday: date.toDateString() === new Date().toDateString(),
                isInRange: dateTo && date > dateFrom && date < dateTo,
                isHovered: false
            });
            cnt++;
        }
        else {
            date = new Date(new Date(firstDayOfMonth).setDate(1 - (firstWeekDay - i)))
            subarr.push({
                date: date,
                isSelected: false,
                isFromOtherMonth: true,
                isToday: false,
                isInRange: false,
                isHovered: false
            })
        }
    }
    dates.push(subarr)
    //const [daysToRender, setDaysToRender] = useState(dates)

    const changeSelectedDays = (day) => {
        if (props.type === 'SINGLE' || dateFrom > day.date || dateTo) {
            setSelectedRanges(
                {
                    dateFrom: day.date,
                    dateTo: null
                }
            )
        }
        else  {
            setSelectedRanges(
                {
                    dateFrom: dateFrom,
                    dateTo: day.date
                }
            )
        }
        
        if(day.date.getMonth() !== monthToRender.month) {
            setMonthToRender({
                month: day.date.getMonth(),
                year: day.date.getFullYear()
            })
        }
    }

    const changeHoveredDays = (day) => {
        if (props.type === 'SINGLE') return;
        if (dateTo) return;
        if (day.date > dateFrom) {
            console.log('change hovered')
            //let dayCell = day;
            //while (dayCell.date.getDate() != dateFrom.getDate()) {
                day.isHovered = true
                
                //if (!el.previousElementSibling) {
                //    el = el.parentNode.previousElementSibling.lastChild;
                //}
                //else el = el.previousElementSibling;
            //}
            //el = e.target;
            //while (el.classList.contains('in-range')) {
            //    el.className = setClassNames(day)
            //    if (!el.nextElementSibling) {
            //        el = el.parentNode.nextElementSibling.firstChild;
            //    }
            //    else el = el.nextElementSibling;
            //}
        }
    }
    console.log(dates)

    return (
        <div className='calendar'>
            <Labels calendarType={props.type} selectedRanges={selectedRanges}/>
            <Header month={monthToRender.month} year={monthToRender.year} setMonthToRender={setMonthToRender}/>
            <Days days={dates} changeSelectedDays={changeSelectedDays} changeHoveredDays={changeHoveredDays}/>
        </div>
    );        
}

export {Calendar}