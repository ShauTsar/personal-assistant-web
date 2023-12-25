import React from 'react';
import Header from './Header';
import FeatureCard from './FeatureCard.tsx';
import {useTheme} from "./ThemeContext"; // Добавили новый компонент для карточек с фичами
function HomePage() {
    const { darkMode } = useTheme(); // Используйте состояние из контекста темы

    return (
        <div className={`App ${darkMode ? 'light' : 'dark'}`}>
            <Header />
            <div className="main-content">
                <h1 className="text-center">Твой персональный помощник Nova</h1>
                <p className="text-center">
                    Добро пожаловать в DailyEase - ваш персональный помощник по учету ежедневных дел и финансов.
                    Здесь вы можете легко и удобно вести учет своих задач, планировать бюджет и многое другое.
                </p>
                <div className="feature-section" >
                    <FeatureCard
                        icon="fas fa-clipboard-list"
                        title="Ежедневные дела"
                        description="Организуйте свой день, добавляйте задачи и следите за своими достижениями."
                        to="/calendar"

                    />
                    <FeatureCard
                        icon="fas fa-coins"
                        title="Финансовый учет"
                        description="Ведите учет своих финансов, устанавливайте лимиты и следите за расходами."
                        to="/finances"
                    />
                    <FeatureCard
                        icon="fas fa-chart-line"
                        title="Статистика"
                        description="Анализируйте свою продуктивность и финансовые показатели с помощью удобных графиков и диаграмм."
                    />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
