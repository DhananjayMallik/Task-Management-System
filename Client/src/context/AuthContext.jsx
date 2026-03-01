import { useState, createContext, useContext } from "react";

/* 
Auth Context:
1. Saves user token, role, and user info
2. loginUser: saves token, role, and user into localStorage & state
3. logoutUser: removes token, role, and user
*/

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize auth state from localStorage
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
  });

  // login function
  const loginUser = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    
    setAuth({ token, role });
  };

  // logout function
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setAuth({ token: null, role: null});
  };

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
