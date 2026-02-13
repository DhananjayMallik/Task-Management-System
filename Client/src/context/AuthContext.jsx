import { useState, createContext, useContext } from "react";

/* 
1. Auth Context save a user token and role
2. Here we save our login user and logout user token and role
3. login user: (token , role) saved in localStorage 
4. logout user: removes (token , role) from localStorage
*/

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // get the token and role of the user
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null
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
    setAuth({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
