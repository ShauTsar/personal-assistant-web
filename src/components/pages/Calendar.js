import React, {useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../styles/Calendar.css"
import moment from 'moment';
import Header from "./Header";

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Событие 1',
        start: new Date(2023, 11, 1, 10, 0), // Год, месяц (0-11), день, часы, минуты
        end: new Date(2023, 11, 1, 12, 0),
    },
    {
        title: 'Событие 2',
        start: new Date(2023, 11, 5, 14, 0),
        end: new Date(2023, 11, 5, 16, 0),
    },
    // Добавьте свои события здесь
];

function CalendarPage() {
    const darkMode = true; // Устанавливаем темную тему
    return (
        <div className={`App ${darkMode ? 'dark' : 'light'}`}>
            <Header /> {/* Вставьте компонент шапки здесь */}
            <div className="main-content">
                <div className="calendar-page">
                    <h1>Календарь</h1>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }} // Установите высоту календаря
                    />
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;
