import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import { RegisterRequest } from '../../proto/user_pb.js';
import { UserServiceClient } from '../../proto/user_grpc_web_pb.js';

// Создайте список часовых поясов с описанием
const timezones = [
    { id: 'Etc/UTC', label: 'UTC±0 (London, Dublin, Lisbon)' },
    { id: 'Etc/GMT-1', label: 'UTC±1 (Berlin, Paris, Rome)' },
    { id: 'Etc/GMT-2', label: 'UTC±2 (Athens, Helsinki, Jerusalem)' },
    { id: 'Etc/GMT-3', label: 'UTC±3 (Moscow, Istanbul, Dubai)' },
    { id: 'Etc/GMT-4', label: 'UTC±4 (Baku, Tbilisi, Yerevan)' },
    { id: 'Etc/GMT-5', label: 'UTC±5 (Karachi, Tashkent, Ashgabat)' },
    { id: 'Etc/GMT-6', label: 'UTC±6 (Almaty, Dhaka, Novosibirsk)' },
    { id: 'Etc/GMT-7', label: 'UTC±7 (Bangkok, Hanoi, Jakarta)' },
    { id: 'Etc/GMT-8', label: 'UTC±8 (Beijing, Hong Kong, Singapore)' },
    { id: 'Etc/GMT-9', label: 'UTC±9 (Tokyo, Seoul, Osaka)' },
    { id: 'Etc/GMT-10', label: 'UTC±10 (Sydney, Melbourne, Guam)' },
    { id: 'Etc/GMT-11', label: 'UTC±11 (Honiara, Vanuatu, Noumea)' },
    { id: 'Etc/GMT-12', label: 'UTC±12 (Suva, Funafuti, Tarawa)' },
    // Другие часовые пояса и описания
];

function RegistrationPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        timezone: 'Etc/GMT-3', // Установите часовой пояс по умолчанию
    });

    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
//TODO авторизация 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            // Если пароли не совпадают, устанавливаем флаг ошибки
            setPasswordsMatch(false);
        } else {
            // Сброс флага ошибки при совпадении паролей
            setPasswordsMatch(true);

            // Ваш код обработки отправки формы здесь, включая вызов функции для регистрации пользователя
            handleRegister();
        }
    };

    const handleRegister = () => {
        const client = new UserServiceClient('http://localhost:8081', '', null);

        const request = new RegisterRequest();
        request.setUsername(formData.username);
        request.setPassword(formData.password);
        request.setEmail(formData.email);
        request.setPhone(formData.phone);
        request.setTimezone(formData.timezone);

        client.register(request, {}, (err, response) => {
            if (err) {
                setRegistrationStatus('error');
                console.error('Error during registration:', err);
            } else {
                if (response.getSuccess()) {
                    setRegistrationStatus('success');
                    console.log('Registration successful');
                } else {
                    setRegistrationStatus('error');
                    console.log('Registration failed');
                }
            }
        });
    };

    const renderStatusMessage = () => {
        if (registrationStatus === 'success') {
            return (
                <div id="container">
                    <div id="success-box">
                        <div className="dot"></div>
                        <div className="dot two"></div>
                        <div className="face">
                            <div className="eye"></div>
                            <div className="eye right"></div>
                            <div className="mouth happy"></div>
                        </div>
                        <div className="shadow scale"></div>
                        <div class="message"><h1 class="alert">Success!</h1><p>yay, everything is working.</p></div>
                        <button class="button-box"><h1 class="green"onClick={() => setRegistrationStatus(null)}>continue</h1></button>
                    </div>
                </div>
            );
        } else if (registrationStatus === 'error') {
            return (

                <div id="error-box">
                    <div class="dot"></div>
                    <div class="dot two"></div>
                    <div class="face2">
                        <div class="eye"></div>
                        <div class="eye right"></div>
                        <div class="mouth sad"></div>
                    </div>
                    <div class="shadow move"></div>
                    <div class="message"><h1 class="alert">Error!</h1><p>oh no, something went wrong</p></div>
                    <button className="button-box" onClick={() => setRegistrationStatus(null)}><h1 className="red">Повторить</h1></button>
                </div>

            );
        }

        return null;
    };

    return (
        <div className="login-page dark">
            <form onSubmit={handleSubmit}>
                <div className="inputbox">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <span>Username</span>
                    <i></i>
                </div>

                <div className="inputbox">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <span>Password</span>
                    <i></i>
                </div>

                <div className="inputbox">
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <span>Confirm Password</span>
                    <i></i>
                </div>
                {!passwordsMatch && <p className="password-error">Пароли не совпадают</p>}

                <div className="inputbox">
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <span>Phone</span>
                    <i></i>
                </div>

                <div className="inputbox">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <span>Email</span>
                    <i></i>
                </div>

                <div className="inputbox">
                    <select
                        id="timezone"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        required
                    >
                        {timezones.map((zone) => (
                            <option key={zone.id} value={zone.id}>
                                {zone.label}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Register</button>
            </form>

            {renderStatusMessage()}

            <div className="login-options">
                <p><Link to="/login">Уже есть аккаунт? Войти</Link></p>
                <p>Зарегистрироваться через:</p>
                <Link to="/auth/google">
                    <div className="auth-icon google">
                        <i className="fab fa-google"></i>
                    </div>
                </Link>
                <Link to="/auth/vk">
                    <div className="auth-icon vk">
                        <i className="fab fa-vk"></i>
                    </div>
                </Link>
                <Link to="/auth/telegram">
                    <div className="auth-icon telegram">
                        <i className="fab fa-telegram"></i>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default RegistrationPage;
