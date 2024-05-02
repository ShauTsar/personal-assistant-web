import React, {useCallback, useEffect, useRef} from 'react';
import { UpdateTelegramUserIDRequest } from '../../proto/gen/user_pb.js';
import { UserServiceClient } from '../../proto/gen/user_grpc_web_pb';
import {GRPC_HOST} from "../../config.tsx";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}

const TelegramLogin: React.FC = () => {
    const TOKEN_KEY = 'sessionToken';
    const token = localStorage.getItem(TOKEN_KEY);
    const telegramWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Определение функции onTelegramAuth в глобальном объекте window
        window.onTelegramAuth = async (user: any) => {
            console.log('Telegram authentication successful. User:', user.id);
            const client = new UserServiceClient(GRPC_HOST, '', null);
            const request = new UpdateTelegramUserIDRequest();
            request.setToken(token);
            request.setUsertelegramid(user.id)

            try {
                const response = await new Promise((resolve, reject) => {
                    client.updateTelegramUserID(request, {}, (err, response) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(response.toObject());
                        }
                    });
                });

                console.log('Update Telegram User ID Response:', response);
            } catch (error) {
                console.error('Error during processing:', error);
                throw new Error('Invalid credentials');
            }
        };

        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://telegram.org/js/telegram-widget.js?22';
        scriptElement.setAttribute('data-telegram-login', 'NovaPersonalAssistantBot');
        scriptElement.setAttribute('data-size', 'large');
        scriptElement.setAttribute('data-onauth', 'onTelegramAuth(user)');
        scriptElement.setAttribute('data-auth-url', 'https://1045-85-12-195-248.ngrok-free.app/settings');
        scriptElement.async = true;

        telegramWrapperRef.current?.appendChild(scriptElement);

        // Очистка при размонтировании компонента
        return () => {
            telegramWrapperRef.current?.removeChild(scriptElement);
            // Очистка функции из глобального объекта window
            delete window.onTelegramAuth;
        };
    }, []);

    return (
        <div>
            <div ref={telegramWrapperRef}></div>
        </div>
    );
};

export default TelegramLogin;
