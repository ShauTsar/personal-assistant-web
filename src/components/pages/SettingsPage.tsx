import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../styles/SettingsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';
import TelegramLogin from './TelegramLogin.tsx';
import { UserServiceClient } from '../../proto/gen/user_grpc_web_pb';
import {GetAllEventsRequest, UpdateUserSettingsRequest, UserSettings, UserSettingsRequest} from "../../proto/gen/user_pb";
import { GRPC_HOST } from '../../config.tsx';

function SettingsPage() {
    const { darkMode } = useTheme();
    const initialSettings = {
        timezone: '',
        telegramProfile: '',
        avatar: null,
        notifyMorning: false,
        notifyMorningHours: 14,
        notifyBeforeEvent: false,
        notifyBeforeEventHours: 1,
        notifyEveryEvening: false,
        notifyEveryEveningHours: 18,
    };
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : files ? files[0] : value,
        }));
    };
    const [settings, setSettings] = useState(initialSettings);
    useEffect(() => {
        const client = new UserServiceClient(GRPC_HOST, '', null);
        const TOKEN_KEY = 'sessionToken';
        const token = localStorage.getItem(TOKEN_KEY);

        const userSettingsRequest = new UserSettingsRequest();
        userSettingsRequest.setToken(token);

        client.getUserSettings(userSettingsRequest, null, (error, response) => {
            if (!error) {
                const setting = response.getSettings();
                // const byteArray = setting.getAvatarUrl();
                // const utf8String = new TextDecoder().decode(byteArray);
                // const index = utf8String.indexOf('personal-assistant-web/public/');
                // let newUrl;
                // if (index !== -1) {
                //     newUrl = utf8String.substring(index + 'personal-assistant-web/public/'.length);
                // } else {
                //     console.error('Substring not found');
                // }
                let notifyMorning = false;
                let notifyEveryEvening = false;
                let notifyBeforeEvent = false;
                if (setting.getNotifyMorningHours() != null || setting.getNotifyMorningHours() != 0) {
                    notifyMorning = true;
                }
                if (setting.getNotifyEveryEveningHours() != null || setting.getNotifyEveryEveningHours() != 0) {
                   notifyEveryEvening = true;
                }
                if (setting.getNotifyBeforeEventHours() != null || setting.getNotifyBeforeEventHours() != 0) {
                    notifyBeforeEvent = true;
                }
                const test = {
                    timezone: setting.getTimezone(),
                    telegramProfile: '',
                    avatar: null,
                    notifyMorning: notifyMorning,
                    notifyMorningHours: setting.getNotifyMorningHours(),
                    notifyBeforeEvent: notifyBeforeEvent,
                    notifyBeforeEventHours: setting.getNotifyBeforeEventHours(),
                    notifyEveryEvening: notifyEveryEvening,
                    notifyEveryEveningHours: setting.getNotifyEveryEveningHours(),
                };
                setSettings(test);
            } else {
                console.error('Error from server:', error);
            }
        });
    }, []);
    const updateSettings = async () => {
        const client = new UserServiceClient(GRPC_HOST, '', null);
        const TOKEN_KEY = 'sessionToken';
        const token = localStorage.getItem(TOKEN_KEY);
        const timezone = settings.timezone;
        const avatar = settings.avatar;
        const userSettings = new UserSettings();
        userSettings.setToken(token);
        userSettings.setTimezone(timezone);
        const avatarData = await new Promise((resolve, reject) => {
            if (settings.avatar) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    if (fileReader.result) {
                        const bytes = new Uint8Array(fileReader.result as ArrayBuffer);
                        resolve(bytes);
                    } else {
                        reject(new Error('Failed to read file'));
                    }
                };
                fileReader.onerror = () => {
                    reject(new Error('Failed to read file'));
                };
                fileReader.readAsArrayBuffer(settings.avatar);
            } else {
                resolve(null);
            }
        });

        if (avatarData) {
            userSettings.setAvatarUrl(avatarData);
        }
        if(settings.notifyMorning){
            userSettings.setNotifyMorningHours(settings.notifyMorningHours)
        }
        if(settings.notifyEveryEvening){
            userSettings.setNotifyEveryEveningHours(settings.notifyEveryEveningHours)
        }
        if(settings.notifyBeforeEvent){
            userSettings.setNotifyBeforeEventHours(settings.notifyBeforeEventHours)
        }

        const updateUserSettingsRequest = new UpdateUserSettingsRequest();
        updateUserSettingsRequest.setSettings(userSettings);

        client.updateUserSettings(updateUserSettingsRequest, null, (error, response) => {
            if (!error) {
                console.log('Event added successfully:', response.getMessage());
                // setEvents([...events, { ...event, date }]);
                // setModalOpen(false);
            } else {
                // Handle the error
                console.error(error);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.reload();
        updateSettings();

    };

    return (
        <div className={`App ${darkMode ? 'light' : 'dark'}`}>
            <Header />
            <div className="main-content settings-content">
                <div className="settings-form-container">
                    <h1>Настройки пользователя</h1>
                    <form onSubmit={handleSubmit} className="settings-form">
                        <label>
                            Часовой пояс:
                            <select
                                className="input"
                                name="timezone"
                                value={settings.timezone}
                                onChange={handleChange}
                            >
                                <option value="">Выберите часовой пояс</option>
                                <option value="Europe/Kaliningrad">(GMT+02:00) Калининград</option>
                                <option value="Europe/Moscow">(GMT+03:00) Москва</option>
                                <option value="Europe/Samara">(GMT+04:00) Самара</option>
                                <option value="Asia/Yekaterinburg">(GMT+05:00) Екатеринбург</option>
                                <option value="Asia/Omsk">(GMT+06:00) Омск</option>
                                <option value="Asia/Krasnoyarsk">(GMT+07:00) Красноярск</option>
                                <option value="Asia/Irkutsk">(GMT+08:00) Иркутск</option>
                                <option value="Asia/Yakutsk">(GMT+09:00) Якутск</option>
                                <option value="Asia/Vladivostok">(GMT+10:00) Владивосток</option>
                                <option value="Asia/Magadan">(GMT+11:00) Магадан</option>
                                <option value="Asia/Kamchatka">(GMT+12:00) Камчатка</option>
                            </select>
                        </label>

                        <label className="file-input-label">
                            <FontAwesomeIcon icon={faDownload} style={{color: '#74C0FC', marginRight: '5px'}}/>
                            Выберите фото для аватара
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={handleChange}
                                style={{display: 'none'}}
                            />
                            {settings.avatar && (
                                <img
                                    src={URL.createObjectURL(settings.avatar)}
                                    alt="Avatar Preview"
                                    className="avatar-preview"
                                />
                            )}
                        </label>

                        <label>
                            Уведомлять утром о предстоящих делах:
                            <input
                                type="checkbox"
                                name="notifyMorning"
                                checked={settings.notifyMorning}
                                onChange={handleChange}
                            />
                        </label>
                        {settings.notifyMorning && (
                            <label>
                                В:
                                <input
                                    className="input"
                                    type="number"
                                    name="notifyMorningHours"
                                    value={settings.notifyMorningHours}
                                    onChange={handleChange}
                                />
                            </label>
                        )}

                        <label>
                            Уведомлять до планируемой даты события:
                            <input
                                type="checkbox"
                                name="notifyBeforeEvent"
                                checked={settings.notifyBeforeEvent}
                                onChange={handleChange}
                            />
                        </label>
                        {settings.notifyBeforeEvent && (
                            <label>
                                За часа(ов):
                                <input
                                    className="input"
                                    type="number"
                                    name="notifyBeforeEventHours"
                                    value={settings.notifyBeforeEventHours}
                                    onChange={handleChange}
                                />
                            </label>
                        )}

                        <label>
                            Уведомлять каждый вечер:
                            <input
                                type="checkbox"
                                name="notifyEveryEvening"
                                checked={settings.notifyEveryEvening}
                                onChange={handleChange}
                            />
                        </label>
                        {settings.notifyEveryEvening && (
                            <label>
                                В:
                                <input
                                    className="input"
                                    type="number"
                                    name="notifyEveryEveningHours"
                                    value={settings.notifyEveryEveningHours}
                                    onChange={handleChange}
                                />
                            </label>
                        )}
                        <label>
                            Привязать телеграмм к боту:
                            <div className="telegram-login-container">
                                <TelegramLogin/>
                            </div>
                        </label>
                        <button type="submit">Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;
