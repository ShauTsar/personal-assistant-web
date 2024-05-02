// AuthService.js

import { LoginRequest, UserSettingsRequest, UserSettings } from './proto/gen/user_pb';
import {UserServiceClient} from "./proto/gen/user_grpc_web_pb";
import {useState} from "react";
import { GRPC_HOST } from './config.tsx';


const TOKEN_KEY = 'sessionToken';
const User = 'currentUser';


const AuthService = {
    login: async (username, password) => {
        const client = new UserServiceClient(GRPC_HOST, '', null);
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
        const username = localStorage.getItem(User);

        if (!token) {
            throw new Error('No session token found');
        }

        const client = new UserServiceClient(GRPC_HOST, '', null);
        const getUserSettings = new UserSettingsRequest();
        getUserSettings.setToken(token);

        try {
            const response = await new Promise((resolve, reject) => {
                client.getUserSettings(getUserSettings, null, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res.toObject());
                    }
                });
            });

            const settings = response.settings;
            const byteArray = atob(settings.avatarUrl)
                .split('')
                .map(char => char.charCodeAt(0));
            const utf8String = new TextDecoder().decode(new Uint8Array(byteArray));
            const index = utf8String.indexOf('personal-assistant-web/public/');
            let newUrl;
            if (index !== -1) {
                newUrl = utf8String.substring(index + 'personal-assistant-web/public/'.length);
            } else {
                console.error('Substring not found');
            }
            return {
                nickname: username,
                avatar: newUrl,
            };
        } catch (error) {
            console.error('Error getting user settings:', error);
            throw error;
        }
    },
};

export default AuthService;