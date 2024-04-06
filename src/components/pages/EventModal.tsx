import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/EventModal.css';
import { useTheme } from "./ThemeContext";
import { EventDataMessage } from '../../proto/gen/user_pb.js';

interface EventModalProps {
    date: Date;
    onAddEvent: (event: EventData) => void;
    onClose: () => void;
}

interface EventData {
    title: string;
    description: string;
    time: string;
    completed: boolean;
}

const EventModal: React.FC<EventModalProps> = ({ date, onAddEvent, onClose }) => {
    const [eventData, setEventData] = useState<EventDataMessage>({
        token: '',
        start_date: '',
        planned_date: '',
        finished_date: '',
        description: '',
        is_finished: false,
        attachment: '',
        title: '',
    });
    const formatTime = (time) => {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };


    const handleAddEvent = () => {
        if (eventData.title.trim() !== '') {
            const formattedTime = formatTime(new Date(`01/01/2000 ${eventData.time}`));

            const plannedDate = new Date(date);
            plannedDate.setHours(Number(formattedTime.split(':')[0]), Number(formattedTime.split(':')[1]));

            const formattedPlannedDate = plannedDate.toISOString();
            // console.log('Formatted Planned Date:', formattedPlannedDate);

            onAddEvent({
                ...eventData,
                planned_date: formattedPlannedDate,
            });

            setEventData({
                token: '',
                start_date: '',
                planned_date: '',
                finished_date: '',
                description: '',
                is_finished: false,
                attachment: '',
                title: '',
            });
            onClose();
        }
    };


    const handleTimeChange = (time: Date) => {
        const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        setEventData({ ...eventData, time: formattedTime });
    };
    // const handleTimeChange = (time: Date) => {
    //     const formattedTime = time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    //     setEventData({ ...eventData, time: formattedTime });
    // };

    const { darkMode } = useTheme();

    return (
        <div className={`App ${darkMode ? 'light' : 'dark'}`}>
            <div className="event-modal">
                <h2>{`Добавить событие на ${date.toLocaleDateString()}`}</h2>
                <div>
                    <label>Заголовок:</label>
                    <input
                        type="text"
                        value={eventData.title}
                        onChange={(e) => setEventData({...eventData, title: e.target.value})}
                    />
                </div>
                <div>
                    <label>Описание:</label>
                    <textarea
                        value={eventData.description}
                        onChange={(e) => setEventData({...eventData, description: e.target.value})}
                    />
                </div>
                <div>
                    <label>Время:</label>
                    <DatePicker
                        selected={eventData.time ? new Date(`01/01/2000 ${eventData.time}`) : null}
                        onChange={handleTimeChange}
                        showTimeSelectOnly
                        dateFormat="HH:mm"
                    />
                </div>
                <div>
                    <label>Завершено:</label>
                    <input
                        type="checkbox"
                        checked={eventData.completed}
                        onChange={(e) => setEventData({...eventData, is_finished: e.target.checked})}
                    />
                </div>
                <div className="button-container">
                    <button className="add-event-btn" onClick={handleAddEvent}>
                        Добавить событие
                    </button>
                    <button className="close-btn" onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
