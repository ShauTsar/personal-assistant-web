import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
    return (
        <div className="login-page dark">
            <form>
                <div className="inputbox">
                    <input type="text" id="username" required />
                    <span>Username</span>
                    <i></i>
                </div>

                <div className="inputbox">
                    <input type="password" id="password" required />
                    <span>Password</span>
                    <i></i>
                </div>

                <button type="submit">Login</button>
            </form>
            <div className="login-options">
                <p><Link to="/password-recovery">Забыли пароль?</Link></p>
                <p><Link to="/registration">Еще нет аккаунта?</Link></p>
                <p>Или войдите через:</p>
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

export default LoginPage;
