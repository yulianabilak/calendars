import React from 'react'
import '../css/calendar.css'

function Header(props) {
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']

    function handleLeftClick() {
        props.setMonthToRender(
            {
                month: props.month === 0 ? 11 : props.month - 1,
                year: props.month === 0 ? props.year - 1 : props.year
            }
        );
    }

    function handleRightClick() {
        props.setMonthToRender(
            {
                month: props.month === 11 ? 0 : props.month + 1,
                year: props.month === 11 ? props.year + 1 : props.year
            }
        );
    }

    return (
        <div className='header'>
            <button className='arrow' onClick={handleLeftClick}>{'<'}</button>
            <p>
                <span className='month'>{months[props.month]} </span> 
                <span>{props.year}</span>
            </p>
            <button className='arrow' onClick={handleRightClick}>{'>'}</button>
        </div>
    );
}

export {Header}