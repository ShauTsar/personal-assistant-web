// AuthService.js

import { LoginRequest } from './proto/gen/user_pb';
import {UserServiceClient} from "./proto/gen/user_grpc_web_pb";

const TOKEN_KEY = 'sessionToken';
const User = 'currentUser';

const AuthService = {
    login: async (username, password) => {
        const client = new UserServiceClient('http://localhost:8081', '', null);
        const request = new LoginRequest();

        request.setUsername(username);
        request.setPassword(password);
        localStorage.setItem(User, username);

        try {
            const response = await new Promise((resolve, reject) => {
                client.login(request, {}, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response.toObject());
                    }
                });
            });

            // Сохранение токена сеанса в localStorage

            localStorage.setItem(TOKEN_KEY, response.token);
        } catch (error) {
            console.error('Error during login:', error);
            throw new Error('Invalid credentials');
        }
    },

    logout: () => {
        // Удаление токена сеанса из localStorage
        localStorage.removeItem(TOKEN_KEY);
    },

    isAuthenticated: () => {
        // Проверка наличия токена сеанса в localStorage
        return !!localStorage.getItem(TOKEN_KEY);
    },
    getCurrentUser: async () => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (!token) {
            throw new Error('No session token found');
        }

        const client = new UserServiceClient('http://localhost:8081', '', null);
        return {
            nickname: localStorage.getItem(User),
            avatar: '',
        };
    },
};

export default AuthService;