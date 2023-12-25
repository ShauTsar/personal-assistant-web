import React, {useState} from 'react';
import Header from "./Header";
import "../styles/SettingsPage.css"
import { useTheme } from './ThemeContext';

function SettingsPage() {

    const handleTelegramLogin = () => {
        // Ваши действия при нажатии кнопки Telegram, например, открытие окна аутентификации Telegram
    };


    const { darkMode } = useTheme();// Устанавливаем темную тему
    // Допустим, у вас есть объект с текущими настройками пользователя
    const initialSettings = {
        timezone: '',
        emailConfirmation: false,
        telegramProfile: '',
        avatar: null, // Здесь может быть URL аватара или файл, зависит от вашей реализации
        password: undefined
    };

    const [settings, setSettings] = useState(initialSettings);

    // Обработчик изменения полей формы
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : files ? files[0] : value,
        }));
    };

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ваша логика для сохранения настроек, например, отправка на бэкенд

        // Сбросить форму или выполнить другие действия после сохранения
        setSettings(initialSettings);
    };

    return (
        <div className={`App ${darkMode ? 'light' : 'dark'}`}>
            <Header />
            <div className="main-content">
                <div>
                    <h1>Настройки пользователя</h1>
                    <form onSubmit={handleSubmit} className="settings-form">
                        <label>
                            Часовой пояс:
                            <input
                                type="text"
                                name="timezone"
                                value={settings.timezone}
                                onChange={handleChange}
                            />
                        </label>
                        <br />

                        <label>
                            Подтверждение почты:
                            <input
                                type="checkbox"
                                name="emailConfirmation"
                                checked={settings.emailConfirmation}
                                onChange={handleChange}
                            />
                        </label>
                        <br />

                        <label>
                            <input
                                type="text"
                                name="telegramProfile"
                                value={settings.telegramProfile}
                                onChange={handleChange}
                            />
                            <div>
                                <button onClick={handleTelegramLogin}>Войти через Telegram</button>
                            </div>
                        </label>
                        <br/>

                        <label>
                            Аватар:
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Изменить пароль:
                            <input
                                type="password"
                                name="password"
                                value={settings.password}
                                onChange={handleChange}
                            />
                        </label>
                        <br />

                        <button type="submit">Сохранить</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default SettingsPage;
