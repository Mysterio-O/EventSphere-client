import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔁 Custom observer to check login status on load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:3000/user/profile', {
                    credentials: 'include', // 🍪 important to include cookies
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error(err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    console.log(user);

    const logout = async () => {
        await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include'
        });
        setUser(null);
    };

    return (
        <AuthContext value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
