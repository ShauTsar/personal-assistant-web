import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Подключите стили для шапки

function Header() {
    const darkMode = true; // Установите темную тему в зависимости от вашей логики

    return (
        <Navbar bg="transparent" variant={darkMode ? 'dark' : 'light'} expand="lg">
            <Container>
                <Link to="/" className="brand-link"> {/* Добавляем Link для перехода на главную страницу */}
                    <Navbar.Brand className="text-center">DailyEase</Navbar.Brand>
                </Link>
                <Nav className="mx-auto">
                    <Nav.Link href="/calendar">Календарь</Nav.Link>
                    <Nav.Link href="/finances">Финансы</Nav.Link>
                    <Nav.Link href="#shopping-list">Список покупок</Nav.Link>
                </Nav>
                <Link to="/login">
                    <Button className="btn" size="sm">Войти</Button>
                </Link>
                <Link to="/registration">
                    <Button className="btn" size="sm">Зарегистрироваться</Button>
                </Link>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                </label>
            </Container>
        </Navbar>
    );
}

export default Header;
