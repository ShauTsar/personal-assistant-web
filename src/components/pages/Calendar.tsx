// Установите библиотеку react-calendar перед использованием: npm install react-calendar
import React, {useState} from 'react';
import Calendar from 'react-calendar';
import Header from './Header'
import '../styles/Calendar.css'
import {useTheme} from './ThemeContext';

const CalendarPage: React.FC = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (selectedDate: Date) => {
        setDate(selectedDate);
    };
    const {darkMode} = useTheme();

    return (
        <div className={`App ${darkMode ? 'light' : 'dark'}`}>
            <Header/>
            <div className="main-content">
                <div className="calendar-page" >
                    <div className="container">
                        <h1>Календарь</h1>
                        <Calendar onChange={onChange} value={date}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;