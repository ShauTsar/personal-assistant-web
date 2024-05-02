// EventDetailsModal.tsx

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import '../styles/EventDetailsModal.css';
import { EventDataMessage, FinishEventRequest, ArchiveEventRequest} from '../../proto/gen/user_pb.js';
import { UserServiceClient } from '../../proto/gen/user_grpc_web_pb';
import { useTheme } from './ThemeContext';
import {GRPC_HOST} from "../../config.tsx";

interface EventDetailsModalProps {
    event: EventDataMessage;
    onClose: () => void;
    onUpdateEvent: (updatedEvent: EventDataMessage) => void;
    // archiveEvent: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose, onUpdateEvent }) => {
    const { darkMode } = useTheme();
    const [isCompleted, setIsCompleted] = useState(event.is_finished);
    const [isArchived, setIsArchived] = useState(false);

    const handleCompleteEvent = () => {
        const client = new UserServiceClient(GRPC_HOST, '', null);
        const TOKEN_KEY = 'sessionToken';
        const token = localStorage.getItem(TOKEN_KEY);

        const finishEventRequest = new FinishEventRequest();
        finishEventRequest.setTaskid(event.taskid); // Предполагается, что у вас есть поле taskid в EventDataMessage
        finishEventRequest.setFinish(!isCompleted);

        client.finishEvent(finishEventRequest, null, (error, response) => {
            if (!error) {
                // Обновить состояние события на клиенте
                console.log('Task updated successfully:', response.getMessage());
                const updatedEvent = { ...event, is_finished: !isCompleted };
                setIsCompleted(!isCompleted);
                onUpdateEvent(updatedEvent);
            } else {
                console.error('Error from server:', error);
            }
        });
    };
    const archiveEvent = () => {
        const client = new UserServiceClient(GRPC_HOST, '', null);
        const archiveEventRequest = new ArchiveEventRequest();
        archiveEventRequest.setTaskId(event.taskId);

        client.archiveEvent(archiveEventRequest, null, (error, response) => {
            if (!error) {
                // Обновить состояние события на клиенте
                console.log('Task archived successfully:', response.getMessage());
                setIsArchived(true);
            } else {
                console.error('Error from server:', error);
            }
        });
    };

    // const handleArchiveEvent = () => {
    //     setIsArchived(true);
    // };

    // Анимация появления и исчезновения
    const modalAnimation = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        reset: true,
    });

    function formatTime(timeString) {
        const eventDate = new Date(timeString);
        const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' };
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(eventDate);
        return formattedTime;
    }


    return (
        <div className="event-details-modal-wrapper">
            <animated.div style={modalAnimation} className={`event-details-modal ${darkMode ? 'dark' : 'light'}`}>
                <h2>{event.title}</h2>
                <p>Описание: {event.description}</p>
                <p>Время: {formatTime(event.planned_date)}</p>
                <div className="event-actions">
                    <button className={`complete-btn ${isCompleted ? 'completed' : ''}`} onClick={handleCompleteEvent}>
                        {isCompleted ? 'Отметить как незавершенное' : 'Завершить'}
                    </button>
                    <button className="archive-btn" onClick={archiveEvent} disabled={isArchived}>
                        {isArchived ? 'Задача в архиве' : 'Архивировать'}
                    </button>
                </div>
                <button className="close-btn" onClick={onClose}>
                    Закрыть
                </button>
            </animated.div>
        </div>
    );
};

export default EventDetailsModal;