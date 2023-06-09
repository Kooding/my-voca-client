import React, { createContext, useContext, useEffect, useState } from "react";
import LoginPage from "../pages/LoginPage";

const AuthProvider = createContext({});

const AuthContext = ({ authService, tokenStorage, children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const token = tokenStorage.getToken();
    if (token) {
      setUser({ username: "", token });
    }
  }, []);

  const onSignUp = (username, password) => {
    authService.signup(username, password).then((data) => setUser(data));
  };

  const onLogin = (username, password) => {
    authService.login(username, password).then((data) => setUser(data));
  };

  const onLogout = () => {
    authService.logout().then(() => setUser(null));
  };
  return (
    <AuthProvider.Provider value={onLogout}>
      {user ? children : <LoginPage onSignUp={onSignUp} onLogin={onLogin} />}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
export const useAuth = () => useContext(AuthProvider);
