import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import AuthService from '../../AuthService.js';
function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            // Вызов функции аутентификации
            await AuthService.login(username, password);
            window.location.replace('/');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="login-page dark">
            <form>
                <div className="inputbox">
                    <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}  required />
                    <span>Username</span>
                    <i></i>
                </div>

                <div className="inputbox">
                    <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} id="password" required />
                    <span>Password</span>
                    <i></i>
                </div>

                <button type="button" onClick={handleLogin}>Login</button>
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
