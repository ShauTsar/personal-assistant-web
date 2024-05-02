// Calendar.tsx

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Header from './Header';
import EventModal from './EventModal.tsx';
import EventDetailsModal from './EventDetailsModal.tsx';
import '../styles/Calendar.css';
import '../styles/EventDetailsModal.css'; // Импортируем стили для EventDetailsModal
import { useTheme } from './ThemeContext';
import { UserServiceClient } from '../../proto/gen/user_grpc_web_pb';
import { AddEventDataRequest, EventDataMessage, GetAllEventsRequest } from '../../proto/gen/user_pb.js';
import { GRPC_HOST } from '../../config.tsx';

const CalendarPage: React.FC = () => {
    const [unfinishedEvents, setUnfinishedEvents] = useState<EventDataMessage[]>([]);
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState<EventDataMessage[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventDataMessage | null>(null); // Обновлено на EventDataMessage
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

    useEffect(() => {
        const client = new UserServiceClient(GRPC_HOST, '', null);
        const TOKEN_KEY = 'sessionToken';
        const token = localStorage.getItem(TOKEN_KEY);

        const getAllEventsRequest = new GetAllEventsRequest();
        getAllEventsRequest.setToken(token);

        client.getAllEvents(getAllEventsRequest, null, (error, response) => {
            if (!error) {
                console.log('Response from server:', response.toObject());
                const events = response.getEventsList().map(event => {
                    const formattedEvent = {
                        ...event.toObject(),
                        planned_date: new Date(event.getPlannedDate()).toISOString(),
                        is_finished: event.getIsFinished(),
                        taskid: event.getTaskId(),
                    };
                    return formattedEvent;
                });
                setEvents(events);
            } else {
                console.error('Error from server:', error);
            }
        });
        const unfinishedEvents = events.filter((event) => !event.is_finished);
        setUnfinishedEvents(unfinishedEvents);
    }, []);

    const onAddEvent = (event: EventDataMessage) => {
        const client = new UserServiceClient(GRPC_HOST, '', null);
        const TOKEN_KEY = 'sessionToken';
        const token = localStorage.getItem(TOKEN_KEY);
        const currentDate = new Date();
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone };
        const formattedStartDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
        const inputDate = new Date(formattedStartDate);
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
        const day = inputDate.getDate();
        const hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();
        const seconds = inputDate.getSeconds();
        const milliseconds = inputDate.getMilliseconds();
        const formattedDateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}Z`;

        const eventDataMessage = new EventDataMessage();
        eventDataMessage.setToken(token);
        eventDataMessage.setStartDate(formattedDateString);
        eventDataMessage.setPlannedDate(event.planned_date);
        if (event.is_finished) {
            eventDataMessage.setFinishedDate(formattedDateString);
        } else {
            eventDataMessage.setFinishedDate('');
        }
        eventDataMessage.setDescription(event.description);
        eventDataMessage.setIsFinished(event.is_finished);
        eventDataMessage.setAttachment(event.attachment);
        eventDataMessage.setTitle(event.title);

        const addEventDataRequest = new AddEventDataRequest();
        addEventDataRequest.setEventData(eventDataMessage);

        client.addEventData(addEventDataRequest, null, (error, response) => {
            if (!error) {
                console.log('Event added successfully:', response.getMessage());
                setEvents([...events, { ...event, date }]);
                setModalOpen(false);
            } else {
                console.error(error);
            }
        });
    };

    const toggleDetails = (event: EventDataMessage) => {
        setSelectedEvent(event === selectedEvent ? null : event);
        setDetailsModalOpen(true);
    };

    const onChange = (selectedDate: Date) => {
        setDate(selectedDate);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const closeDetailsModal = () => {
        setDetailsModalOpen(false);
    };

    const onUpdateEvent = (updatedEvent: EventDataMessage) => {
        const updatedEvents = events.map((event) =>
            event.title === updatedEvent.title ? updatedEvent : event
        );
        setEvents(updatedEvents);
    };


    const UnfinishedEventsList: React.FC = () => {
        return (
            <div className="unfinished-events">
                <h2>Незавершенные задачи</h2>
                <ul>
                    {events
                        .filter((event) => !event.is_finished)
                        .map((event, index) => (
                            <li
                                key={index}
                                onClick={() => toggleDetails(event)}
                                className="not-completed"
                            >
                                <div className="event-info">
                                <span className="event-date">
                                    {new Date(event.planned_date).toLocaleDateString()}
                                </span>
                                    <span className="event-title">{event.title}</span>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        );
    };

    const CompletedEventsList: React.FC = () => {
        return (
            <div className="completed-events">
                <h2>Завершенные задачи</h2>
                <ul>
                    {events
                        .filter((event) => event.is_finished)
                        .map((event, index) => (
                            <li
                                key={index}
                                onClick={() => toggleDetails(event)}
                                className="completed"
                            >
                                <div className="event-info">
                                <span className="event-date">
                                    {new Date(event.planned_date).toLocaleDateString()}
                                </span>
                                    <span className="event-title">{event.title}</span>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        );
    };

    const { darkMode } = useTheme();

    return (
        <div className={`App ${darkMode ? 'light' : 'dark'}`}>
            <Header />
            <div className="main-content">
                <div className="container">
                    <div className="events-list-container">
                        <div className="events-list">
                            <h2>События на {date.toLocaleDateString()}</h2>
                            <ul>
                                {events
                                    .filter((event) => {
                                        const eventDate = new Date(event.planned_date);
                                        return (
                                            eventDate.getDate() === date.getDate() &&
                                            eventDate.getMonth() === date.getMonth() &&
                                            eventDate.getFullYear() === date.getFullYear()
                                        );
                                    })
                                    .map((event, index) => (
                                        <li
                                            key={index}
                                            className={event.is_finished ? 'completed' : 'not-completed'}
                                            onClick={() => toggleDetails(event)}
                                        >
                                            <span>{event.title}</span>
                                            {event.is_finished ? ' ✓' : ' •'}
                                        </li>
                                    ))}
                            </ul>
                            <button className="add-event-btn" onClick={openModal}>
                                <i className="fas fa-plus"></i> Добавить событие
                            </button>
                        </div>
                    </div>
                    <div className="calendar-container">
                        <h1>Календарь</h1>
                        <Calendar onChange={onChange} value={date} />
                    </div>
                    {isModalOpen && <EventModal date={date} onAddEvent={onAddEvent} onClose={closeModal} />}
                    {isDetailsModalOpen && selectedEvent && (
                        <EventDetailsModal
                            event={selectedEvent}
                            onClose={closeDetailsModal}
                            onUpdateEvent={onUpdateEvent}
                        />
                    )}
                    <UnfinishedEventsList />
                    <CompletedEventsList />
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;