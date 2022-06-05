import React from 'react'
import '../css/calendar.css'

function Days(props) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const firstDayOfMonth = new Date(props.selectedMonth.year, props.selectedMonth.month, 1);
    const firstWeekDay = firstDayOfMonth.getDay();
    const selectedDay = props.selectedDate.date.getDate();
    const daysMonth = props.selectedMonth.month;
    const selectedDayMonth = props.selectedDate.date.getMonth();
    const selected = props.selectedDate.isSelected;

    let subarr = []
    const dates = []

    let cnt = 1;
    for (let i = 0; i < 42; i++) {
        if (i !== 0 && i % 7 === 0) {
            dates.push(subarr)
            subarr = []
        }
        if (i >= firstWeekDay) {
            subarr.push(new Date(props.selectedMonth.year, props.selectedMonth.month, cnt));
            cnt++;
        }
        else {
            subarr.push(new Date(new Date(firstDayOfMonth).setDate(1 - (firstWeekDay - i))))
        }
    }
    dates.push(subarr)

    function setClassNames(day) {
        let className = 'day'
        if (day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth()) {
            className += ' today'
        }
        if (day.getMonth() !== daysMonth) {
            className += ' other-month'
        }
        if (day.getDate() === selectedDay && day.getMonth() === selectedDayMonth && props.selectedMonth.month === selectedDayMonth && selected) {
            className += ' selected-day'
        }
        return className;
    }

    /*function handleDayClick(day) {
        if (day.getMonth() !== props.selectedMonth.month) {
            props.setSelectedMonth({ month: day.getMonth(), year: day.getFullYear })
        }
        props.setSelectedDate({
            date: new Date(day.getFullYear(), day.getMonth(), day.getDate()),
            isSelected: true
        })
    }*/

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
                                <td onClick={() => {
                                    props.setSelectedDate(
                                        {
                                            date: new Date(day.getFullYear(), day.getMonth(), day.getDate()),
                                            isSelected: true
                                        }
                                    )
                                    if(day.getMonth() !== props.selectedMonth.month) {
                                        props.setSelectedMonth({
                                            month: day.getMonth(),
                                            year: day.getFullYear()
                                        })
                                    }
                            }}
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