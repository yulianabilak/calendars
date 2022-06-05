import './App.css';
import React, { useState } from 'react'
import { Calendar } from './components/Calendar'
import {TypePicker} from './components/TypePicker'

function App() {
    const [calendarType, setCalendarType] = useState('SINGLE');

    return ( 
      <div className="App">
        <Calendar type={calendarType}></Calendar>
        <TypePicker calendarType={calendarType} setCalendarType={setCalendarType}/> 
      </div>
    );
}

export default App;