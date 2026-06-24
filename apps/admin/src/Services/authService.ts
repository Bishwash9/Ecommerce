import { apiClient } from '../Config/api';

export const authService = {
    login: async (email: string, password: string): Promise<any> => {
        
        const data = await apiClient('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if(data.tokens){
            localStorage.setItem('accessToken', data.tokens.accessToken);
        }

        return data;
    },
    
    register: async (name: string, email: string, password: string): Promise<any> => {
        const data = await apiClient('/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
        return data;
    }
}