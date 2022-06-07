import React from 'react'
import '../css/calendar.css'
import PropTypes from 'prop-types'

function Days(props) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    function setClassNames(day) {
        let className = 'day'
        if (day.isSelected) {
            className += ' selected-day'
            return className;
        }
        if (day.isInRange) {
            className += ' in-range'
        }
        if (day.isToday) {
            className += ' today'
            return className;
        }
        if (day.isFromOtherMonth) {
            className += ' other-month'
        }
        return className;
    }

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
                                <td id={'dayidx'+day.date.getTime()} className={setClassNames(day)}
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

Days.propTypes = {
    days: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeSelectedDays: PropTypes.func.isRequired,
    changeHoveredDays: PropTypes.func
}

export { Days }