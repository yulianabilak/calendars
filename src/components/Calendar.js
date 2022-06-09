import React, { useEffect, useState } from 'react'
import {Header} from './Header'
import {Days} from './Days'
import { Labels } from './Labels'
import PropTypes from 'prop-types'

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
    
    useEffect(() => {
        if (props.type === 'SINGLE') {
        setSelectedRanges((prev) => ({
            dateFrom: prev.dateFrom,
            dateTo: null
        }))
    }
    }, [props.type])

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

    const changeSelectedDays = (day) => {
        if (props.type !== 'SINGLE' && props.type !== 'RANGE') return;
        if (props.type === 'SINGLE' || selectedRanges.dateFrom > day.date || selectedRanges.dateTo) {
            setSelectedRanges(
                {
                    dateFrom: day.date,
                    dateTo: null
                }
            )
        }
        else if (props.type === 'RANGE') {
            setSelectedRanges(
                {
                    dateFrom: selectedRanges.dateFrom,
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

    /*const changeHoveredDays = (day) => {
        if (props.type !== 'SINGLE' && props.type !== 'RANGE') return;
        if (props.type === 'SINGLE') return;
        if (dateTo) return;
        const flatDays = [].concat(...dates);
        let i = flatDays.findIndex(flatDay => day.date === flatDay.date);
        if (day.date > dateFrom) {
            let dayCell = day;
            while (dayCell.date.getDate() !== dateFrom.getDate()) {
                document.getElementById('dayidx'+dayCell.date.getTime()).classList.add('in-range');
                i--;
                if (i >= 0)
                    dayCell = flatDays[i];
            }
            i = flatDays.findIndex(flatDay => day.date === flatDay.date) + 1;
            while (i < flatDays.length) {
                dayCell = flatDays[i++];
                document.getElementById('dayidx'+dayCell.date.getTime()).classList.remove('in-range');
            }
        } else {
            for (i = 0; i < flatDays.length; i++) {
                let dayCell = flatDays[i];
                document.getElementById('dayidx'+dayCell.date.getTime()).classList.remove('in-range');
            }
        }
    }*/

    return (
        <div className='calendar'>
            <Labels calendarType={props.type} selectedRanges={selectedRanges}/>
            <Header month={monthToRender.month} year={monthToRender.year} setMonthToRender={setMonthToRender}/>
            <Days days={dates} changeSelectedDays={changeSelectedDays}/>
        </div>
    );        
}

Calendar.propTypes = {
    type: PropTypes.oneOf(['SINGLE', 'RANGE']).isRequired
}

export {Calendar}