interface User{
    id:string
    email: string
    name:string
}
export interface AuthTypes {
    login: (email: string, password: string) => Promise<{ token: string }>;
    logout: () => void;
    isLoggedIn: boolean;
    currentUser: User;
}