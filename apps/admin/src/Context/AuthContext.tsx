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
    setUser: (user:User | null) => void;
    accessToken: string | null;
    login: (user: User, accessToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUserState] = useState<User | null>(() => {
        try{

            const userData = localStorage.getItem('user');
            
            if(userData){
                const parsedUser = JSON.parse(userData);
                return parsedUser as User;
            }
        }catch (error) {
            console.error('Error parsing user data from localStorage:', error);
        }

        return null;
    });

    const setUser = (newUser: User | null) => {
        if(newUser){
            localStorage.setItem('user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('user');
        }
        setUserState(newUser);
    }

    const [accessToken, setAccessToken] = useState<string | null>(() => {
        return localStorage.getItem('accessToken');
    });

    

    const login = (userData: User, accessToken: string) => {
        setUser(userData);
        setAccessToken(accessToken);
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
    };

    return ( 
        <AuthContext.Provider value={{user, accessToken, login, logout, setUser}}>
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