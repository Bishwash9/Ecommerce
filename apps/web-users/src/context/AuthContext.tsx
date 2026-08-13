'use client';

import { createContext, useContext, useState, useEffect} from 'react';
import { authService } from '@/app/services/authService';

//define shape of user object
interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

//define the status of authentication
type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

//define the shape of the context value
interface AuthContextValue {
    user: User | null;
    status: AuthStatus;
    accessToken: string | null;
    login:(user: User, accessToken: string) => void;
    logout:() => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [status, setStatus] = useState<AuthStatus>('loading');

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('accessToken');
            const storedUser = localStorage.getItem('user');

            if(storedToken && storedUser) {
                setAccessToken(storedToken);
                setUser(JSON.parse(storedUser));
                setStatus('authenticated');
            }else {
                setStatus('unauthenticated');
            }
        } catch {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            setStatus('unauthenticated');
        }
    }, []);

    const login = (userData: User, token: string) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
        setAccessToken(token);
        setStatus('authenticated');
    };

    const logout = async () => {
        try {
            //call api 
            await authService.logout();
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            setUser(null);
            setAccessToken(null);
            setStatus('unauthenticated');
        }
    };

    return (
        <AuthContext.Provider value={{user, status, accessToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}