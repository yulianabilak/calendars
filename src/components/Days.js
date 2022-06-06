import React from 'react'
import '../css/calendar.css'

function Days(props) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthToRender = props.monthToRender.month;
    const firstDayOfMonth = new Date(props.monthToRender.year, monthToRender, 1);
    const firstWeekDay = firstDayOfMonth.getDay();
    const dateFrom = props.selectedRanges.dateFrom;
    const dateTo = props.selectedRanges.dateTo;

    let subarr = []
    const dates = []

    let cnt = 1;
    for (let i = 0; i < 42; i++) {
        if (i !== 0 && i % 7 === 0) {
            dates.push(subarr)
            subarr = []
        }
        if (i >= firstWeekDay) {
            subarr.push(new Date(props.monthToRender.year, monthToRender, cnt));
            cnt++;
        }
        else {
            subarr.push(new Date(new Date(firstDayOfMonth).setDate(1 - (firstWeekDay - i))))
        }
    }
    dates.push(subarr)

    function setClassNames(day) {
        let className = 'day'
        if (day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth() && day.getFullYear() === new Date().getFullYear()) {
            className += ' today'
        }
        if (day.getMonth() !== monthToRender) {
            className += ' other-month'
        }
        if (day.getDate() === dateFrom.getDate() && day.getMonth() === dateFrom.getMonth() && day.getFullYear() === dateFrom.getFullYear() && monthToRender === dateFrom.getMonth()) {
            className += ' selected-day'
        }
        if (dateTo && day.getDate() === dateTo.getDate() && day.getMonth() === dateTo.getMonth() && day.getFullYear() === dateTo.getFullYear() && monthToRender === dateTo.getMonth()) {
            className += ' selected-day'
        }
        if (dateTo && day > dateFrom && day < dateTo) {
            className += ' in-range'
        }
        return className;
    }

    const handleClick = (day) => {
        if (props.type === 'SINGLE' || dateFrom > day || dateTo) {
            props.setSelectedRanges(
                {
                    dateFrom: day,
                    dateTo: null
                }
            )
        }
        else  {
            props.setSelectedRanges(
                {
                    dateFrom: dateFrom,
                    dateTo: day
                }
            )
        }
        
        if(day.getMonth() !== monthToRender) {
            props.setMonthToRender({
                month: day.getMonth(),
                year: day.getFullYear()
            })
        }
    }

    const handleHover = (e, day) => {
        if (props.type === 'SINGLE') return;
        if (dateTo) return;
        if (day > dateFrom) {
            let el = e.target;
            while (el.innerText != dateFrom.getDate()) {
                el.className = 'day in-range'
                if (!el.previousElementSibling) {
                    el = el.parentNode.previousElementSibling.lastChild;
                }
                else el = el.previousElementSibling;
            }
            el = e.target;
            while (el.classList.contains('in-range')) {
                el.className = setClassNames(day)
                if (!el.nextElementSibling) {
                    el = el.parentNode.nextElementSibling.firstChild;
                }
                else el = el.nextElementSibling;
            }
        }
    }

    return (
        <table className='days'>
            <thead>
                <tr className='firstRow'>
                    {weekdays.map(wkday => <td className='weekdays'>{wkday}</td>)}
                </tr>
            </thead>
            <tbody>
                {dates.map(week =>
                    <tr>
                        {week.map(
                            day =>
                                <td onClick={() => handleClick(day)}
                                onMouseOver={(e) => handleHover(e, day)}
                        className={setClassNames(day)}>
                        {day.getDate()}
                    </td>
                )}
            </tr>
                )}
        </tbody>
        </table >
    );
}

export { Days }