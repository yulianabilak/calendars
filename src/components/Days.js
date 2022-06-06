import React from 'react'
import '../css/calendar.css'

function Days(props) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    

    function setClassNames(day) {
        let className = 'day'
        if (day.isSelected) {
            className += ' selected-day'
            return className;
        }
        if (day.isToday) {
            className += ' today'
            return className;
        }
        if (day.isFromOtherMonth) {
            className += ' other-month'
            return className;
        }
        if (day.isInRange) {
            className += ' in-range'
        }
        return className;
    }

    /*const handleHover = (e, day) => {
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
    }*/

    return (
        <table className='days'>
            <thead>
                <tr className='firstRow'>
                    {weekdays.map(wkday => <td className='weekdays'>{wkday}</td>)}
                </tr>
            </thead>
            <tbody>
                {props.days.map(week =>
                    <tr>
                        {week.map(
                            day =>
                                <td className={setClassNames(day)}
                                onClick={() => props.changeSelectedDays(day)}
                                onMouseOver={() => props.changeHoveredDays(day)}>
                        {day.date.getDate()}
                    </td>
                )}
            </tr>
                )}
        </tbody>
        </table >
    );
}

export { Days }