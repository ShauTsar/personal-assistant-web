import React from 'react';
import {Link} from "react-router-dom";
interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    to: string; // новое свойство для указания пути перехода
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, to }) => {
    return (
        <Link to={to} className="feature"> {/* Используем Link для создания ссылки */}
            <i className={icon}></i>
            <h2>{title}</h2>
            <p>{description}</p>
        </Link>
    );
};

export default FeatureCard;