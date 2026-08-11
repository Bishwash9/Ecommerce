import { apiClient } from '../config/api';

export const authService = { 
    login: async (email: string, password: string): Promise<any> => {
        const loginData = await apiClient('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if(loginData.data.accessToken){
            localStorage.setItem('accessToken', loginData.data.accessToken);
            localStorage.setItem('user', JSON.stringify(loginData.data.user));
        }

        return loginData;
    },

    register: async (name: string, email: string, password: string): Promise<any> => {
        const registerData = await apiClient('/users/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });

        return registerData;
    },

    logout: async ():Promise<any> => {
        try {
            await apiClient('/users/logout', {
                method: 'POST',
            });
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        }
    }
}