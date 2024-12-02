import React, { FC, useContext, useEffect, useState } from 'react'
import { ContextProps } from '../models/context/contextProps';
const AuthContext = React.createContext({});
import { request } from '../utils/api/request';

export const useAuth = () => {
    if (!AuthContext) throw new Error("Debe estar dentro de un componente");
    return useContext(AuthContext);
};

const AuthContextProvider: FC<ContextProps> = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");
    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const login = async (email: string, password: string) => {
        try {
            const response = await request.post("user/login", { email, password });
            setToken(response.data.token);
            sessionStorage.setItem("token", response.data.token);
            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    };

    const logout = () => {
        setToken("");
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    const getCurrentUser = async () => {
        try {
            const user = await request.get("user/profile");
            setCurrentUser(user.data.user);
        } catch (error) {
            if (error instanceof Error) console.log(error.message)
        }
    }
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            getCurrentUser();
        } else {
            setIsLoggedIn(false);
            setCurrentUser({});
        }
    }, [token])
    return (
        <AuthContext.Provider value={{ login, isLoggedIn, logout, currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider