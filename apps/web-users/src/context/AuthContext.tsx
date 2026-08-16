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
    login:(user: User) => void;
    logout:() => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<AuthStatus>('loading');

  
    useEffect(() => {
        const checkUser = async () => {
            
             try {
                const response = await authService.getCurrentUser();
                setUser(response.user);
                setStatus('authenticated');

             } catch (error) {
                setUser(null);
                setStatus('unauthenticated');
             }

        }
        checkUser();
    },[])

    const login = (userData: User) => {
        setUser(userData);
        setStatus('authenticated');
    };

    const logout = async () => {
        try {
            //call api 
            await authService.logout();
        } finally {
            setUser(null);
            setStatus('unauthenticated');
        }
    };

    return (
        <AuthContext.Provider value={{user, status, login, logout}}>
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