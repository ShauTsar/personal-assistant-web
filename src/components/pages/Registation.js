import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import { RegisterRequest } from '../../proto/user_pb';
import { UserServiceClient } from '../../proto/user_grpc_web_pb.js';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb.js';

function RegistrationPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        timezone: 'UTC',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ваш код обработки отправки формы здесь, включая вызов функции для регистрации пользователя
        handleRegistration();
    };

    const handleRegistration = () => {
        const client = new UserServiceClient('0.0.0.0:50051','',null);

        const request = new RegisterRequest();
        request.setUsername(formData.username);
        request.setPassword(formData.password);
        request.setEmail(formData.email);
        request.setPhone(formData.phone);

        // Создаем объект google.protobuf.Timestamp
        const timezone = new Timestamp();
        timezone.fromDate(new Date()); // Здесь можно установить нужное время

        request.setTimezone(timezone);

        client.register(request, {}, (err, response) => {
            if (err) {
                console.error('Error during registration:', err);
            } else {
                if (response.getSuccess()) {
                    console.log('Registration successful');
                } else {
                    console.log('Registration failed');
                }
            }
        });
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
                        <option value="UTC">UTC</option>
                        <option value="GMT">GMT</option>
                        {/* Другие варианты часовых поясов */}
                    </select>
                </div>

                <button type="submit">Register</button>
            </form>
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
