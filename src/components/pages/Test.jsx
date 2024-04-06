import React, { useEffect, useCallback, useMemo } from 'react';
import { UpdateTelegramUserIDRequest } from '../../proto/gen/user_pb';
import { UserServiceClient } from '../../proto/gen/user_grpc_web_pb';

const Test = () => {
    const client = useMemo(() => new UserServiceClient('http://localhost:8081', '', null), []);
    const TOKEN_KEY = 'sessionToken';
    const token = localStorage.getItem(TOKEN_KEY);
    const registrationLink = `https://t.me/NovaPersonalAssistantBot?start=${token}`;

    const updateTelegramUserID = useCallback(async (user) => {
        try {
            const request = new UpdateTelegramUserIDRequest();
            const telegramUserId = user.id;
            request.setToken(token);
            request.setUserTelegramID(telegramUserId);

            console.log('Sending gRPC request:', request.toObject());

            const response = await new Promise((resolve, reject) => {
                client.updateTelegramUserID(request, {}, (err, response) => {
                    if (err) {
                        console.error('gRPC error:', err);
                        reject(err);
                    } else {
                        console.log('gRPC response:', response.toObject());
                        resolve(response.toObject());
                    }
                });
            });

            console.log('Update Telegram User ID response:', response);
        } catch (error) {
            console.error('Error during telegram login:', error);
            throw new Error('Invalid credentials');
        }
    }, [client, token]);

    useEffect(() => {
        const handleTelegramAuth = (user) => {
            alert(
                'Logged in as ' +
                user.first_name +
                ' ' +
                user.last_name +
                ' (' +
                user.id +
                (user.username ? ', @' + user.username : '') +
                ')'
            );

            updateTelegramUserID(user);
        };

        window.onTelegramAuth = handleTelegramAuth;

        return () => {
            window.onTelegramAuth = null;
        };
    }, [updateTelegramUserID]);

    return (
        <div>
            <h1>Регистрация в боте</h1>
            <a
                className="telegram-login-button"
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fab fa-telegram"></i> Регистрация в Telegram
            </a>
        </div>
    );
};

export default Test;
