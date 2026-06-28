import { apiClient } from '../Config/api';

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

    logout: async (): Promise<any> => {
        //remove the access token from local storage
        localStorage.removeItem('accessToken');
        //remove the refresh token from the cookie
        await apiClient('/users/logout', {
            method: 'POST',
        });
    }
}