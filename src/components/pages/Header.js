import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Подключите стили для шапки
import AuthService from '../../AuthService'; // Импортируйте сервис аутентификации
import {useTheme} from '../pages/ThemeContext';

function Header() {
    const { darkMode, toggleDarkMode } = useTheme();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            if (AuthService.isAuthenticated()) {
                const currentUser = await AuthService.getCurrentUser();
                setUser(currentUser);
            }
        };

        loadUser();
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        setUser(null);
        window.location.href = '/';
    };
    const handleSliderChange = () => {
        toggleDarkMode(); // Используйте функцию переключения из контекста
    };

    return (
        <div className={`App ${darkMode ? 'light' : 'dark'}`}>
            <Navbar bg="transparent" variant={darkMode ? 'light' : 'dark'} expand="lg">
                <Container>
                    <Link to="/" className="brand-link">
                        <Navbar.Brand className="text-center">DailyEase</Navbar.Brand>
                    </Link>
                    <Nav className="mx-auto">
                        <Nav.Link href="/calendar">Календарь</Nav.Link>
                        <Nav.Link href="/finances">Финансы</Nav.Link>
                        <Nav.Link href="#shopping-list">Список покупок</Nav.Link>
                    </Nav>
                    {user ? (
                        <div className="user-info">
                            <div className="user-avatar">
                                <img src={user.avatar} alt="User Avatar"/>
                            </div>
                            <span className="user-nickname">{user.nickname}</span>
                            <Link to="/settings">
                                <Button className="btn" size="sm">Настройки</Button>
                            </Link>
                            <Button className="btn" size="sm" onClick={handleLogout}>
                                Выйти
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button className="btn" size="sm">Войти</Button>
                            </Link>
                            <Link to="/registration">
                                <Button className="btn" size="sm">Зарегистрироваться</Button>
                            </Link>
                        </>
                    )}
                    {/* Используйте состояние слайдера для определения темы */}
                    <label className="switch">
                        <input type="checkbox" checked={darkMode} onChange={handleSliderChange}/>
                        <span className="slider"></span>
                    </label>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
