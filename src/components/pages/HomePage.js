import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Импортируем компонент Link
import '../styles/HomePage.css';

function HomePage() {
    const darkMode = true; // Устанавливаем темную тему

    return (
        <div className={`App ${darkMode ? 'dark' : 'light'}`}>
            <Navbar bg="transparent" variant={darkMode ? 'dark' : 'light'} expand="lg">
                <Container>
                    <Navbar.Brand className="text-center">DailyEase</Navbar.Brand>
                    <Nav className="mx-auto">
                        <Nav.Link href="#calendar">Календарь</Nav.Link>
                        <Nav.Link href="#finances">Финансы</Nav.Link>
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
            <div className="main-content">
                <h1 className="text-center">Твой персональный помощник Nova</h1>
                {/* Вставьте анимационные картинки или контент здесь */}
            </div>
        </div>
    );
}

export default HomePage;
