import { createContext, useContext, useState } from 'react';



interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

//define what context will hold
interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    login: (user: User, accessToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const login = (userData: User, accessToken: string) => {
        setUser(userData);
        setAccessToken(accessToken);
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
    };

    return ( 
        <AuthContext.Provider value={{user, accessToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

//custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};