import { apiClient } from '../config/api';

export const authService = { 
    login: async (email: string, password: string): Promise<any> => {
        const loginData = await apiClient('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

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
        
            await apiClient('/users/logout', {
                method: 'POST',
            });
         
    },

    getCurrentUser: async (): Promise<any> => {
        const userData = await apiClient('/users/me', {
            method: 'GET',
        })
        return userData;
    }
}